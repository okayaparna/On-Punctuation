
$(document).ready(function(){
    $(window).on('scroll',function(){
      var a = $(window).scrollTop();
      console.log("The value of a is:", a); 
      if( a > 50) {
        $(".textone").css("textDecoration", "underline");
      }
      else {
        $(".textone").css("textDecoration", "none");
      }
    });
  });
  
  