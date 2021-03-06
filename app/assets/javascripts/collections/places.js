// javascripts/collections/places.js

// Place Collection

var PlaceCollection = Backbone.Collection.extend({

  model: PlaceModel,

  showOne: function( id ) {
    var modelsToRemove = this.filter( function( place ){
      return place.id != id;
    });
    this.remove( modelsToRemove );
  }

});