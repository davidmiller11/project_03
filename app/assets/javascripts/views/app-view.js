// javascripts/views/app-view.js

// The Application

// overall AppView is the top-level piece of UI.
AppView = Backbone.View.extend({

  el: '#kycapp',

  initialize: function() {
    // this.counter = 0;
  },

  events: {
    // 'change #challenge-neighborhood': 'setupGame'
    'click #play-button': 'startGame',
    'click #next-button': 'nextPlace'
  },

  nextPlace: function( event ) {

    $('#place-view').empty();
    // marker.setMap(null);

    var currentPlace = theMap.places.models[ app.counter ];

    // var name = currentPlace.get('name');

    console.log( currentPlace );

    if ( currentPlace.get('photos') ) {
      buildImage( currentPlace.get('name'), currentPlace.get('photos')[0].getUrl({
        'maxWidth':300,
        'maxHeight':300
      }));
    } else {
      buildImage( currentPlace.get('name'), "http://placesheen.com/300/300" );
    }

    function buildImage( name, url ) {
      var name = $('<h3>').text( name );
      var newImage = $('<img>').attr( 'src', url );
      $('#place-view').append( name ).append( newImage );
    }

    app.counter += 1;
  },

  startGame: function() {

    this.counter = 0;

    var neighborhood = $('#challenge-neighborhood').val();
    placeType = $('#challenge-place-type').val().split();
    zoomLevel = 0;

    if ( neighborhood === 'east_village' ) {
      locationCenter = new google.maps.LatLng( 40.726, -73.983 );
      zoomLevel = 16;
      radius = 640;
    } else { // else case is flatiron_district
      locationCenter = new google.maps.LatLng( 40.741, -73.989 );
      zoomLevel = 16;
      radius = 350;
    }

    $('#game-header').find('h2').html( neighborhood );
    $('#map-canvas').css('height','500px');

    theMap = new MapModel({ 
      locationCenter: locationCenter,
      zoomLevel: zoomLevel,
      placeType: placeType,
      radius: radius 
    });    
  }

  // AppView's job is to listen to collection and to create and render the new place

});