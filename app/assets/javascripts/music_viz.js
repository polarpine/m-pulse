var visualization
visualization = function(){
  setInterval(function(){
    if($('.top-image').css('height') == '20px') {
      $('.top-image').height('200px');
    } else {
      $('.top-image').height('20px');
    };
  }, 400);
};

$(document).ready(visualization);