var app = app || {};
$(document).ready(function () {
  app.globals.username = "";
  app.globals.is_authenticated = false;
  app.globals.token = "";

  //testing
  // app.globals.token = "a9401c05abeeb981c697f2e72bed3351024d2526";
  // app.globals.username = "k";
  // app.globals.is_authenticated = true;

  const data = {
    username: "arya",
    password: "Anas@123",
  };
  //render sidebar here

  app.globals.SidebarView = Backbone.View.extend({
    attributes: {
      username: app.globals.username || "Krtiehs",
    },
    template: _.template($("#username-template").html()),
    events: {
      "click #login-redirect": "goToLoginPage",
    },
    goToLoginPage: function () {
      console.log("redirect to login page");
      app.router.MainRouter.navigate("/login", { trigger: true });
    },
    initialize: function () {
      console.log("sidebar view init", this);
      this.render();
    },
    render: function () {
      this.$el.html(
        this.template({ username: app.globals.username || "Krtiehs" })
      );
      return self;
    },
  });

  app.globals.SidebarButtons = Backbone.View.extend({
    events: {
      "click #task-button": "goToTasks",
      "click #friends-button": "goToFriends",
      "click #chat-button": "goToChats",
      "click #assign-task-button": "assignNewTask",
    },
    goToTasks: function () {
      app.router.MainRouter.navigate("tasks", { trigger: true });
    },
    goToFriends: function () {
      app.router.MainRouter.navigate("friends", { trigger: true });
    },
    goToChats: function () {
      app.router.MainRouter.navigate("chat", { trigger: true });
    },
    assignNewTask: function () {
      app.router.MainRouter.navigate("assignNewTask", { trigger: true });
    },
  });

  var x = new app.globals.SidebarView({
    el: $("#sidebar-header"),
  });

  new app.globals.SidebarButtons({
    el: $("#sidebar-buttons"),
  });

  app.globals.TaskCollection = new app.collections.TasksCollection({
    model: app.models.TaskModel,
  });
  app.globals.TaskCollection.pop();

  app.globals.FriendsCollection = new app.collections.FriendsCollection({
    model: app.models.Friends,
  });

  // console.log("XEL", x.el, app.globals.username);
});
