var app = app || {};

$(function () {
  app.models.SidebarViewModel = Backbone.Model.extend({
    defaults: {
      username: window.username || "K",
      heading: "insert_heading",
      add_image: true,
      icon: "Chat Room.png",
    },
    initialize: function () {
      console.log("Sidebar Model init", this.get("username"));
      new app.views.UsernameView({
        el: $("#username"),
        model: this,
      });
      //render sidebar buttons
      new app.views.TaskButtonView({
        el: $("#task-button"),
        model: this,
      });
      new app.views.ChatButtonView({ el: $("#chat-button"), model: this });
      new app.views.FriendButtonView({ el: $("#friends-button"), model: this });
      new app.views.AssignTaskView({
        el: $("#assign-task-button"),
        model: this,
      });
    },
    setHeading: function (heading) {
      this.set("heading", heading);
    },
  });
});
