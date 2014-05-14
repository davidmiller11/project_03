// javascripts/views/input-view.js

var InputView = Backbone.View.extend({

  el: '#challenge-form',

  events: {
    'click #play-button': 'startGame'
  },

  startGame: function() {
    game = new Game();
    game.startGame();
    console.log( "game initialized inputView and started!" );
  }

});