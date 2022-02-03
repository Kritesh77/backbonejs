var app = app || {};

app.models.TaskModel = Backbone.Model.extend({
  defaults: {
    assigned_to: [],
    created_at: new Date(),
    creator: {},
    description: "",
    id: Math.round(Math.random() * 10),
    priority: "",
    resource_uri: "",
    status: "pending",
    title: "",
    updated_at: "",
  },

  initialize: function () {
    console.log("Task model init ID", this.get("id"));
    this.on("change", function () {
      console.log(
        "model status changed to ",
        this.get("title"),
        this.get("status")
      );
    });
  },
  addTask: function (taskData) {
    //update the database for this task and then create a new model;
    //push it in the collections on change
    if (app.fn.addNewTask(taskData)) {
      //data inserted
      console.log("THISMODEL", this.model);
      app.router.MainRouter.navigate("tasks", { trigger: true });
    } else {
      console.log("Task add error");
    }
  },
  checkTodo: function () {
    const id = this.get("id");
    if (this.get("status") == "Completed") {
      this.set("status", "Pending");

      app.fn.updateTaskStatus(id, "Pending").then((res) => {
        if (res) {
          this.set("status", "Pending");
        }
      });
    } else if (this.get("status") !== "Completed") {
      this.set("status", "Completed");

      app.fn.updateTaskStatus(id, "Completed").then((res) => {
        if (res) {
          this.set("status", "Completed");
        }
      });
    }
  },
});
