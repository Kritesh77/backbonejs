(function ($) {
  var CounterModel = Backbone.Model.extend({
    initialize: function () {
      console.log("COUNTER MODEL INIT");
    },
    increment: function () {
      const getCount = this.get("count");
      console.log(getCount);
      this.set("count", getCount + 1);
    },
    defaults: {
      count: 0,
    },
  });

  var CounterView = Backbone.View.extend({
    template: _.template($("#header-template").html()),
    // template: _.template("Welcome to <%= name %>"),
    initialize: function () {
      this.model.on("change", this.render, this);
      this.render();
    },

    events: {
      "click #increment": "incrementCounter",
    },
    incrementCounter: function () {
      this.model.increment();
    },
    render: function () {
      console.log(this);
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });

  $(document).ready(function () {
    const model = new CounterModel();
    var counterViewObj = new CounterView({
      el: $("#header"),
      model,
    });
    console.log("counter obj el", counterViewObj.el);
  });
})(jQuery);
