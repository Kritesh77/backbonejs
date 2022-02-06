var app = app || {};

app.models.FriendsModel = Backbone.Model.extend({
  defaults: {
    sender: "",
    reciever: "",
    dateRecieved: "",
    dateAccepted: "",
    status: "",
    friends: [
      {
        sender: "",
        reciever: "",
        dateRecieved: "",
        dateAccepted: "",
        status: "",
      },
    ],
  },
  initialize: function () {
    console.log("Creating a friendlist model");
    this.on("change:status", function () {
      console.log("status changed for friendlist model");
    });
  },
  getFriends: function () {},
});
