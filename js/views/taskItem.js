var app = app || {};

app.views.TaskItemView = Backbone.View.extend({
  template: _.template($("#task-list-template").html()),
  template_assigned: _.template($("#assigned-to-task-list-template").html()),
  initialize: function () {
    // console.log("Task list View Init", this);
    this.model.on("change", this.render, this);
  },
  events: {
    "click #mark-todo-done": "markTodoDone",
    "click #delete-todo-task": "deleteTodoTask",
  },
  render: function () {
    // console.log(this.model.get("status"), this.model.get("priority"));
    const data = {
      created_at: this.model.get("created_at"),
      title: this.model.get("title"),
      priority: this.model.get("priority"),
      status: this.model.get("status"),
      description: this.model.get("description"),
      creator_username: this.model.get("creator")?.username,
      creator_id: this.model.get("creator")?.id,
      task_id: this.model.get("id"),
      assigned_to: this.model.get("assigned_to")?.map((x) => x.username),
      updated_at: this.model.get("updated_at"),
    };

    const currentUser = app.globals.username;
    if (
      !data.assigned_to.includes(currentUser) &&
      data.creator_username === currentUser &&
      !data.status
    ) {
      console.log("if");
      this.$el.html(this.template_assigned(data));
    } else {
      console.log("else");
      this.$el.html(this.template(data));
    }
    return this;
  },
  markTodoDone: function () {
    this.model.toggleTodoStatus();
  },
  deleteTodoTask: function () {
    this.model.deleteTodoTask();
  },
});
