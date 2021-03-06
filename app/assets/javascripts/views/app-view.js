// javascripts/views/app-view.js

// The Application

// overall AppView is the top-level piece of UI.
AppView = Backbone.View.extend({

  el: '#kycapp',

  initialize: function() {
    this.inputView = new InputView({}); 
    console.log('new AppView instantiated');
  },

  events: {
    'click #play-again-button': 'endGame'
  },

  endGame: function() {
    game.endGame();
    game = undefined;
  }

});