var app = app || {};


  "use strict";

  var Workspace = Backbone.Router.extend({
    routes: {
      ".": "index",
      "./login": "login",
      tasks: "tasks",
      "chats:chatName": "chat",
      friends: "friends",
    },

    index: function () {
      // do nothing
    },
    login: function () {
      console.log("Routing to Login page");
      if (
        app.globals.is_authenticated &&
        app.globals.user &&
        app.globals.user.get("id")
      ) {
        PMS.fn.routeToDefault();
        return;
      }

      // Login is not allowed without an account
      if (_.contains(["", "www"], PMS.globals.accountSubdomain)) {
        PMS.log(
          "Not a valid account. Should move to createAccount instead of login"
        );
        PMS.globals.router.navigate("createAccount", {
          trigger: true,
        });
        return;
      }

      // Reset project title (i.e. show logo) in navbar
      PMS.fn.toggleNavbarTitle();

      // Resets to default app theme
      PMS.fn.generateAndApplyProjectColor();

      this.renderView(new PMS.views.LoginView());
    },
    tasks: function () {
      //remmove the old view
      const x = new app.TaskContainerView({
        el: $("#mainwrap-container"),
        model: new app.MainwrapModel(),
      });
    },
    chats: function (id) {
      console.log(id);
      const x = new app.ChatContainerView({
        el: $("#mainwrap-container"),
        model: new app.MainwrapModel(),
      });
    },
    friends: function () {
      const x = new app.FriendContainerView({
        el: $("#mainwrap-container"),
        model: new app.MainwrapModel(),
      });
    },
  });
  console.log("APP BEFORE", window.is_authenticated);

  $(document).ready(function () {
    app.router.MainRouter = new Workspace();
    new app.models.LoginViewModel();
    console.log("APP AFTER", app);
    Backbone.history.start();
  })
 

