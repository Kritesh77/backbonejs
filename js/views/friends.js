var app = app || {};

app.views.FriendContainerView = Backbone.View.extend({
  template: _.template($("#friends-container-template").html()),
  initialize: function () {
    console.log("friend container View Init", app.globals);
    // this.model.on("change", this.render, this);
    this.render();
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});
