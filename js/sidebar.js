(function($) {
  "use strict"; // Start of use strict

  // Closes the sidebar menu
  $("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
  });

  // Opens the sidebar menu
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
  });


  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $("#sidebar-wrapper").removeClass("active");
  });

})(jQuery); // End of use strict



// Remove Phone number from navbar when collased
var chart = $('#chart');

$(window).on('resize', function(){
      var win = $(this); //this = window
      if (win.width() < 768) {
        $('#chart').remove();
        $(".toggle").css("margin-top", "50px")
        $(".alts").css("max-height", "calc(100vh - 67px - 80px - 80px)")
        $("#menu-icon").attr("class", "fa fa-btc");
      }
      if (win.width() > 768) {
        $('#canvas').append(chart);
        $(".toggle").css("margin-top", "5px")
        $(".alts").css("max-height", "calc(100vh - 67px - 80px - 36px)")
        $("#menu-icon").attr("class", "fa fa-bars");
      }
});

$(window).on('load', function(){
      var win = $(this); //this = window
      if (win.width() < 768) {
        $('#chart').remove();
        $(".toggle").css("margin-top", "50px")
        $(".alts").css("max-height", "calc(100vh - 67px - 80px - 80px)")
        $("#menu-icon").attr("class", "fa fa-btc");
      }
});