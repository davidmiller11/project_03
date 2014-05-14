var AppRouter = Backbone.Router.extend({

  routes: {
    "": 'index'
  },

  initialize: function() {
    // this.collection = new NeighborhoodCollection();
    this.inputView = new InputView({
      // collection: this.collection;
    }); 
  },

  start: function() {
    Backbone.history.start();
  },

  index: function() {
    console.log('index route hit!');
    // this.collection.fetch({
    //   success: function() {
    //     console.log('Fetch successful!');
    //   }
    // });
  }

});