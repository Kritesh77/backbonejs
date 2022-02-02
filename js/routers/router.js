var app = app || {};
("use strict");

var Workspace = Backbone.Router.extend({
  routes: {
    // ".": "index",
    "#": "index",
    login: "login",
    signup: "signup",
    tasks: "tasks",
    "chats:chatName": "chat",
    friends: "friends",
  },

  index: function () {
    // do nothing
    console.log("OK");
  },

  login: function () {
    console.log("Routing to Login");
    if (!app.globals.is_authenticated) {
      new app.views.LoginView({
        el: $("#mainwrap-container"),
        model: new app.models.LoginSignupModel(),
      });
    } else {
      app.fn.redirectToHome();
    }
  },
  signup: function () {
    console.log("Routing to signup");
    if (!app.globals.is_authenticated) {
      new app.views.LoginView({
        el: $("#mainwrap-container"),
        model: new app.models.LoginSignupModel(),
      });
    } else {
      app.fn.redirectToHome();
    }
  },
  tasks: function () {
    //remmove the old view
    new app.globals.SidebarView({
      el: $("#sidebar-header"),
    });
    const x = new app.views.TaskContainerView({
      el: $("#mainwrap-container"),
      model: new app.models.MainwrapModel({
        username: app.globals.username,
        token: app.globals.token,
      }),
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
    const x = new app.views.FriendContainerView({
      el: $("#mainwrap-container"),
      model: new app.models.MainwrapModel(),
    });
  },
});
console.log("APP BEFORE", app.globals.is_authenticated);

$(document).ready(function () {
  app.router.MainRouter = new Workspace();
  console.log(app.router.MainRouter);
  // new app.models.LoginViewModel()
  // app.sideBarView = new app.views.UsernameView({
  //   el: $("#sidebar"),
  // })
  // app.sideBarView.render()
  // console.log("APP AFTER", app);
  Backbone.history.start();
});
