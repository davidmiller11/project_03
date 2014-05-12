// javascripts/collections/places.js

var app = app || {};

// Place Collection

var Places = Backbone.Collection.extend({

  model: app.Place

});

// Create global collection of Places
app.places = new Places();