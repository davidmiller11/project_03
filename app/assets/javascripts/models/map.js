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
          
          console.log ( _.sample( results, 10 ) );

          this.places = new PlaceCollection( _.sample( results, 10 ) );

        } else {
          console.log( 'Places Service Failure' );
        }
    }.bind( this ) );

    google.maps.event.addListener( this.googleMap, 'click', function( event ) {
      console.log('User clicked!');

      var guessLocation = event.latLng;
      var trueLocation = theMap.places.models[ app.appView.counter ].location;
      
      // add marker for user's guess
      placeMarker( guessLocation );

      // add marker for true location
      window.setTimeout( function() {placeMarker( trueLocation )}, 1000);

      // log distance in console

      console.log( calculateDistance( guessLocation.k, guessLocation.A, trueLocation.k, trueLocation.A ) + " meters away!" );

      // Spherical Law of Cosines
      function calculateDistance( lat1, lng1, lat2, lng2 ) {
        var lat1 = lat1 * ( Math.PI / 180 ),
            lat2 = lat2 * ( Math.PI / 180 ), 
            deltaLng = ( lng2 - lng1 ) * ( Math.PI / 180 ), 
            R = 6371000; // gives d in meters
        var d = Math.acos( Math.sin( lat1 ) * Math.sin( lat2 ) + Math.cos( lat1 ) * Math.cos( lat2 ) * Math.cos( deltaLng ) ) * R;
        return Math.round( d );
      };

    });

    var that = this;
    this.markers = [];

    function placeMarker( location ) {
      var marker = new google.maps.Marker({
        map: that.googleMap,
        title: 'My Guess!',
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: location
      });
      that.markers.push( marker );
    }
  },

  clearMarkers: function() {
    for (var i=0; i<this.markers.length; i++) {
      this.markers[i].setMap( null );
    }
  }

});