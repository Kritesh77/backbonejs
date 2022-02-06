var app = app || {};

app.collections.FriendsCollection = Backbone.Collection.extend({
  initialize: function () {
    console.log("Creating a friendlist collection");
  },
});
