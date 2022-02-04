app.fn.getUser = () => {
  console.log(app.router.MainRouter);

  return {
    username: app.models.LoginViewModel.get("username"),
    token: app.models.LoginViewModel.get("token"),
    is_authenticated: app.models.LoginViewModel.get("is_authenticated"),
  };
};

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
  console.log("getting task list");
  const data = {
    username: app.globals.username,
    api_key: app.globals.token,
  };
  const url =
    "http://127.0.0.1:8000/api/task?username=" +
    app.globals.username +
    "&api_key=" +
    app.globals.token;
  const resData = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((x) => x.json());

  return resData?.objects;
};

app.fn.createTaskView = (data, collection) => {
  console.log(data);
  //make a new model assign it to a view
  const newModel = new app.models.TaskModel(data);
  //add it to collections
  app.globals.TaskCollection.add(newModel);
  //assign the model to the view
};

app.fn.updateTaskStatus = async (id, status) => {
  const url = `http://127.0.0.1:${API_PORT}/api/task/`;
  const resData = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `ApiKey ${app.globals.username}:${app.globals.token}`,
    },
  })
    .then((x) => x.json())
    .catch((err) => console.log(err));
  console.log(resData);
  return resData;
};

app.fn.addNewTask = async (data) => {
  console.log("Adding new task");
  const url = `http://127.0.0.1:${API_PORT}/api/task/`;
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
      assigned_to: [
        {
          id: 12,
          username: "arya",
        },
      ],
    }),
  });
  if (reqData.status === 200) {
    const dataJson = await reqData.json();
    return dataJson;
  } else {
    return false;
  }
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

app.fn.setSignupError = (error) => {};
