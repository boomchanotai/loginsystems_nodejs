$(document).ready(function(){
    // for animation while login and register
    $("#signup").click(function(){
        $("#login").fadeOut();
        $("#register").fadeIn();
        $("#register").css("display","grid");
        if($(window).width() < 640){
            $(".reg-sm").fadeIn();
            $(".reg-sm").css("display","inline");
        }
    });
    $("#signin").click(function(){
        $("#register").fadeOut();
        $("#login").fadeIn();
    });
    $("#signin-sm").click(function(){
        $(".reg-sm").css("display","none");
        $("#login").fadeIn();
    });

    // for ajax sent data

    // this is login
    $("#log-submit").click(function(){
        var loguser = $("#log-username").val();
        var logpass = $("#log-password").val();
        $.ajax({
            data: {
                "username" : loguser,
                "password" : logpass,
                "type" : "login"
            },
            url: "sys/user.php",
            type: "POST",
            success: function(data){
              if(data == "success"){
                $("#successful").fadeIn()
                setTimeout(function(){
                    window.location.href="home.html";
                }, 1000);  
              } else {
                $("#failed").fadeIn()
                    setTimeout(function(){
                        $("#log-username").css("border-bottom", "2px solid red")
                        $("#log-password").css("border-bottom", "2px solid red")
                        $("#failed").fadeOut()
                    }, 1000);
              }
            }
        })
    });
    // this is register 1
    $("#reg-submit").click(function(){
        var reguser = $("#reg-username").val();
        var regfullname = $("#reg-fullname").val();
        var regemail = $("#reg-email").val();
        var regpass = $("#reg-password").val();

        $.ajax({
            data: {
                "type" : "register",
                "username" : reguser,
                "fullname" : regfullname,
                "email" : regemail,
                "password" : regpass
            },
            url: "sys/user.php",
            type: "POST",
            success: function(data){
                if(data == "success"){
                    $("#successful").fadeIn()
                    setTimeout(function(){
                        window.location.href="home.html";
                    }, 1000);  
                } else {
                    $("#failed").fadeIn()
                    setTimeout(function(){
                        $("#reg-username").css("border-bottom", "2px solid red")
                        $("#reg-password").css("border-bottom", "2px solid red")
                        $("#reg-email").css("border-bottom", "2px solid red")
                        $("#reg-fullname").css("border-bottom", "2px solid red")
                        $("#failed").fadeOut()
                    }, 1000);
                }
            }
        })
    });
    // for smaller screen register
    $("#reg-submit-sm").click(function(){
        var reguser = $("#reg-username-sm").val();
        var regfullname = $("#reg-fullname-sm").val();
        var regemail = $("#reg-email-sm").val();
        var regpass = $("#reg-password-sm").val();

        $.ajax({
            data: {
                "type" : "register",
                "username" : reguser,
                "fullname" : regfullname,
                "email" : regemail,
                "password" : regpass
            },
            url: "sys/user.php",
            type: "POST",
            success: function(data){
                if(data == "success"){
                    $("#successful").fadeIn()
                    setTimeout(function(){
                        window.location.href="home.html";
                    }, 1000);  
                } else {
                    $("#failed").fadeIn()
                    setTimeout(function(){
                        $("#failed").fadeOut()
                    }, 1000);
                }
            }
        })
    });


});
