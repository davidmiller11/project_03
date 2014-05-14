var AppRouter = Backbone.Router.extend({

  routes: {
    "": 'index'
  },

  initialize: function() {
    this.neighborhoods = new NeighborhoodCollection();
    this.appView = new AppView();
    // this.inputView = new InputView({
    //   collection: this.neighborhoods
    // }); 
  },

  start: function() {
    Backbone.history.start();
  },

  index: function() {
    console.log('index route hit!');
    this.neighborhoods.fetch({
      success: function() {
        console.log('Fetch successful!');
      }
    });
  }

});