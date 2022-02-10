var app = app || {};

app.views.FriendContainerView = Backbone.View.extend({
  template: _.template($("#friends-container-template").html()),

  events: {
    "click #submit-friend-request": "addNewFriend",
  },
  initialize: function () {
    this.model.on("change", this.render, this);
    this.listenTo(app.globals.FriendsCollection, "add", this.render);
    this.listenTo(app.globals.FriendsCollection, "remove", this.render);
    this.render();
  },

  render: function () {
    console.log("FRIEND VIEW RENDER");
    this.$el.html(this.template(this.model.toJSON()));
    // console.log(app.globals.FriendsCollection);
    app.globals.FriendsCollection.each(function (friendsModel) {
      const senderUsername = friendsModel.get("sender")?.username;
      const recieverUsername = friendsModel.get("reciever")?.username;
      const status = friendsModel.get("status");
      console.log({ senderUsername, recieverUsername, status });
      var newView = new app.views.FriendsItemView({
        model: friendsModel,
      });
      if (recieverUsername === app.globals.username && status === "send") {
        console.log("1");
        this.$("#new-friend-item-list").append(newView.$el);
      } else if (senderUsername === app.globals.username && status === "send") {
        this.$("#sent-friend-item-list").append(newView.$el);
      } else if (status === "accepted") {
        this.$("#accepted-friend-item-list").append(newView.$el);
      }
    }, this);
    return this;
  },

  addNewFriend: function () {
    const friendUsername = this.$("#add-friend-input").val();
    console.log(friendUsername);
    if (friendUsername.length) {
      this.model.addFriend(friendUsername);
      console.log("new friend added to model", this.model);
    } else {
      this.model.set("errorMessage", "Enter username");
    }
  },
});
