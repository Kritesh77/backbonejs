var app = app || {};
$(function () {
  app.views.TaskContainerView = Backbone.View.extend({
    template: _.template($("#task-container-template").html()),

    initialize: function () {
      console.log("Task container View Init");
      this.render();
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.inner = new app.TaskItemView();
      this.$("#task-item-container").append(this.inner.$el);
      return this;
    },
  });
});
