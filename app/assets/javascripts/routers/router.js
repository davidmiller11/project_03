var AppRouter = Backbone.Router.extend({

  routes: {
    "":             "index",        
    "leaderboard":  "leaderboard"   // #leaderboard
  },

  initialize: function() {
    this.neighborhoods = new NeighborhoodCollection();
    this.challenges = new ChallengeCollection();
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
        console.log('Neighborhoods fetch successful!');
        $('#leaderboard').hide();
        $('#header').show();
      }
    });
  },

  leaderboard: function() {
    console.log('Leaderboard route hit!');
    $('#header').hide();
    $('#game-view').hide();
    this.challenges.fetch({
      success: function() {
        console.log('Challenges fetch successful!');
        this.leaderboard = new LeaderboardView({ collection: this.challenges });
      }.bind( this )
    });
  }

});