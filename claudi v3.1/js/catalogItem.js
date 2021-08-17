    $(function() {             
        var originalPrice = parseFloat((($('.itemPriceBlock span span').text() || '0').match(/[0-9,.]+/) || [0])[0].replace(/,/g, ''));
         var org = parseFloat((($('.orgprc').text() || '0').match(/[0-9,.]+/) || [0])[0].replace(/,/g, ''));
         
            discount = Math.max(1-parseFloat((($('.itemPriceBlock .discountedPr').text() || '0%').match(/[0-9,.]+/) || [0])[0].replace(/,/g, '.'))/100, 0);
       
       //
       if($('.dr2').length){
       var price = originalPrice;
        $('.dr2').each(function() {
            
            v = $(this).val();
            if(v!='o'){
               //скрипта на Лъчо при идеа си работи но в честър такси не затова го промених 
               // price += parseFloat((($(':selected', this).text() || $(this).parent().find('span').text() || '0.00').match(/\s\(([^+-]*[+-]?[0-9\.,]+)[^\)]*\)$/)||[0,0])[1].toString().replace(/,/g, '')) * (this.checked===false ? -1 : 1);
               //новия 
                var thisvalue = ($(':selected', this).val()|| '0.00');
                    price += parseFloat(thisvalue);
             }      
            });
               
            $('.itemPriceBlock .itemOriginalPrice span span, .itemPriceBlock > span:not([class]) span').each(function() {
                this.innerHTML = price.toFixed(2).replace(/(\d{3})?\./, '$1.');
            });
            $('.itemPriceBlock .itemOffPrice span span').each(function() {
                this.innerHTML = (price * discount).toFixed(2).replace(/(\d{3})?\./, '$1.');  
            });
            $('body').trigger('price');
       }
        
       //
       
        $('.catalogItemCharacteristics .field').find('select:not(.dr1, dr2), input').change(function() {
        
        if(this.type==='checkbox'){
            var originalPriceS = parseFloat((($('.itemPriceBlock span span').text() || '0').match(/[0-9,.]+/) || [0])[0].replace(/,/g, ''));
            var price = originalPriceS;
        }else{
          var price = originalPrice;
        }   
            
            $('.catalogItemCharacteristics .field').find('select').each(function() {
               //скрипта на Лъчо при идеа си работи но в честър такси не затова го промених 
                //price += parseFloat((($(':selected', this).text() || $(this).parent().find('span').text() || '0.00').match(/\s\(([^+-]*[+-]?[0-9\.,]+)[^\)]*\)$/)||[0,0])[1].toString().replace(/,/g, '')) * (this.checked===false ? -1 : 1);
                  
               //новия 
                var thisvalue = ($(':selected', this).text()|| $(this).parent().find('span').text() || '0.00');
                var m = thisvalue.split('(+'); 
                  
                if('1' in m){        
                    var m = thisvalue.split('(+'); 
                    price += parseFloat(((m[1]).match(/\.?\d[\d.,]*/)||[0,0])[0].toString().replace(/,/g, '')) * (this.checked===false ? -1 : 1);
                }
               });
            
            //25-10-2017 добавяне на радио бутони
            $('.catalogItemCharacteristics .field').find('input').each(function() {
                if($(this).attr("checked")){
                  var thisvalue = ($(this).attr('price'));
                      price += parseFloat(((thisvalue).match(/\.?\d[\d.,]*/)||[0,0])[0].toString().replace(/,/g, '')) * (this.checked===false ? -1 : 1);
                } 
            });
               
            $('.itemPriceBlock .itemOriginalPrice span span, .itemPriceBlock > span:not([class]) span').each(function() {
                this.innerHTML = price.toFixed(2).replace(/(\d{3})?\./, '$1.');
            });
            
            $('.itemPriceBlock .itemOffPrice span span').each(function() {
                this.innerHTML = (price * discount).toFixed(2).replace(/(\d{3})?\./, '$1.');  
            });
            $('body').trigger('price');
        });
        
            $('.catalogItemCharacteristics .field').find('select, input').each(function() {
               //скрипта на Лъчо при идеа си работи но в честър такси не затова го промених 
               // price += parseFloat((($(':selected', this).text() || $(this).parent().find('span').text() || '0.00').match(/\s\(([^+-]*[+-]?[0-9\.,]+)[^\)]*\)$/)||[0,0])[1].toString().replace(/,/g, '')) * (this.checked===false ? -1 : 1);
         
               //новия 
                var thisvalue = ($(':selected', this).text()|| $(this).parent().find('span').text() || '0.00');
                var m = thisvalue.split('(+'); 
               
                if('1' in m){
                    var m = thisvalue.split('(+'); 
                    price += parseFloat(((m[1]).match(/\.?\d[\d.,]*/)||[0,0])[0].toString().replace(/,/g, '')) * (this.checked===false ? -1 : 1);
                }           
                
                   
               });
          
        
           $('.dr2, .dr1').change(function(){
           
            var price = originalPrice;
           
            $('.dr2').each(function() {
            
            v = $(this).val();
            if(v!='o'){
              
               //скрипта на Лъчо при идеа си работи но в честър такси не затова го промених 
               // price += parseFloat((($(':selected', this).text() || $(this).parent().find('span').text() || '0.00').match(/\s\(([^+-]*[+-]?[0-9\.,]+)[^\)]*\)$/)||[0,0])[1].toString().replace(/,/g, '')) * (this.checked===false ? -1 : 1);
                  
               //новия 
                var thisvalue = ($(':selected', this).val()|| '0.00');
              
                var m = thisvalue.split('-'); 
                 console.log(m[1]);
           //     if('1' in m){
           //         var m = thisvalue.split('(+'); 
                    price += parseFloat(m[0]);
           //     }           
                
             }      
            });
               
            $('.itemPriceBlock .itemOriginalPrice span span, .itemPriceBlock > span:not([class]) span').each(function() {
                
                this.innerHTML = price.toFixed(2).replace(/(\d{3})?\./, '$1.');
            });
            
            $('.itemPriceBlock .itemOffPrice span span').each(function() {
              
                this.innerHTML = (price * discount).toFixed(2).replace(/(\d{3})?\./, '$1.');  
            });
             
            
            $('body').trigger('price');
        });
        
        
    });
    
    