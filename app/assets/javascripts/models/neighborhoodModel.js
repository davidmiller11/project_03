// javascripts/models/neighborhoodModel.js

var NeighborhoodModel = Backbone.Model.extend({

  urlRoot: '/neighborhoods',

  initialize: function() {
    var lat = this.get('lat');
    var lng = this.get('lng');

    this.center = new google.maps.LatLng( lat, lng );
  }

});