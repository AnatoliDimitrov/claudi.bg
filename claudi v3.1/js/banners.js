$(document).ready(function() {
  //var mq = window.matchMedia( "(max-width: 640px)" );
  if (window.innerWidth<=640) {
    var h = $('.banners').height();
    var w =  $(window).width();
    var nH = w/2; 
    $('.banners').height(nH);
  }
});

(function() {
    window.controls = window.controls || {};


    window.controls.Banners = {
        init: function($elements, searchURL) {
            $($elements).each(function() {
                var $this = $(this),
                    rotationType = ((($this.attr('class') || '').match(/\brotation\b|\bfade\b|\bimage\b/) || [])[0] || '').toLocaleLowerCase(),
                    currentImage = 0,
                    imagesContainer = $('.images ul', $this),
                    images = $('li', imagesContainer),
                    arrows = $('.leftArrow, .rightArrow', '.blcd'),
                    pages = $('.bannerPages li', $this),
                    rotationSpeed = ~~$this.attr('delay')*1000,
                    showImage, intervalHandle, intervalCounter = 0;
                if ($this.data('banners')) {
                    return;
                }
                 

                showImage = function(itemNumber) {
                    itemNumber = isNaN(itemNumber) ? currentImage+1 : itemNumber;
                    
                    itemNumber = itemNumber >= images.length ? 0 : itemNumber < 0 ? images.length : itemNumber;
                       
                    switch (rotationType) {
                        case 'rotation':
                            imagesContainer.css('left', (-itemNumber*100)+'%');
                            break;
                        case 'fade':
                            $(images.get(currentImage)).css({opacity:0,zIndex:''});
                            $(images.get(itemNumber)).css({opacity:1,zIndex:1});
                            break;
                        case 'image':
                            itemNumber = images.length==itemNumber?itemNumber-1:itemNumber;
                            currentImage = images.length==currentImage?currentImage-1:currentImage;
                            $(images.get(currentImage)).hide();
                            $(images.get(itemNumber)).show();
                            break;
                    }
                    pages.filter('.activeImage').removeClass('activeImage');
                    $(pages.get(itemNumber)).addClass('activeImage');
                    currentImage = itemNumber;
                }
                

                pages.click(function() {
                
                    showImage(pages.index(this));
                    return false;
                });

                arrows.click(function() {
                    showImage(currentImage + ($(this).hasClass('leftArrow') ? -1 : 1));
                    p = ($(this).hasClass('rightArrow') ? -1 : 1);
                    thumb = ($(this).attr('rel') ? true :false);
                    if(thumb){
                      if(currentImage>=4){
                       s = ((currentImage-3)*(-68));
                        $('ul.thumb').css('transform','translate3d(0px, '+s+'px, 0px)')
                      }else{
                        $('ul.thumb').css('transform','translate3d(0px, 0px, 0px)')
                      }
                    }
                    return false;
                });

                switch (rotationType) {
                    case 'rotation':
                        break;
                    case 'fade':
                        images.filter('*:not(:first)').css('opacity', 0);
                        images.filter('*:first').css('z-index', 1);
                        break;
                    
                }
                pages.filter(':first').addClass('activeImage');

                if (!isNaN(rotationSpeed)) {
                
                    $this.mouseenter(function() {
                        window.clearInterval(intervalHandle);
                    }).mouseleave(function() {
                        intervalHandle = window.setInterval(function() {
                            intervalCounter++;
                            if (intervalCounter==100) {
                                intervalCounter = 0;
                                showImage();
                            }
                        }, rotationSpeed/100);
                    }).mouseleave();
                }

                $this.data('banners', showImage);
                $this.addClass('ready');
            });
        }
    }

})();

