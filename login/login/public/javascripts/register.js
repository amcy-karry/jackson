
var fn =  function(){
    // 获取元素
    var $inputUsername = $("#name");
    var $inputRealname = $("#elsename");
    
    var $inputPhone = $("#tel");
    var $inputSex = $("#sex");
    var $inputEmail = $("#email");
    var $password = $("#pass");
    var $repeatPassword = $("#confirm");
   
    var $btn = $("#register");
    var username = false;
    var realname = false;
   
    var phoneState = false;
    var emailState = false ;
    var passwordState = false;
    var repPassword = false;
   
    // 失去焦点校验email是否合法
    $inputEmail.blur(function(){
      // 校验email
      checkEmail()
    })
    // email聚焦的时候取消校验
    $inputEmail.focus(function(){
      emailState = false;
      removeWarn($(this))
    })
  
    //用户名聚焦是取消校验
    $inputUsername.focus(function(){
      username = false;
      removeWarn($(this))
    })
  
    // 真实姓名聚焦的时候取消校验
    $inputRealname.focus(function(){
      realname = false;
      removeWarn($(this))
    })
    
  
    // 手机号码聚焦的时候取消校验
    $inputPhone.focus(function(){
      phoneState = false;
      removeWarn($(this))
    })
    // 密码框聚焦的时候取消校验
     $password.focus(function(){
      passwordState = false;
      removeWarn($(this))
    })
    // 进行提交的时候
    $btn.click(function(){
      if(!emailState) {
        alert("请输入正确的Email地址")
        return;
      }
      if(!realname){
        alert("请按要求输入正确的真实姓名")
      }
      if(!phoneState){
        alert("请输入正确的手机号码")
      }
      if(!passwordState) {
        alert("请输入密码或者正确格式的密码")
        return;
      }
      if(!repPassword) {
        alert("重复密码和密码不一致")
        return;
      }
      
      $.ajax({
        "type": "POST",
        "url": "/register",
        "data":{
          email: $inputEmail.val(),
          username1:$inputUsername.val(),
          realname1: $inputRealname.val(),
          phone:$inputPhone.val(),
          sex:$inputSex.val(),
          password: $password.val(),
        },
        "success": function(data){
          alert("注册成功请登录！")
          window.location = "/login"
        }
      })
    })
    
    //输入用户名的时候进行重复校验
    $inputUsername.blur(function(){
      checkUsername()
    })
  
  
  
    // 真实姓名输入的时候进行中文校验
    $inputRealname.blur(function(){
      checkRealname()
    })
    // 输入手机号码时进行号码正确的校验
    $inputPhone.blur(function(){
      checkPhone()
    })
    // 密码框进行输入的时候校验长度
    $password.bind("input",function(){
      checkPasswordLength()
    })
    // 重复密码的校验
    $repeatPassword.blur(function(){
      // 重复密码的判读逻辑一共两个，第一个是判断密码是否输入了
      if(!$password.val()){
        alert("请先输入密码")
        $repeatPassword.val("")
        return;
      }
      // 第二个就是判断密码和原密码是否一致
      if($repeatPassword.val() !== $password.val()) {
        warnFun($repeatPassword,"两次密码不一致")
        return;
      }
      repPassword = true;
    })
    // 密码框聚焦的时候取消校验
    $repeatPassword.focus(function(){
      repPassword = false;
      removeWarn($(this))
    })
  
  
      // 校验用户名
      function checkUsername(){
        
        // 通过正则表达式进行校验
        checkUsernameAjax() 
      }
    
      function checkUsernameAjax(){
        var name = $inputUsername.val();
       
      }
  
    //校验中文姓名
    function checkRealname(){
      //得到真实姓名
      var rn = $inputRealname.val()
      //通过正则表达式进行校验
      if(!/^[\u4e00-\u9fa5]+$/.test(rn)){
        warnFun($inputRealname,"请输入中文姓名")
        return;
      }
      realname = true;
    }
    // 校验mobilephone
    function checkPhone(){
      var phone = $inputPhone.val()
      if(!/^1[34578]\d{9}$/.test(phone)){
        warnFun($inputPhone,"请输入正确的手机号码")
        return;
      }
      phoneState = true;
    }
  
  
    // 校验email
    function checkEmail(){
      // 得到email的值
      var email = $inputEmail.val()
      // 通过正则表达式进行校验
      if(!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,5}$/.test(email)) {
        // 如果校验没有通过,给予提示
        warnFun($inputEmail,"请输入正确的Email")
        return;
      }
      emailState = true;
     // checkEmailAjax();
    }
  
    // function checkEmailAjax(){
    //   var email = $inputEmail.val()
    //   $.ajax({
    //     "type": "CHECKOUT",
    //     "url": "/ck_email_regist",
    //     "data":{
    //       email: email
    //     },
    //     "success": function(data){
    //       if(data.result.length > 0){
    //         warnFun($inputEmail,"该Email已经被注册，请输入新的Email地址")
    //       } else {
    //         emailState = true;
    //       }
    //     }
    //   })
    // }
  
    // 添加校验方法
    function warnFun(dom,value) {
      dom.parent().addClass("has-error");
      dom.siblings("div.control-label").remove();
      dom.after("<div class='control-label'>"+value+"</div>")
    }
  
    // 取消校验方法
    function removeWarn(dom){
      dom.parent().removeClass("has-error")
      dom.siblings("div.control-label").remove();
    }
    // 密码框校验
    $password.blur(function(){
      
      // 密码框失去焦点的时候先判断合法性，如果合法性通过了，再判断密码的等级
      if(checkPassword()) {
        // 校验等级
        if(checkPasswordLength() < 2) {
          
          warnFun($password,"密码等级不够")
          $(".strongBox").remove();
          return;
        }
      } else {
        warnFun($password,"请输入正确的密码")
        return;
      }
      passwordState = true;
    })
    // 校验密码
    function checkPassword() {
      var password = $password.val();
      var flag = true;
      // 是判断最后的校验结果
      // 先校验长度，设置区域为8-20位
      if(password.length < 8 || password.length > 20) {
        // 如果校验没有通过抛出提示
        warnFun($password,"密码长度区间为8-20位")
        flag = false;
      } 
  
      // 判断密码的合法性，只允许输入数字，字母和部分符号
      if(/[^0-9a-zA-Z\`\!\@\#\$\%\^\&\*\(\)\_\+\{\}\,\.\/\"\:\;]/g.test(password)){
        warnFun($password,"密码仅限于入数字、字母和符号 !@#$%^&*()_+{},./:;")
        flag = false;
      } 
      return flag;
    }2
  };
  fn();
  
  
  
  







