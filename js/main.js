(function ($) {
  $(document).ready(function () {
    var Main = Backbone.Model.extend({
      defaults: {
        username: app.globals.username || "K",
        heading: "insert_heading",
        add_image: true,
        icon: "Chat Room.png",
      },
      initialize: function () {
        console.log("Main root Model init");
      },
      loginUser: function () {},
    });

    const data = {
      username: "arya",
      password: "Anas@123",
    };
   
  });
})(jQuery);
