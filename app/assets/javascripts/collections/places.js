// javascripts/collections/places.js

var app = app || {};

// Place Collection

var PlaceList = Backbone.Collection.extend({

  model: app.Place

});

// Create global collection of Places
app.Places = new PlaceList();