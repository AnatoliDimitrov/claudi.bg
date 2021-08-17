$(document).ready(function(){
 if($('.plisting').length>0){
   $('.plisting').remove();
 }
});

function catalogMenu($selector){

  $('li.itemMenu > span.addPlus').click(function(){
    $text = $(this).text();
    if($text=='+'){
     $(this).text('-');
   }else{
    $(this).text('+');
   }
        
    $level = $(this).attr('level');
    $l = parseInt(parseInt($level)+1);
    
    if($level>0){
     $('.level1').not($(this).parents()).hide();
 }else{
      $('.level1').not($(this).next()).hide();
      $('span.addPlus').not($(this)).text('+');
    }
    
    $(this).next('ul.level'+$l).slideToggle();
 
  });
  //custom
  $('li.itemMenu > a.addPlus').live('click',function(){
    
    $text = $(this).next('span.addPlus').text();
    if($text=='+'){
     $(this).next('span.addPlus').text('-');
   }else{
    $(this).next('span.addPlus').text('+');
   }
        
    $level = $(this).attr('level');
    $l = parseInt(parseInt($level)+1);
    //$('.level1').not($(this).parent()).hide();
    $(this).parent().find($('ul.level1')).slideToggle();
 
  });
}
function fixedMenu(selectorMenu){
          if(selectorMenu!=''){
          var menupos = $(selectorMenu).offset().top;
           $(window).scroll(function() {
            var offset = $(selectorMenu).offset().top - $(window).scrollTop();
            if(offset<=0){
              $(selectorMenu).addClass("menu-fixed");
           }
          if($(selectorMenu).length){
          if(menupos>=$(window).scrollTop()){
              $(selectorMenu).removeClass("menu-fixed");
            }
          }
          });
          }
          
}