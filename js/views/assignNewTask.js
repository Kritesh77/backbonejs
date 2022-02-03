var app = app || {};

app.views.AssignNewTaskView = Backbone.View.extend({
  template: _.template($("#assign-task-template").html()),
  events: {
    "click #submit-assign-new-task": "assignTask",
  },
  initialize: function () {
    const self = this;
    console.log("Login View Init");
    this.model.on("change", function () {
      //add model to collection
      app.globals.TaskCollection.add(self.model);
    });
    this.render();
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  assignTask: function (e) {
    e.preventDefault();
    e.stopPropagation();
    var assigned_to = this.$("#assign-task-username").val();
    var title = this.$("#assign-task-title").val();
    var description = this.$("#assign-task-description").val();
    var priority = this.$("#assign-task-priority option:selected").text();
    var taskData = {
      assigned_to: { id: 0, username: assigned_to },
      title,
      description,
      priority,
      creator: { id: app.globals.id, username: app.globals.username },
    };
    console.log("Task data -> ", taskData);
    this.model.addTask(taskData);
    // console.log(app.globals.TaskCollection);
  },
});
