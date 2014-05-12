// javascripts/models/place.js

var app = app || {};

// Place Model

app.PlaceModel = Backbone.Model.extend({

  defaults: {
    name: '',
    photo_url: ''
  }

});