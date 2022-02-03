var app = app || {};

app.collections.friendsCollection = Backbone.Collection.extend({
  model: app.models.friendListModel,
  initialize: function () {
    console.log("Creating a friendlist collection");
  },
});
