var app = app || {};

app.models.FriendsModel = Backbone.Model.extend({
  defaults: {
    errorMessage: "",
    req_id: "",
    created_at: "",
    reciever: {},
    sender: {},
    status: "",
    updated_at: "",
    successMessage: "",
  },
  initialize: function () {
    console.log(
      "Creating a friendlist model",
      app.globals.FriendsCollection,
      this.attributes
    );
    this.on("change:status", function () {
      console.log("status changed for friendlist model");
    });
  },
  addFriend: async function (friendUsername) {
    const { dataJson, status } = await app.fn.addNewFriend(friendUsername);
    if (status === 201) {
      const newModel = new app.models.FriendsModel(
        app.fn.makeFriendItemObject(dataJson)
      );
      alert("Friend request sent");
      console.log(dataJson);
      app.globals.FriendsCollection.add(newModel);
      // app.router.MainRouter.navigate("friends", { trigger: true });
    } else {
      this.set("errorMessage", dataJson.error);
      console.log("Friend Request Error ", dataJson.error);
    }
  },
  acceptFriendRequest: async function () {
    console.log("Accept req", this);
    const { data, status } = await app.fn.acceptFriendRequest(
      this.get("req_id")
    );
    if (status === 200) {
      const newModel = new app.models.FriendsModel(
        app.fn.makeFriendItemObject(data)
      );
      app.globals.FriendsCollection.remove(this);
      app.globals.FriendsCollection.add(newModel);
      alert("Friend request accepted", data);
    } else {
      console.error(res);
    }
  },
  rejectFriendRequest: async function () {
    console.log("Delete req", this.get("req_id"));
    const { res, status } = await app.fn.rejectFriendRequest(
      this.get("req_id")
    );
    if (status === 204) {
      app.globals.FriendsCollection.remove(this);
      alert("Friend request deleted");
    } else {
      // this.set("errorMessage", "Enter username");
      console.error(res);
    }
  },
});
