

var map;
var myPlacesService;
var myRequest;
var placeResults;
var oneSampleDetails;

function initialize() {

  var styleArray = [
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ];

  // create a Map options object, with 2 options required for each map: center and zoom.
  var mapOptions = {
    // latitude = y, longitude = x
    center: new google.maps.LatLng( 40.726, -73.983),
    zoom: 16,
    styles: styleArray,
    disableDefaultUI: true,
    draggable: false,
    disableDoubleClickZoom: true,
    keyboardShortcuts: false,
    scrollwheel: false
  };

  map = new google.maps.Map( document.getElementById('map-canvas') , mapOptions );
          
  var clickLatLng;

  google.maps.event.addListener( map, 'click', function(event) {
    clickLatLng = event.latLng;
    console.log( clickLatLng.toString() );
    placeMarker( clickLatLng );

    myRequest = {
      location: clickLatLng,
      radius: '400',
      types: ['restaurant']
    };

    // create new instance of PlacesService class that renders attributions in the specified container.
    myPlacesService = new google.maps.places.PlacesService( map );
    
    myPlacesService.nearbySearch( myRequest, callback );
  
  });
}

function placeMarker( location ) {
  var marker = new google.maps.Marker({
    map: map,
    title: 'My Guess!',
    draggable: false,
    animation: google.maps.Animation.DROP,
    position: location
  });
}

function callback( results, status ) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var results = _.sample( results, 10 );
    for (var i = 0; i < results.length; i++) {
      // console.log( "nearbySearch resp #" + i);
      console.log( i + ': ' + results[i].name );
      if ( results[i].photos ) {
        buildImage( results[i].name, results[i].photos[0].getUrl({
          'maxWidth':300,
          'maxHeight':300
        }));
      } else {
        buildImage( results[i].name, "http://placesheen.com/300/300" );
      }
      placeMarker( results[i].geometry.location );
    }
    placeResults = results;
    // oneSample = results[0].reference;

    // myPlacesService.getDetails( { reference: oneSample }, callback2 );
  }
}

function buildImage( name, url ) {
  var name = $('<h3>').text( name );
  var newImage = $('<img>').attr( 'src', url );
  $('body').append( name ).append( newImage );
}

// function callback2( placeResult, status ) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//       oneSampleDetails = placeResult;
//       console.log("DOOOD");
//     }
// }

// Spherical Law of Cosines
function calculateDistance( lat1, lng1, lat2, lng2 ) {
  var lat1 = lat1*(Math.PI / 180),
      lat2 = lat2*(Math.PI / 180), 
      deltaLng = (lng2-lng1)*(Math.PI / 180), 
      R = 6371000; // gives d in meters
  var d = Math.acos( Math.sin(lat1)*Math.sin(lat2) + Math.cos(lat1)*Math.cos(lat2) * Math.cos(deltaLng) ) * R;
  return Math.round(d);
};

// Waits for page to load, then runs initialization, so that body can continue to load even if map hasn't loaded yet.
google.maps.event.addDomListener( window, 'load', initialize);

