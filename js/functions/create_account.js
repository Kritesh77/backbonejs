app.LoginView = Backbone.Views.extend({
  template: _.template($("#login-view").html()),

  className: "LoginView",

  events: {
    "click .login-button": "startLogin",
  },

  startLogin: function (evt) {
    var self = this;
    var email = this.$(':input[name="email"]').val();
    var pwd = this.$(':input[name="password"]').val();
    var loginData = {
      email: email,
      password: pwd,
    };
    comsole.log("Login data -> " + loginData);

    $.ajax({
      url: "http://127.0.0.1:8000/api/login/",
      type: "POST",
      data: JSON.stringify(loginData),
      contentType: "application/json",
      dataType: "json",
      error: function (response) {
        alert(url + " returns a " + response.status);
      },
      success() {
        alert(url + " Good link");
      },
    }).then(function (data) {
      app.globals.is_authenticated = true;

      //   sessionStorage.clear();

      console.log(data.username);
      //   var view2 = new PMS.views.CreateAccountView({
      //     el: "#AH_PageContainer",
      //   });
      //   view2.render();
    });
  },
});

$(function () {
  var view = new app.LoginView({
    el: "#homepage",
  });
  view.render();
});
