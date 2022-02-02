var app = app || {};

app.models.LoginViewModel = Backbone.Model.extend({
  defaults: {
    is_authenticated: app.globals.is_authenticated || false,
    username: "",
    password: "",
  },
  initialize: function () {
    console.log("login Model init is_authenticated:", this.get("is_authenticated"));
    this.on("change:is_authenticated", function () {
      console.log("is_authenticated CHANGES",this.get("is_authenticated"));
    });
    this.render();
  },
  render: function () {
    console.log("this.render(): ",this.get("is_authenticated"),this)
    if (!this.get("is_authenticated")) {
      console.log("not authenticated,calling login view");
      new app.views.LoginView({
        el: $("#login-container"),
        model: this,
      });
    }
  },
  login: function (loginData) {
    const self = this;
    $.ajax({
      url: "http://127.0.0.1:8000/api/login/",
      type: "POST",
      //   data: JSON.stringify(loginData),
      data: JSON.stringify({
        username: "arya",
        password: "Anas@123",
      }),
      contentType: "application/json",
      dataType: "json",
      error: function (response) {
        alert("Invalid Credentials");
      },
      success() {
        console.log("Login Success");
      },
    })
      .then(function (data) {
        app.globals.is_authenticated = true;
        app.globals.username = data.username;
        self.set("is_authenticated", true);
        console.log("user logged in", data.username);
      })
      .catch((e) => console.log("LOGIN ERROR", e));
  },
});
