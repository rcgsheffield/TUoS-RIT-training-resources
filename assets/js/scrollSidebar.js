$(document).ready(function() {
    var fixmeTop = $('.main-content-search').offset().top;       // get initial position of the element
    var topOfFooter = $('.site-footer').position().top;
    var topOfFooterOffset = topOfFooter - 500;
  $(window).scroll(function() {                  // assign scroll event listener

      var currentScroll = $(window).scrollTop(); // get current position

      var currentScroll = $(document).scrollTop() ;
      var scrollDistanceFromTopOfFooter = currentScroll - topOfFooter;
      console.log("cScroll:",currentScroll);
      console.log("fOffset:",topOfFooterOffset);

      if (currentScroll >= ($('.site-footer').position().top -468 )) { 
        console.log("TRIGGERED");
        $('.main-content-search').css({                      // if you scroll above it
              position: 'relative',
              width: '14.5%',
              top: $('.site-footer').position().top - 695
          });
        } else if (currentScroll >= fixmeTop) {           // apply position: fixed if you
          $('.main-content-search').css({                      // scroll to that element or below it
              position: 'fixed',
              top: 10,
              left: 'inherit',
              width: '12.5%',
              'max-width': '185px'
             //  This gives the top sticky plus a margin of 10px from it.
          });
      } else {                                   // apply position: static
          $('.main-content-search').css({                      // if you scroll above it
              position: 'static',
              width: '14.5%'
          });
      }

  });
}); 