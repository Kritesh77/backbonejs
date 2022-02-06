var app = app || {};

app.views.FriendContainerView = Backbone.View.extend({
  template: _.template($("#friends-container-template").html()),
  initialize: function () {
    console.log("friend container View Init", app.globals);
    // this.model.on("change", this.render, this);
    this.render();
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    app.globals.FriendsCollection.map(function (friendsModel) {
      this.inner = new app.views.TaskItemView({
        model: friendsModel,
      });
      this.$("#task-item-container").append(this.inner.$el);
    });
    return this;
  },
});
