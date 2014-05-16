// javascripts/collections/challengeCollection.js

var ChallengeCollection = Backbone.Collection.extend({

  url: '/challenges',
  
  model: ChallengeModel,

  initialize: function() {
    console.log('new ChallengeCollection instantiated!');
  }

});