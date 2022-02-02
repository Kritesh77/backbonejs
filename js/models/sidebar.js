var app = app || {};

app.models.SidebarViewModel = Backbone.Model.extend({
  defaults: {
    username: app.globals.username || "",
  },
  initialize: function () {
    console.log("Sidebar Model init", app.globals.username);
    this.on("change:username",function(){
      console.log("username changed to",this.get("username"))
    })
    if(app.globals.is_authenticated){
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
    }
    else{
      new app.models.LoginViewModel()
    }
  },
  setHeading: function (heading) {
    this.set("heading", heading);
  },
});
