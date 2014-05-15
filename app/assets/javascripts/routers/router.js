var AppRouter = Backbone.Router.extend({

  routes: {
    "": 'index'
    // "play": 'play'
  },

  initialize: function() {
    this.neighborhoods = new NeighborhoodCollection();
    this.appView = new AppView();
    console.log('new AppRouter instantiated!')
  },

  start: function() {
    Backbone.history.start();
    console.log('Backbone history started!');
  },

  index: function() {
    console.log('index route hit!');
    this.neighborhoods.fetch({
      success: function() {
        console.log('Fetch successful!');
      }
    });
  }

  // play: function() {
  //   if ( game ) {
  //     game.endGame();
  //   }
  //   game = new Game();
  //   game.startGame();
  //   console.log( "DM: game instantiated, game.startGame called!" );
  // }

});