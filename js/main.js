var app = app || {};
$(document).ready(function () {
  //testing
  // app.globals.token = "5b055c9f52db485a2c0fdd67418a3dbbf19c4a4b";
  // app.globals.username = "k";
  // app.globals.is_authenticated = true;
  app.globals.token = app.fn.getCookie("token") || "";
  app.globals.username = app.fn.getCookie("username") || "";
  app.globals.is_authenticated = app.fn.getCookie("is_authenticated") || "";
  console.log(
    app.globals.token,
    app.globals.username,
    app.globals.is_authenticated
  );
  const data = {
    username: "arya",
    password: "Anas@123",
  };
  //render sidebar here

  app.globals.SidebarView = Backbone.View.extend({
    attributes: {
      username: app.globals.username || "Krtiehs",
    },
    template_username: _.template($("#username-template").html()),
    events: {
      "click #login-redirect": "goToLoginPage",
      "click #logout-button": "logout",
    },
    goToLoginPage: function () {
      console.log("redirect to login page");
      app.router.MainRouter.navigate("/login", { trigger: true });
    },
    logout: function () {
      if (
        app.fn.getCookie("username") &&
        app.fn.getCookie("is_authenticated") &&
        app.fn.getCookie("token")
      ) {
        app.fn.setCookie("token", "");
        app.fn.setCookie("username", "");
        app.fn.setCookie("is_authenticated", "");
        app.globals.username = "";
        app.globals.is_authenticated = "";
        app.globals.token = "";
        app.router.MainRouter.navigate("chat", { trigger: true });
        location.reload();
      }
    },
    initialize: function () {
      console.log("sidebar view init", this);
      this.render();
    },
    render: function () {
      this.$el.html(
        this.template_username({ username: app.globals.username || "Krtiehs" })
      );
      return this;
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

  new app.globals.SidebarView({
    el: $("#sidebar-header"),
  });

  new app.globals.SidebarButtons({
    el: $("#sidebar-buttons"),
  });

  app.globals.TaskCollection = new app.collections.TasksCollection();

  app.globals.FriendsCollection = new app.collections.FriendsCollection();

  // console.log("XEL", x.el, app.globals.username);
});
