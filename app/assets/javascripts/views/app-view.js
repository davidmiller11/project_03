// javascripts/views/app-view.js

var app = app || {};

// The Application

// overall AppView is the top-level piece of UI.
app.AppView = Backbone.View.extend({

  el: '#kycapp',

  events: {
    // 'change #challenge-neighborhood': 'setupGame'
    'click #play-button': 'startGame'
  },

  startGame: function( event ) {

    var neighborhood = $('#challenge-neighborhood').val();
    var placeType = $('#challenge-place-type').val();
    var zoomLevel;

    if ( neighborhood === 'east_village' ) {
      locationCenter = new google.maps.LatLng( 40.726, -73.983 );
      zoomLevel = 16;
    } else {
      locationCenter = new google.maps.LatLng( 40.741, -73.989 );
      zoomLevel = 16;
    }

    $('#game-header').find('h2').html( neighborhood );
    $('#map-canvas').css('height','500px');

    app.map = new MapModel({ locationCenter: locationCenter, zoomLevel: zoomLevel, placeType: placeType });

    initialize( locationCenter, zoomLevel, placeType );
  }

  // AppView's job is to listen to collection and to create and render the new place

});