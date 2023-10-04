(function(){
    $(document).ready(function() {
        console.log('hello world');
        var homeSection = $('.home-section'),
            navbar      = $('.navbar-custom'),
            navHeight   = navbar.height();

        navbarAnimation(navbar, homeSection, navHeight);

        $(window).scroll(function() {
            navbarAnimation(navbar, homeSection, navHeight);
        });

        function navbarAnimation(navbar, homeSection, navHeight) {
            console.log('hello');
            var topScroll = $(window).scrollTop();
            if (navbar.length > 0 && homeSection.length > 0) {
                if(topScroll >= navHeight) {
                    navbar.removeClass('navbar-transparent');
                } else {
                    navbar.addClass('navbar-transparent');
                }
            }
        }
        });
}) (jQuery);