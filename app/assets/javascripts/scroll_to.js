var scrollClick;
scrollClick = function() {
  $('a[href^="#"]').on('click', function(event) {
      var target = $( $(this).attr('href') );
      if( target.length ) {
          event.preventDefault();
          $('html, body').animate({
              scrollTop: target.offset().top
          }, 1000);
      }
  });
};

$(document).ready(scrollClick);
$(document).on('page:load', scrollClick);