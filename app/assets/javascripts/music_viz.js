var visualization
visualization = function(){
  setInterval(function(){
    if($('.top-image').css('height') == '50px') {
      $('.top-image').height('200px');
    } else {
      $('.top-image').height('50px');
    };
  }, 400);
};

$(document).ready(visualization);
$(document).on('page:load', visualization);