// javascripts/models/place.js

// Place Model

var PlaceModel = Backbone.Model.extend({

  initialize: function() {
    var lat = this.get('geometry').location.k;
    var lng = this.get('geometry').location.A;
    this.location = new google.maps.LatLng( lat, lng );
  }

});