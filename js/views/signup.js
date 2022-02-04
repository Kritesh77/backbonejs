var app = app || {};

app.views.SignupView = Backbone.View.extend({
  template: _.template($("#signup-view").html()),
  events: {
    "click #signup-submit": "startSignup",
    "click #redirect-login": "redirectToLogin",
  },
  initialize: function () {
    const self = this;
    console.log("Signup View Init");
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

  startSignup: function (e) {
    e.preventDefault();
    e.stopPropagation();
    var email = this.$(':input[name="email"]').val();
    var pwd = this.$(':input[name="password"]').val();
    var signupData = {
      username: email,
      password: pwd,
    };
    console.log("Signup data -> ", signupData);
    this.model.signup(signupData);
  },
  redirectToLogin: function () {
    app.fn.redirect("login");
  },
});
