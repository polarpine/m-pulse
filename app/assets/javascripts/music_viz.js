var visualization
visualization = function(){
  var height = $('.top-image').height()
  setInterval(function(){
    if($('.top-image').css('height') == height + 'px') {
      $('.top-image').height((height * 10) + 'px');
    } else {
      $('.top-image').height(height + 'px');
    };
  }, 400);
};

$(document).ready(visualization);