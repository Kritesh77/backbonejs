var app = app || {};
$(function () {
  app.views.TaskItemView = Backbone.View.extend({
    template: _.template($("#task-list-template").html()),
    initialize: function () {
      console.log("Task list View Init");
      this.render();
    },
    render: function () {
      this.$el.html(this.template);

      return this;
    },
  });
});
