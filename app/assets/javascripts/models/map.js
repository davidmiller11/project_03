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

    // console.log( this.googleMap );

    var that = this;

    myPlacesService.nearbySearch( myRequest, function(results, status) {
      if ( status == google.maps.places.PlacesServiceStatus.OK ) {
        console.log( "Places Service Success" );
        
        console.log ( _.sample( results, 10 ) );

        that.places = new PlaceCollection( _.sample( results, 10 ) );

      } else {
        console.log( 'Places Service Failure' );
      }
    } );

    google.maps.event.addListener( this.googleMap, 'click', function( event ) {
      // clickLatLng = event.latLng;
      console.log('click');
      // console.log( event.latLng.toString() );
      placeMarker( event.latLng );
    });

    function placeMarker( location ) {
      // marker.setMap(null);
      var marker = new google.maps.Marker({
        map: that.googleMap,
        title: 'My Guess!',
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: location
      });
    }

  }

});