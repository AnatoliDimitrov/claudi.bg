function animation(selector, effects, ld, duration, delay, itaration) {

  $(selector).each(function(index, val) {
      var $element = val;
      var $elementEfect = effects[index];
      var $elementDuration = duration[index];
      var $elementDelay = delay[index];
      var $elementItaration = itaration[index];
      if($($element).length){
        
        if($elementDuration>0){
          addDuration($element,$elementDuration);
        }
        
        if($elementDelay>0){
          addDelay($element,$elementDelay);
        }
        
        if($elementItaration>1){
          addItaration($element,$elementItaration);
        }
        
        if(ld[index]=='ready'){
          $($element).css('animated '+$elementEfect);
          $($element).addClass('animated '+$elementEfect);
        }
        if(ld[index]=='scroll'){
          $($element).css("visibility", 'hidden');
          scrolanmete($element,$elementEfect);
        }
        if(ld[index]=='hover'){
          hoveranmete($element,$elementEfect);
        }
      }
  });
};

function scrolanmete($element, $elementEfect) {
       
  $(window).scroll(function() {
   var hT = $($element).offset().top-200,
       hH = $($element).outerHeight(),
       wH = $(window).height(),
       wS = $(this).scrollTop();
   if (wS > (hT+hH-wH)){
      $($element).css("visibility", 'visible');
      $($element).addClass('animated '+$elementEfect);     
      
    }
  });              
};

function hoveranmete($element, $elementEfect) {
var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $($element).hover(function(){
       $(this).addClass('animated '+$elementEfect).one(animationEnd, function() {$(this).removeClass('animated ' + $elementEfect);});
    });             
};

function addDuration($element, $duration) {
  $($element).css('-webkit-animation-duration',$duration+'s');
  $($element).css('animation-duration',$duration+'s');
};

function addDelay($element, $delay) {
  $($element).css('-webkit-animation-delay',$duration+'s');
  $($element).css('animation-delay',$duration+'s');
};

function addItaration($element, $itaration) {
  $($element).css('-webkit-iteration-count',$itaration);
  $($element).css('animation-iteration-count',$itaration);
};
