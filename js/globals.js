const API_PORT = 8000;
var app = app || {};
app.views = app.views || {};
app.globals = app.globals || {};
app.router = app.router || {};
app.models = app.models || {};
app.fn = app.fn || {};
app.collections = app.collections || {};

app.globals.headers = {
  "Content-Type": "application/json",
  Authorization: `ApiKey ${app.globals.username}:${app.globals.token}`,
};

// app.globals.is_authenticated = false;
