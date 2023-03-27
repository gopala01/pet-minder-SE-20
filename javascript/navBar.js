$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-fixed-top");
        var $toggler = $(".navbar-nav")
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        $toggler.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
      });
});