// javascripts/game.js

function Game() {

  this.markers = [];

  this.pointsArray = [];

  this.startGame = function() {

    this.counter = -1;

    var neighborhood = $('#challenge-neighborhood').val();
    placeType = $('#challenge-place-type').val().split();
    zoomLevel = 0;

    if ( neighborhood === 'east_village' ) {
      locationCenter = new google.maps.LatLng( 40.726, -73.983 );
      zoomLevel = 15;
      radius = 640;
    } else { // else case is flatiron_district
      locationCenter = new google.maps.LatLng( 40.741, -73.989 );
      zoomLevel = 16;
      radius = 350;
    }

    $('#game-header').find('h2').html( neighborhood );
    $('#map-canvas').css('height','500px');

    this.map = new MapModel({ 
      locationCenter: locationCenter,
      zoomLevel: zoomLevel,
      placeType: placeType,
      radius: radius 
    });    

    $( "#chart" ).append( "<h2>Score</h2>" );

    $('#kycapp').on( "click", "#next-button", function( event ) {
      // event.preventDefault();
      $('#results-view').remove();
      game.nextPlace();
    });

  };

  this.nextPlace = function() {
    
    game.counter += 1;

    $('#place-view').empty();
    this.clearMarkers();

    var currentPlace = this.map.places.models[ game.counter ];

    // var name = currentPlace.get('name');

    // console.log( currentPlace );

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
      $( nameObj ).hide().appendTo('#place-view').fadeIn( "slow", function() {});
      $(newImage).hide().appendTo('#place-view').fadeIn( "slow", function() {});
      $('#game-header').find('h2').text('Where is ' + name + '?  Click the map to guess!');
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


    window.setTimeout( function() { 

      $('<div>').text( score ).appendTo('#chart').animate( { width:( score * 3 + 5 ) + "px" } );

    }, 2000);

    this.showResultsView = function( guessDistance ) {
      var scores = game.pointsArray;
      var score = scores[scores.length - 1];

      var resultsView = '<div id="results-view"><div id="nice-guess">Nice guess!</div><div>You guessed ' + guessDistance + ' meters away!</div><div>You scored ' + score + ' points!</div><button id="next-button">Next</button></div>';

      window.setTimeout( function() {$( resultsView ).hide().appendTo('#right-pane').fadeIn( 2000, function() {})}, 2000);
    }
  };
}
