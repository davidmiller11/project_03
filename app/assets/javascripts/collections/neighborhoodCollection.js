// javascripts/collections/neighborhoodCollection.js

var NeighborhoodCollection = Backbone.Collection.extend({

  url: '/neighborhoods',
  model: NeighborhoodModel

});