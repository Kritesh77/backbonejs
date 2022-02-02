var app = app || {}
$(document).ready(function () {
  app.globals.username="";
  app.globals.is_authenticated = false;
  app.globals.token = ""
    const data = {
      username: "arya",
      password: "Anas@123",
    };
   //render sidebar here
   
   app.globals.SidebarView = Backbone.View.extend({
     attributes:{
       username: app.globals.username||"Krtiehs"
     },
     template:_.template($("#username-template").html()),
     events: {
      "click #login-redirect": "goToLoginPage",
    },
    goToLoginPage:function(){
      console.log("redirect to login page");
      app.router.MainRouter.navigate("/login", { trigger: true });
    },
     initialize:function(){
       console.log("sidebar view init",this);
       this.render()
     },
     render:function(){
        this.$el.html(this.template({username:app.globals.username||"Krtiehs"}))
        return self
     }
   })
   var x = new app.globals.SidebarView({
     el:$("#sidebar-header")
    }) 
   console.log("XEL",x.el, app.globals.username)
  });

