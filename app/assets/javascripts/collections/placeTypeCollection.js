// javascripts/collections/placeTypeCollection.js

var PlaceTypeCollection = Backbone.Collection.extend({

  url: '/place_types',

  model: PlaceTypeModel

})