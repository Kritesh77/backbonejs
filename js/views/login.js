var app = app || {};

app.views.LoginView = Backbone.View.extend({
  template: _.template($("#login-view").html()),

  events: {
    "click #login-button": "startLogin",
  },
  initialize: function () {
    console.log("Login View Init", this);
    const self = this
    this.model.on(
      "change",
      function () {
        if (self.model.get("is_authenticated")) {
          console.log("MODEL AUTHENTICAETED CHANGED")
          this.remove();
          new app.models.SidebarViewModel();
        }
      },
    );
    this.render();
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  startLogin: function () {
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
