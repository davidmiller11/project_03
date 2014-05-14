// javascripts/models/map.js

// Map Model

var MapModel = Backbone.Model.extend({

  initialize: function() {

    var styleArray = [
      { featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'off' }] },
      { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
    ];

    var mapOptions = {
      // latitude ~= y, longitude ~= x
      center: locationCenter, // required
      zoom: zoomLevel, // required
      styles: styleArray,
      disableDefaultUI: true,
      draggable: false,
      disableDoubleClickZoom: true,
      keyboardShortcuts: false,
      scrollwheel: false
    };

    this.googleMap = new google.maps.Map( document.getElementById('map-canvas') , mapOptions );

    // create new instance of PlacesService class that renders attributions in the specified container.
    var myPlacesService = new google.maps.places.PlacesService( this.googleMap );

    var myRequest = {
      location: locationCenter,
      radius: radius,
      types: placeType
    };

    myPlacesService.nearbySearch( myRequest, function(results, status) {
        if ( status == google.maps.places.PlacesServiceStatus.OK ) {
          console.log( "Places Service Success" );
          // console.log ( _.sample( results, 10 ) );
          this.places = new PlaceCollection( _.sample( results, 10 ) );

          game.nextPlace();

        } else {
          console.log( 'Places Service Failure' );
        }
    }.bind( this ) );

    google.maps.event.addListener( this.googleMap, 'click', function( event ) {
      console.log('User clicked!');

      var guessLocation = event.latLng;
      var trueLocation = game.map.places.models[ game.counter ].location;
      
      // add marker for user's guess
      game.addMarker( guessLocation );

      // add marker for true location
      window.setTimeout( function() { game.addMarker( trueLocation )}, 1000);


      var guessDistance = game.calculateDistance( guessLocation.k, guessLocation.A, trueLocation.k, trueLocation.A );

      game.appendScoreArray( guessDistance, radius );

      game.showResultsView( guessDistance );

    });

    // game.nextPlace();

  }



});