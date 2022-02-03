var app = app || {};

app.collections.TasksCollection = Backbone.Collection.extend({
  initialize: function () {
    console.log("Creating a task collection");
  },
  comparator: function (a, b) {
    return a.get("id") > b.get("id") ? -1 : 1;
  },
});
