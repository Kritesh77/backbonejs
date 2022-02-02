var app = app || {};
$(function () {
  app.models.MainwrapModel = Backbone.Model.extend({
    defaults:{
      username:app.globals.username||"",
      token:app.globals.token||""
    }
  });
});
