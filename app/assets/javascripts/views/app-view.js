// javascripts/views/app-view.js

// The Application

// overall AppView is the top-level piece of UI.
AppView = Backbone.View.extend({

  el: '#kycapp',

  events: {
    'click #play-button': 'startGame'
  },

  startGame: function( event ) {
    game = new Game();
    game.startGame();
    console.log( "game initialized in appView and started!" );
  }

});