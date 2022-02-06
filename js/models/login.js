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
    app.fn.login(loginData).then(({ dataJson, status }) => {
      console.log("STATUS", dataJson, status);
      if (status === 200) {
        app.globals.is_authenticated = true;
        app.globals.username = dataJson.username;
        app.globals.token = dataJson.token;
        self.set("is_authenticated", true);
        self.set("username", app.globals.username);
        self.set("token", app.globals.token);
        console.log("user logged in", dataJson);
      } else {
        console.log("ERROR LOGIN", dataJson);
        self.set("errorMessage", dataJson?.error);
      }
    });
  },
  signup: function (signupData) {
    const self = this;
    app.fn.signup(signupData).then(({ dataJson, status }) => {
      console.log("STATUS", dataJson, status);
      if (status === 200) {
        app.globals.is_authenticated = true;
        app.globals.username = dataJson.username;
        app.globals.token = dataJson.token;
        self.set("is_authenticated", true);
        self.set("username", app.globals.username);
        self.set("token", app.globals.token);
        console.log("user logged in", dataJson);
      } else {
        console.log("ERROR SIGNUP", dataJson);
        self.set("errorMessage", dataJson?.error);
      }
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
