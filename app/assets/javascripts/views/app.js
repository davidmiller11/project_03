// javascripts/views/app.js

var app = app || {};

// The Application

// overall AppView is the top-level piece of UI.
app.AppView = Backbone.View.extend({

  el: '#kycapp',

  events: {
    'click #play-button': 'fillPlaces'
  },

  fillPlaces: function( event ) {
    var neighborhood = $('#challenge-neighborhood').val();
    var placeType = $('#challenge-place-type').val();
  }

  // AppView's job is to listen to collection and to create and render the new place

});