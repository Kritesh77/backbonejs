var app = app || {};

app.views.LoginView = Backbone.View.extend({
  template: _.template($("#login-view").html()),
  events: {
    "click #login-submit": "startLogin",
    "click #redirect-signup": "redirectToSignup",
  },
  initialize: function () {
    const self = this;
    console.log("Login View Init");
    self.model.on("change:errorMessage", this.render, this);

    self.model.on("change", function () {
      if (
        self.model.get("is_authenticated") &&
        self.model.get("username") &&
        self.model.get("token")
      ) {
        console.log("is_authenticated CHANGES", self.model.get("token"));
        //redirect to home and rerender it
        app.fn.redirect("tasks");
      }
    });
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

  redirectToSignup: function () {
    app.fn.redirect("signup");
  },
});
