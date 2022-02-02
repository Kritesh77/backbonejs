var app = app || {};

app.views.LoginView = Backbone.View.extend({
  template: _.template($("#login-view").html()),

  events: {
    "click #login-form": "startLogin",
  },
  initialize: function () {
    // console.log("Login View Init", this);
    const self = this
    console.log("HELLO",this.model.get("token"))
    this.model.on(
      "change",
      function () {
        if (self.model.get("is_authenticated")) {
          debugger;
          console.log("MODEL AUTHENTICAETED CHANGED")
          // self.remove();
          app.sideBarview.render()
          // new app.models.SidebarViewModel();
        }
      },
    );
    this.render();
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  startLogin: function (e) {
    e.preventDefault();
    e.stopPropagation();
    var email = this.$(':input[name="email"]').val();
    var pwd = this.$(':input[name="password"]').val();
    var loginData = {
      username: email,
      password: pwd,
    };
    console.log("Login data -> ", loginData);
    this.model.login(loginData);
  },
});
