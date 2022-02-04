var app = app || {};

app.models.LoginModel = Backbone.Model.extend({
  defaults: {
    is_authenticated: app.globals.is_authenticated || false,
    username: app.globals.username || "",
    token: app.globals.token || "",
    errorMessage: "",
  },
  initialize: function () {
    console.log("login Model init is_authenticated:", this.get("token"));
  },

  login: function (loginData) {
    const self = this;
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
      .catch((e) => {
        self.set("errorMessage", e?.responseJSON?.error);

        console.log("LOGIN ERROR", e);
      });
  },
  signup: function (signupData) {
    const self = this;
    $.ajax({
      url: "http://127.0.0.1:8000/api/register/",
      type: "POST",
      //   data: JSON.stringify(loginData),
      data: JSON.stringify(signupData),
      contentType: "application/json",
      dataType: "json",
    })
      .then(function (data) {
        if (data.status === 200) {
          app.globals.is_authenticated = true;
          app.globals.username = data.username;
          app.globals.token = data.token;
          self.set("is_authenticated", true);
          self.set("username", app.globals.username);
          self.set("token", app.globals.token);
        } else {
          console.log("ERROR SIGNUP", data.error);
        }
        console.log("user logged in", data);
      })
      .catch((e) => {
        // alert("SIGNUP error");
        self.set("errorMessage", e?.responseJSON?.error);
        console.log("SIGNUP ERROR", e?.responseJSON?.error);
      });
  },
  getUser: function () {
    return {
      username: this.get("username"),
      token: this.get("token"),
      is_authenticated: this.get("is_authenticated"),
    };
  },
});
