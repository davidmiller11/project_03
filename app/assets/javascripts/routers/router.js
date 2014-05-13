var AppRouter = Backbone.Router.extend({

  routes: {
    "": 'index'
  },

  initialize: function() {
    this.appView = new AppView();
  },

  start: function() {
    Backbone.history.start();
  },

  index: function() {
    console.log('index route hit!');
  }

});