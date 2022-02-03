var app = app || {};

app.views.TaskContainerView = Backbone.View.extend({
  template: _.template($("#task-container-template").html()),

  initialize: function () {
    console.log("Task container View Init");
    // this.listenTo(this.model, "change:status", this.render);
    this.render();
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    app.globals.TaskCollection.map(function (taskModel) {
      this.inner = new app.views.TaskItemView({
        model: taskModel,
      });
      this.$("#task-item-container").append(this.inner.$el);
    });
    return this;
  },
});
