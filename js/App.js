(function ($) {
  console.log("TEMP", $("#header-template"));
  var Model = Backbone.Model.extend({
    defaults: {
      name: "DEFAULT",
    },
  });
  var HeaderView = Backbone.View.extend({
    tagName: "div",
    todoTpl: _.template("<%= name %>"),
    initialize: function () {
      console.log(this.model);
      this.render();
    },
    render: function () {
      var template = _.template($("#header-template").html());
      console.log(template);
      this.$el.html(this.todoTpl(this.model.toJSON()));
      return this;
    },
  });
  $(document).ready(function () {
    var model = new Model();
    var myHeaderView = new HeaderView({ el: $("#header"), model });
    console.log(myHeaderView.el);
  });
})(jQuery);
