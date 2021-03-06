// javascripts/game.js

function Game() {

  this.markers = [];
  this.pointsArray = [];
  this.totalScore = 0;
  this.avgScore = 0;

  this.startGame = function() {
    this.counter = -1;
    $('#header').hide();
    $('#game-view').show();

    var gameDiv = '<div id="left-pane"><div id="place-view"></div><div id="chart"></div></div><div id="right-pane"><div id="game-header"></div><div id="map-canvas"></div></div>';

    $('#game-view').empty();
    $('#game-view').append( gameDiv );

    neighborhood = $('#challenge-neighborhood').val();
    placeType = $('#challenge-place-type').val().toLowerCase().replace(' ','_').split();
    zoomLevel = 0;

    var neighborhoodModel = app.neighborhoods.findWhere({name: neighborhood});
    locationCenter = neighborhoodModel.center;
    zoomLevel = neighborhoodModel.get('zoom');
    radius = neighborhoodModel.get('radius');

    $('#map-canvas').css('height','500px');

    this.map = new MapModel({ 
      locationCenter: locationCenter,
      zoomLevel: zoomLevel,
      placeType: placeType,
      radius: radius 
    });    

    $( "#chart" ).append( "<div id='left-score'><div class='score-header'>total</div><div class='score-number'>0</div></div><div id='mid-score'>Score</div><div id='right-score'><div class='score-header'>avg</div><div class='score-number'>0.0</div></div>" );

    $('#kycapp').on( "click", "#next-button", function( event ) {
      $('#blank-div').remove();
      this.nextPlace();
    }.bind( this ));

    $('#kycapp').on( "click", "#save-score-button", function() {
      app.challenges.create( {
        player_name: $('#player-name-input').val(),
        hood_name: neighborhood,
        place_type: $('#challenge-place-type').val(),
        score_avg: this.avgScore
      }, {wait: true});
      $('#save-score-box').html('<div id="save-notice">Saved!</div>');
      console.log('User clicked save!');
    }.bind(this));
  };

  this.updateScores = function() {
    if ( this.pointsArray.length === 0 ) {
      this.totalScore = 0;
    } else if ( this.pointsArray.length === 1 ) {
      this.totalScore = this.pointsArray[0];
      this.avgScore = Math.round( this.totalScore / this.pointsArray.length * 10 ) / 10;
    } else {
      this.totalScore = this.pointsArray.reduce( function( a, b) {
        return a + b;
      });
      this.avgScore = Math.round( this.totalScore / this.pointsArray.length * 10 ) / 10;
    }
  };

  this.endGame = function() {
    $('#kycapp').off("click", "#next-button");
    $('#kycapp').off("click", "#save-score-button");
    $('#chart').empty();
    $('#game-view').empty();
    $('#header').show();
    this.counter = -1;
    this.pointsArray = [];
    this.totalScore = 0;
    this.avgScore = 0;
  };

  this.nextPlace = function() {
    this.counter += 1;
    console.log( "game counter is: " + this.counter );
    turn = this.counter + 1;

    $('#game-header').empty();
    $('#place-view').empty();
    this.clearMarkers();

    var currentPlace = this.map.places.models[ this.counter ];

    if ( currentPlace.get('photos') ) {
      buildImage( currentPlace.get('name'), currentPlace.get('photos')[0].getUrl({
        'maxWidth':300,
        'maxHeight':200
      }));
    } else {
      buildImage( currentPlace.get('name'), "http://placesheen.com/200/300" );
    }

    function buildImage( name, url ) {
      var nameObj = $('<h2>').text( name );
      var newImage = $('<img>').attr( 'src', url );
      $( nameObj ).hide().appendTo('#place-view').fadeIn( 1000, function() {});
      $( newImage ).hide().appendTo('#place-view').fadeIn( 1000, function() {});
      $( '<h2>' ).hide().appendTo('#game-header').html('<div id="location-header">Location ' + turn + ' of 10:</div> Where is <span>' + name + '?</span>  <div id="click-map-header">Click the map to guess!</div>').fadeIn( 1000, function() {});
    };
  }.bind( this );

  this.addMarker = function( location ) {
    var marker = new google.maps.Marker({
      map: this.map.googleMap,
      title: 'My Guess!',
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: location
    });
    this.markers.push( marker );
  };

  this.clearMarkers = function() {
    for (var i=0; i<this.markers.length; i++) {
      this.markers[i].setMap( null );
    }
  };

  // Spherical Law of Cosines
  this.calculateDistance = function( lat1, lng1, lat2, lng2 ) {
    var lat1 = lat1 * ( Math.PI / 180 ),
        lat2 = lat2 * ( Math.PI / 180 ), 
        deltaLng = ( lng2 - lng1 ) * ( Math.PI / 180 ), 
        R = 6371000; // gives d in meters
    var d = Math.acos( Math.sin( lat1 ) * Math.sin( lat2 ) + Math.cos( lat1 ) * Math.cos( lat2 ) * Math.cos( deltaLng ) ) * R;
    return Math.round( d );
  };

  this.appendScoreArray = function( guessDistance, searchRadius ) {
    var score;
    var searchDiameter = searchRadius * 2;

    if ( guessDistance > searchDiameter ) {
      score = 0;
    } else {
      score = Math.round( (1 - guessDistance/searchDiameter) * 100 );
    }

    this.pointsArray.push( score );
    this.updateScores();

    window.setTimeout( function() { 
      $('<div class="score-bar">').text( score ).appendTo('#chart').animate( { width:( score * 3 + 5 ) + "px" } );
      var totalScoreCap = (this.counter + 1) * 100;
      $('#left-score').find('.score-number').hide().html( this.totalScore + "<span class='score-cap'>/"+totalScoreCap+"</span>" ).fadeIn( 2000, function() {});
      $('#right-score').find('.score-number').hide().html( this.avgScore + "<span class='score-cap'>/100</span>" ).fadeIn( 2000, function() {});
    }.bind(this), 2000);

    this.showResultsView = function( guessDistance ) {
      var scores = this.pointsArray;
      var score = scores[scores.length - 1];
      var resultsView;

      if (this.counter < 9) {
        resultsView = '<div id="blank-div"><div id="results-view"><div id="nice-guess">Nice guess!</div><div>You guessed ' + guessDistance + ' meters away!</div><div>You scored ' + score + ' points!</div><button id="next-button">Next</button></div></div>';
      } else {
        resultsView = '<div id="blank-div"><div id="results-view" class="game-over"><div id="nice-guess">Great game!</div><div>You averaged ' + this.avgScore + ' points per location!</div><div>Your total score was ' + this.totalScore + ' points!</div><div id="save-score-box"><div id="name-input-label">Enter name to save your score!</div><input type="text" name="player_name" id="player-name-input"/><div id="save-score-button">SAVE</div></div><div id="play-again-button">PLAY AGAIN</div></div></div>';
      }
      window.setTimeout( function() {$( resultsView ).hide().appendTo('#right-pane').fadeIn( 2000, function() {})}, 2000);
    }
  };
}
