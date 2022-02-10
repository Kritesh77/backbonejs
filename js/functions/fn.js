app.fn.isLoggedIn = () => {
  return is_authenticated ? true : false;
};

app.fn.redirectToHome = () => {
  console.log("REDIRECTING TO HOME");
  app.router.MainRouter.navigate("tasks", { trigger: true });
  // x.render()
};

app.fn.redirect = (link) => {
  console.log("REDIRECTING TO ", link);
  app.router.MainRouter.navigate(link, { trigger: true });
};

app.fn.redirectToLogin = () => {
  console.log("REDIRECTING TO Login");
  app.router.MainRouter.navigate("login", { trigger: true });
  // x.render()
};

app.fn.getTaskList = async () => {
  console.log("Getting task list");
  const data = {
    username: app.globals.username,
    api_key: app.globals.token,
  };
  console.log("getting task list", data);

  const url = "http://127.0.0.1:8000/api/task/";

  const resData = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `ApiKey ${app.globals.username}:${app.globals.token}`,
    },
  });
  const resJson = await resData.json();
  console.log({ resJson });
  return resJson?.objects;
};

app.fn.createTaskView = (data, collection) => {
  console.log(data);
  //make a new model assign it to a view
  const newModel = new app.models.TaskModel(data);
  //add it to collections
  app.globals.TaskCollection.add(newModel);
  //assign the model to the view
};

app.fn.updateTaskStatus = async (id, status, assigned_to) => {
  console.log("updateTaskStatus", id);
  const url = `http://127.0.0.1:${API_PORT}/api/task/${id}/`;
  const resData = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `ApiKey ${app.globals.username}:${app.globals.token}`,
    },
    body: JSON.stringify({
      status,
      assigned_to,
    }),
  });
  const dataJson = await resData.json();
  console.log("update task", dataJson, id, resData.status);
  return { dataJson, status: resData.status };
};

app.fn.addNewTask = async (data) => {
  console.log("Adding new task", data.assigned_to);
  const checkUser = await app.fn.getUser(data.assigned_to);
  if (checkUser?.status === 200 && checkUser?.dataJson?.objects?.length) {
    const url = `http://127.0.0.1:${API_PORT}/api/task/`;
    const assigned_to = [
      {
        id: checkUser.dataJson?.objects,
      },
    ];
    const reqData = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `ApiKey ${app.globals.username}:${app.globals.token}`,
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        priority: data.priority,
        date_created: new Date(),
        assigned_to: [
          {
            id: checkUser.dataJson?.objects?.user?.id,
            username: data.assigned_to,
          },
        ],
      }),
    });
    const dataJson = await reqData.json();
    console.log("TASK POST REQ", dataJson, reqData.status);
    return { dataJson, status: reqData.status };
  } else {
    return { dataJson: checkFriend.dataJson, status: checkFriend.status };
  }
};

app.fn.deleteTask = async (id) => {
  console.log("Adding new task", id);
  const url = `http://127.0.0.1:${API_PORT}/api/task/${id}`;
  const reqData = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `ApiKey ${app.globals.username}:${app.globals.token}`,
    },
  });
  console.log("TASK POST REQ", reqData.status);
  return { data: reqData, status: reqData.status };
};

app.fn.getUser = async (assigned_to) => {
  console.log("Get user api call", assigned_to);
  const url = `http://127.0.0.1:${API_PORT}/api/user/?format=json&username=${assigned_to}`;
  const reqData = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `ApiKey ${app.globals.username}:${app.globals.token}`,
    },
  });
  const dataJson = await reqData.json();
  console.log("Get user api call res", dataJson);
  return { dataJson, status: reqData.status };
};

app.fn.signup = async (data) => {
  console.log("Initiating signup");
  const url = `http://127.0.0.1:${API_PORT}/api/register/`;
  const reqData = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const dataJson = await reqData.json();
  return { dataJson, status: reqData.status };
};

app.fn.login = async (data) => {
  console.log("Initiating signup");
  const url = `http://127.0.0.1:${API_PORT}/api/login/`;
  const reqData = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const dataJson = await reqData.json();
  return { dataJson, status: reqData.status };
};

app.fn.getNewTaskData = () => {
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
  return data;
};

app.fn.renderSidebar = () => {
  var x = new app.globals.SidebarView({ el: $("#sidebar-header") });
  console.log(Backbone.View.prototype.render.apply(x));
};

app.fn.addNewFriend = async (data) => {
  console.log("Adding new friend", app.globals.username, "->", data);
  const url = `http://127.0.0.1:${API_PORT}/api/friend/`;
  const reqData = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `ApiKey ${app.globals.username}:${app.globals.token}`,
    },
    body: JSON.stringify({
      receiver: data,
    }),
  });
  const dataJson = await reqData.json();
  console.log("addNewFriend POST REQ", dataJson, reqData.status);
  return { dataJson, status: reqData.status };
};

app.fn.getFriendList = async () => {
  const url = `http://127.0.0.1:${API_PORT}/api/friend/`;
  const reqData = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `ApiKey ${app.globals.username}:${app.globals.token}`,
    },
  });
  const dataJson = await reqData.json();
  console.log("getFriendList REQ", dataJson, reqData.status);
  if (reqData.status === 200) {
    return { data: dataJson?.objects, status: reqData.status };
  }
  return { data: dataJson, status: reqData.status };
};

app.fn.getUserProfile = async () => {
  const url = `http://127.0.0.1:${API_PORT}/api/profile/`;
  const reqData = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `ApiKey ${app.globals.username}:${app.globals.token}`,
    },
  });
  const dataJson = await reqData.json();
  console.log("getUserProfile REQ", dataJson, reqData.status);
  if (reqData.status === 200) {
    return { data: dataJson?.objects[0], status: reqData.status };
  }
  return { data: dataJson, status: reqData.status };
};

app.fn.addFriendSuggestions = async () => {
  const { data, status } = await app.fn.getUserProfile();
  $("#friends").empty();
  data?.friends?.forEach((friend) => {
    //add it to datalist id=friends
    $("#friends").append(`<option value="${friend.username}">`);
  });
};

app.fn.acceptFriendRequest = async (id) => {
  const url = `http://127.0.0.1:${API_PORT}/api/friend/${id}/`;
  const reqData = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `ApiKey ${app.globals.username}:${app.globals.token}`,
    },
    body: JSON.stringify({
      status: "accepted",
    }),
  });
  const dataJson = await reqData.json();
  console.log("acceptFriendRequest fn", dataJson, reqData.status);
  if (reqData.status === 200) {
    return { data: dataJson, status: reqData.status };
  }
  return { data: dataJson, status: reqData.status };
};

app.fn.rejectFriendRequest = async (id) => {
  const url = `http://127.0.0.1:${API_PORT}/api/friend/${id}/`;
  const reqData = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `ApiKey ${app.globals.username}:${app.globals.token}`,
    },
  });
  console.log("rejectFriendRequest fn", reqData, reqData.status);
  return { res: reqData, status: reqData.status };
};

app.fn.setCookie = (cname, cvalue) => {
  document.cookie = cname + "=" + cvalue + ";";
};

app.fn.getCookie = (cname, cvalue) => {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

app.fn.makeFriendItemObject = (data) => {
  return {
    req_id: data.id,
    created_at: data.created_at,
    reciever: data.receiver.user,
    sender: data.sender.user,
    status: data.status,
    updated_at: data.updated_at,
  };
};
