var app = app || {};

app.views.FriendsItemView = Backbone.View.extend({
  template_new: _.template($("#friends-list-template-new").html()),
  template_accepted: _.template($("#friends-list-template-accepted").html()),
  template_sent: _.template($("#friends-list-template-sent").html()),

  initialize: function () {
    // console.log("Task list View Init", this);
    this.model.on("change", this.render, this);
    this.render();
  },
  events: {
    "click #accept-friend": "acceptFriend",
    "click #reject-friend": "rejectFriend",
  },
  render: function () {
    // console.log(this.model.get("sender"));
    const data = {
      req_id: this.model.get("req_id"),
      created_at: this.model.get("created_at"),
      sender: this.model.get("sender").username,
      status: this.model.get("status"),
      updated_at: this.model.get("updated_at"),
      reciever:
        this.model.get("reciever")?.username === app.globals.username
          ? this.model.get("sender").username
          : this.model.get("reciever")?.username,
    };
    if (
      this.model.get("reciever")?.username === app.globals.username &&
      data.status === "send"
    ) {
      this.$el.html(this.template_new(data));
    } else if (data.sender === app.globals.username && data.status === "send") {
      this.$el.html(this.template_sent(data));
    } else if (data.status === "accepted") {
      this.$el.html(this.template_accepted(data));
    }
    return this;
  },
  acceptFriend() {
    this.model.acceptFriendRequest();
  },
  rejectFriend() {
    this.model.rejectFriendRequest();
  },
});
