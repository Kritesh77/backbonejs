var app = app || {};

app.collections.FriendsCollection = Backbone.Collection.extend({
  initialize: function () {
    console.log("Creating a friendlist collection");
    this.on("remove", function (removedModel, models, options) {
      console.log("element removed at " + options.index, removedModel);
    });
  },
  removeModel: function () {
    console.log("Removing friend model");
  },
});
