// javascripts/views/app-view.js

var app = app || {};

// The Application

// overall AppView is the top-level piece of UI.
app.AppView = Backbone.View.extend({

  el: '#kycapp',

  events: {
    'click #play-button': 'startGame'
  },

  startGame: function( event ) {
    var neighborhood = $('#challenge-neighborhood').val();
    var placeType = $('#challenge-place-type').val();
    initialize( neighborhood, placeType );
  }

  // AppView's job is to listen to collection and to create and render the new place

});