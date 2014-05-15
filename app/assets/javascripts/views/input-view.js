// javascripts/views/input-view.js

var InputView = Backbone.View.extend({

  el: '#challenge-form',

  events: {
    'click #play-button': 'startGame'
  },

  initialize: function() {
    console.log('new InputView instantiated!');
  },

  startGame: function() {
    game = new Game();
    game.startGame();
    console.log( "game initialized inputView and started!" );
  }

});