var app = app || {};
  "use strict";

  var Workspace = Backbone.Router.extend({
    routes: {
      ".": "index",
      "login": "login",
      tasks: "tasks",
      "chats:chatName": "chat",
      friends: "friends",
    },
   
    index: function () {
      // do nothing
    },
    login: function () {
      console.log("Routing to Login");
      if(!app.globals.is_authenticated){
        new app.models.LoginViewModel();
      }
    },
    tasks: function () {
      //remmove the old view
      const x = new app.views.TaskContainerView({
        el: $("#mainwrap-container"),
        model: new app.models.MainwrapModel(
          {username:app.globals.username,token:app.globals.token}
          ),
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
    console.log(app.router.MainRouter)
    new app.models.LoginViewModel()
    app.sideBarView = new app.views.UsernameView({
      el: $("#sidebar"),
    })
    app.sideBarView.render()
        // console.log("APP AFTER", app);
    Backbone.history.start();
  })
 

