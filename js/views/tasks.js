var app = app || {};

app.views.TaskContainerView = Backbone.View.extend({
  collection: app.globals.TaskCollection,
  template: _.template($("#task-container-template").html()),
  initialize: function () {
    console.log("Task container View Init");
    this.listenTo(app.globals.TaskCollection, "change:status", this.render);
    this.listenTo(app.globals.TaskCollection, "remove", this.render);
    this.render();
  },
  render: function () {
    console.log("TASK VIEW RENDER");
    this.$el.html(this.template(this.model.toJSON()));

    app.globals.TaskCollection.map(function (taskModel) {
      const status = taskModel.get("status");
      const creator = taskModel.get("creator").username;
      const assigned_to = taskModel.get("assigned_to").map((x) => x.username);
      const currentUser = app.globals.username;
      var newView = new app.views.TaskItemView({
        model: taskModel,
      });
      console.log("ASSIGNED TO", taskModel.attributes, assigned_to);

      if (assigned_to.includes(currentUser) && !status) {
        console.log("1");
        this.$("#task-item-container").append(newView.$el);
      } else if (status && creator !== currentUser) {
        console.log("2");
        this.$("#completed-task-item-container").append(newView.$el);
      } else if (creator === currentUser) {
        console.log("3");
        this.$("#assigned-task-item-container").append(newView.$el);
      }
      newView.render();
    });
    return this;
  },
});
