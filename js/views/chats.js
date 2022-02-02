var app = app || {};
$(function () {
  app.views.ChatContainerView = Backbone.View.extend({
    template: _.template($("#chat-container-template").html()),
    initialize: function () {
      console.log("chat container View Init");
      // this.model.on("change", this.render, this);
      this.render();
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });
});
