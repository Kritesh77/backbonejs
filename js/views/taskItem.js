var app = app || {};

app.views.TaskItemView = Backbone.View.extend({
  template: _.template($("#task-list-template").html()),

  initialize: function () {
    // console.log("Task list View Init", this);
    this.model.on("change", this.render, this);
    this.render();
  },
  events: {
    "click #mark-todo-done": "markTodoDone",
  },
  render: function () {
    console.log(this.model.get("status"), this.model.get("priority"));
    const data = {
      created_at: this.model.get("created_at"),
      title: this.model.get("title"),
      priority: this.model.get("priority"),
      status: this.model.get("status"),
      description: this.model.get("description"),
      creator_username: this.model.get("creator")?.username,
      creator_id: this.model.get("creator")?.id,
      task_id: this.model.get("id"),
    };
    this.$el.html(this.template(data));
    return this;
  },
  markTodoDone: function () {
    this.model.toggleTodoStatus();
  },
});
