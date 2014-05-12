// javascripts/models/place.js

var app = app || {};

// Place Model

app.Place = Backbone.Model.extend({

  defaults: {
    name: '',
    photo_url: ''
  }

});