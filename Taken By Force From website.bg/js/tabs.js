$(document).ready(function() {
  $(document).on('click', ".navTabs li a.tabs", function (e) {
    //$('.navTabs li a').on('click', function(e)  {
        var currentAttrValue = $(this).attr('rel');
        // Show/Hide Tabs
        $('.tabcontent').hide();
        $('#'+currentAttrValue).show();
       
        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');
        e.preventDefault();
    });
    
    $('.navgtab li a').on('click', function(e)  {
        var currentAttrValue = $(this).attr('rel');
        // Show/Hide Tabs
        $('.tabgcontent').hide();
        $('#'+currentAttrValue).show();
        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
    });
   
 $("#customFields").on('click','.remCF',function(){
        $(this).parent().parent().remove();
    });
  
});