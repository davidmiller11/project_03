var LeaderboardView = Backbone.View.extend({

  el: "#leaderboard",

  initialize: function(){
    this.rankCount = 1;
    this.$el.show();
    this.addAll();
    // this.listenTo(this.collection, 'add', this.addOne);
    // this.listenTo(this.collection, 'reset', this.addAll);
  },

  addAll: function(){
    $('.data-row').remove();
    this.collection.each(this.addOne, this);
  },

  addOne: function( challenge ){
    var tableRow = "<td>"+this.rankCount+"</td><td>"+challenge.get('player_name')+"</td><td>"+challenge.get('place_type')+"</td><td>"+challenge.get('hood_name')+"</td><td>"+challenge.get('score_avg')+"</td>";
    // todoView.$el.appendTo(this.$el);
    $('<tr class="data-row">').html( tableRow ).insertBefore( this.$el.find('#bottom-row') );
    this.rankCount++;
  }

});