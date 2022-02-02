var app = app || {};
(function ($) {
  app.views.UsernameView = Backbone.View.extend({
    template: _.template("<%= username %>"),
    initialize: function () {
      console.log(
        "Username View Init",
        this.model.get("username"),
        window.username
      );
      // this.model.on("change", this.render, this);
      this.render();
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });
  app.views.TaskButtonView = Backbone.View.extend({
    template: _.template($("#sidebar-task-button").html()),
    events: {
      "click h1": "navigate",
    },
    navigate: function () {
      app.router.MainRouter.navigate("/tasks", { trigger: true });
    },
    initialize: function () {
      console.log("TaskButton View Init");
      // this.model.on("change", this.render, this);
      this.render();
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });

  app.views.ChatButtonView = Backbone.View.extend({
    template: _.template($("#sidebar-chat-button").html()),
    events: {
      "click h1": "navigate",
    },
    navigate: function () {
      app.router.MainRouter.navigate("/chats/" + 123, { trigger: true });
    },
    initialize: function () {
      console.log("TaskButton View Init");
      // this.model.on("change", this.render, this);
      this.render();
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });

  app.views.FriendButtonView = Backbone.View.extend({
    template: _.template($("#sidebar-friend-button").html(), { heading: "ss" }),
    events: {
      "click .increment": "incrementCounter",
    },
    events: {
      "click h1": "navigate",
    },
    navigate: function () {
      app.router.MainRouter.navigate("/friends", { trigger: true });
    },
    initialize: function () {
      console.log("TaskButton View Init");
      this.model.setHeading("AAsA");
      // this.model.on("change", this.render, this);
      this.render();
    },
    render: function () {
      console.log(this.model.toJSON());
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });
  app.views.AssignTaskView = Backbone.View.extend({
    template: _.template($("#sidebar-assign-task-button").html()),
    events: {
      "click .add-task": "addTask",
    },

    initialize: function () {
      console.log("TaskButton View Init");
      // this.model.on("change", this.render, this);
      this.render();
    },
    addTask:function(){

    },
    render: function () {
      console.log(this.model.toJSON());
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });
})(jQuery);
