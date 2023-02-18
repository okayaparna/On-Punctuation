$(document).ready(function(){
    $(window).on('scroll',function(){
    var a = $(window).scrollTop();
    //alert(a);
    if( a > 50) {
      $("p").css("textDecoration", "underline");
      }
      else {
         $("p").css("textDecoration", "none");
      }
  
    });
  });