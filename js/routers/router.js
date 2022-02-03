var app = app || {};
("use strict");

var Workspace = Backbone.Router.extend({
  routes: {
    // ".": "index",
    "#": "index",
    login: "login",
    signup: "signup",
    tasks: "tasks",
    chat: "chat",
    friends: "friends",
    assignNewTask: "assignNewTask",
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
        model: new app.models.LoginModel(),
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
        model: new app.models.LoginModel(),
      });
    } else {
      app.fn.redirectToHome();
    }
  },
  tasks: function () {
    //remmove the old view
    if (!app.globals.is_authenticated) {
      app.fn.redirectToLogin();
    } else {
      if (app?.globals?.username?.length) {
        new app.globals.SidebarView({
          el: $("#sidebar-header"),
        });
      }
      const taskList = app.fn.getTaskList();

      taskList.then((taskListData) => {
        console.log(taskListData);

        taskListData.forEach((data) => {
          //make a new model
          const newModel = new app.models.TaskModel(data);
          //push it in collections
          app.globals.TaskCollection.add(newModel);
        });
        console.log(app.globals.TaskCollection);
        //render the view
        new app.views.TaskContainerView({
          el: $("#mainwrap-container"),
          model: new app.models.TaskModel(),
        });
      });
    }
  },
  chat: function (id) {
    console.log(id);
    const x = new app.views.ChatContainerView({
      el: $("#mainwrap-container"),
      model: new app.models.MainwrapModel(),
    });
  },
  friends: function () {
    if (!app.globals.is_authenticated) {
      app.fn.redirectToLogin();
    } else {
      if (app?.globals?.username?.length) {
        new app.globals.SidebarView({
          el: $("#sidebar-header"),
        });
      }
      const x = new app.views.FriendContainerView({
        el: $("#mainwrap-container"),
        model: new app.models.MainwrapModel(),
      });
    }
  },
  assignNewTask: function () {
    if (!app.globals.is_authenticated) {
      app.fn.redirectToLogin();
    } else {
      if (app?.globals?.username?.length) {
        new app.globals.SidebarView({
          el: $("#sidebar-header"),
        });
      }
      new app.views.AssignNewTaskView({
        el: $("#mainwrap-container"),
        model: new app.models.TaskModel(),
      });
    }
    console.log(app.globals.TaskCollection);
  },
});
console.log("APP BEFORE", app.globals.is_authenticated);

$(document).ready(function () {
  app.router.MainRouter = new Workspace();
  console.log(app.router.MainRouter);
  Backbone.history.start();
});
