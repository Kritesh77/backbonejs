app.fn.getUser = ()=>{
  console.log(app.router.MainRouter)

  return{
    username: app.models.LoginViewModel.get("username"),
    token: app.models.LoginViewModel.get("token"),
    is_authenticated: app.models.LoginViewModel.get("is_authenticated"),
  }
}

app.fn.isLoggedIn=()=>{
  return is_authenticated?true:false
}

app.fn.redirectToHome=()=>{
  console.log("REDIRECTING TO HOME")
  app.router.MainRouter.navigate("tasks",{trigger:true})
  x.render()
}

