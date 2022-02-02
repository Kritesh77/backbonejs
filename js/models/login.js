var app = app || {};

app.models.LoginModel = Backbone.Model.extend({
  defaults: {
    is_authenticated: app.globals.is_authenticated || false,
    username: app.globals.username || "",
    token: app.globals.token || "",
  },
  initialize: function () {
    console.log("login Model init is_authenticated:", this.get("token"));
    this.render();
  },
  render: function () {
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
    // app.globals.token= "45b2ac2079778fd395fa8aa31ce0653b58d8a4f1",
    // app.globals.username= "falak"
    // app.globals.is_authenticated= true
    // this.set("is_authenticated", true);
    // this.set("username",  app.globals.username);
    // this.set("token", app.globals.token);
    $.ajax({
      url: "http://127.0.0.1:8000/api/login/",
      type: "POST",
      //   data: JSON.stringify(loginData),
      data: JSON.stringify(loginData),
      contentType: "application/json",
      dataType: "json",
    })
      .then(function (data) {
        app.globals.is_authenticated = true;
        app.globals.username = data.username;
        app.globals.token = data.token;
        self.set("is_authenticated", true);
        self.set("username", app.globals.username);
        self.set("token", app.globals.token);
        console.log("user logged in", data);
      })
      .catch((e) => console.log("LOGIN ERROR", e));
  },
  getUser: function () {
    return {
      username: this.get("username"),
      token: this.get("token"),
      is_authenticated: this.get("is_authenticated"),
    };
  },
});
