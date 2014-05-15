// javascripts/game.js

function Game() {

  this.markers = [];

  this.pointsArray = [];

  this.totalScore = 0;

  this.avgScore = 0;

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
    
    console.log('hello from game.js endGame');
    $('#chart').empty();
    $('#game-view').empty();

  }

  this.startGame = function() {

    this.counter = -1;

    var gameDiv = '<div id="game-header"></div><div id="left-pane"><div id="place-view"></div><div id="chart"></div></div><div id="right-pane"><div id="map-canvas"></div></div>';

    $('#game-view').append( gameDiv );

    var neighborhood = $('#challenge-neighborhood').val();
    placeType = $('#challenge-place-type').val().split();
    zoomLevel = 0;

    console.log('neighborhood is: '+neighborhood);
    console.log( app.neighborhoods );

    var neighborhoodModel = app.neighborhoods.findWhere({name: neighborhood});
    console.log(neighborhoodModel);
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

    $( "#chart" ).append( "<div id='left-score'><div class='score-number'>0</div><div class='score-header'>total</div></div><div id='mid-score'>Score</div><div id='right-score'><div class='score-number'>0.0</div><div class='score-header'>avg</div></div>" );

    $('#kycapp').on( "click", "#next-button", function( event ) {
      // event.preventDefault();
      $('#blank-div').remove();
      game.nextPlace();
    });

  };

  this.nextPlace = function() {
    
    game.counter += 1;

    $('#game-header').empty();
    $('#place-view').empty();
    this.clearMarkers();

    var currentPlace = this.map.places.models[ game.counter ];

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
      $( '<h2>' ).hide().appendTo('#game-header').html('Where is <span>' + name + '</span>?  Click the map to guess!').fadeIn( 1000, function() {});
    }
  };

  this.addMarker = function( location ) {
    var marker = new google.maps.Marker({
      map: game.map.googleMap,
      title: 'My Guess!',
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: location
    });
    game.markers.push( marker );
  };

  this.clearMarkers = function() {
    for (var i=0; i<game.markers.length; i++) {
      game.markers[i].setMap( null );
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

    game.pointsArray.push( score );

    game.updateScores();

    window.setTimeout( function() { 

      $('<div class="score-bar">').text( score ).appendTo('#chart').animate( { width:( score * 3 + 5 ) + "px" } );
      $('#left-score').find('.score-number').hide().text( game.totalScore ).fadeIn( 2000, function() {});
      $('#right-score').find('.score-number').hide().text( game.avgScore ).fadeIn( 2000, function() {});

    }, 2000);

    this.showResultsView = function( guessDistance ) {
      var scores = game.pointsArray;
      var score = scores[scores.length - 1];
      var resultsView;

      if (game.counter < 9) {
        resultsView = '<div id="blank-div"><div id="results-view"><div id="nice-guess">Nice guess!</div><div>You guessed ' + guessDistance + ' meters away!</div><div>You scored ' + score + ' points!</div><button id="next-button">Next</button></div></div>';
      } else {
        resultsView = '<div id="blank-div"><div id="results-view"><div id="nice-guess">Nice guess!</div><div>You guessed ' + guessDistance + ' meters away!</div><div>You scored ' + score + ' points!</div><button id="play-again-button">Play again</button></div></div>';
      }

      window.setTimeout( function() {$( resultsView ).hide().appendTo('#right-pane').fadeIn( 2000, function() {})}, 2000);


    }

  };
}
