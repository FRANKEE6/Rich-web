$(document).ready(function () {
    (function ($) {   

        // Animácie ___________________________________________________________________
        // Animácie navigácie 
        (function(){
            var mainElementy = $("#mainNav li"),
                altElementy = $("#altNav li");

            $.each(mainElementy, (function(index) {
                $(this).hide().delay( 400 + index * 50).show(1200).css({"animationName": "flyBaby"});
            }));

            $.each(altElementy, (function(index) {
                $(this).hide().delay( 300 + index * 50).show(1000).css({"animationName": "flyBaby"});
            }));

            var delay = 6000;
            setTimeout(() => {
                $(mainElementy).css({"animationName": "none"});
                $(altElementy).css({"animationName": "none"});
            }, delay);
        })(window);
        
        // Animácia recenzií 
        (function(){
            var delay = 10000;    
            setInterval(() => {
                var reviews = $(".reviews"),
                    flexer = reviews.find(".flexing"),
                    futureman = flexer.next();
                flexer.appendTo(reviews).fadeOut(1000, function(){
                    flexer.removeClass("flexing");
                    futureman.addClass("flexing").hide().fadeIn(1000);
                });
            }, delay);
        })(window);

        // Tooltip mesagge __________________________________________________________________

        var ttipholder = $('#tooltip'),
            collection = $(".gallery a img");
        
        collection.mouseenter(function(){
            if(! ttipholder.length){
                ttipholder = $('<div id="tooltip"><p> </p></div>').appendTo('body');
            }
            $(ttipholder).show();
            $(this).mouseleave(function(){
                $(ttipholder).hide();
            })
        });
        
        $(collection).mouseenter(function(){
            $("body").on("mousemove", function(event){
                var relX = event.pageX - $(this).offset().left + 20,
                    relY = event.pageY - $(this).offset().top + 25;
                    
                    ttipholder.css({"left": relX , "top": relY});
            });
                
            var alttext = $(this).attr("alt"),
                ttip = $("#tooltip p");

            if (alttext !== ttip.text()){
                $(ttip).text(alttext);
            }
            else return;
        });

        // Lightboxy __________________________________________________________________
        // Simple
        var singleimg = $(".simp").has("img"),
            lay = $('<div id="simpoverlay"/>'),
            butout = $('<button id="butout"><i class="fa-solid fa-xmark"></i></button>');
            
            lay.appendTo("body").hide();
            
            
            $(singleimg).on("click", function(event){
                var href = $(this).attr("href"),
                    alttext = $(this).find("img").attr("alt"),
                    image = $("<img>", {src: href, alt: alttext}),
                    holder = $('<div id="holder"/>');

                event.preventDefault();
            
                image.appendTo(holder);
                butout.appendTo(holder);
                lay.html(holder).fadeIn(1000);
            });

        butout.on("click", function (){
            $(lay).fadeOut(1000);
        })

        $(document).on("keyup", function(event){
            if (event.which == 27) lay.fadeOut(1000);
        });

        // Gallery
        var galimg = $(".gallery a").has("img");
            
        $(galimg).on("click", function(event){
            var href = $(this).attr("href"),
                alttext = $(this).find("img").attr("alt"),
                image = $("<img>", {src: href, alt: alttext}),
                textarea = $("<p/>").text(alttext),
                previousone = $('<div class="previous"/>'),
                nextone = $('<div class="next"/>'),
                holder = $('<div id="holder"/>');

            event.preventDefault();

            $('<i class="fa-solid fa-chevron-left"></i>').appendTo(previousone);
            $('<i class="fa-solid fa-chevron-right"></i>').appendTo(nextone);
            image.appendTo(holder);
            butout.appendTo(holder);
            lay.html(holder).fadeIn(1000);
            previousone.prependTo(lay);
            nextone.appendTo(lay);
            textarea.appendTo(lay);

            var actimg = $("#holder img"),
                clickedimg = $(this);

            if ($(clickedimg).prev().length == 0) $(".fa-chevron-left").fadeOut(0);
            if ($(clickedimg).next().length == 0) $(".fa-chevron-right").fadeOut(0);


            $(".previous").click(function(){
                if($(clickedimg).prev().length == 0) $(".fa-chevron-left").fadeOut(0);
                else $(".fa-chevron-right").fadeIn(500);
                if($(".fa-chevron-left").is(":hidden")) return;

                var predosle = $(clickedimg).prev("a"),
                    newalt = $(predosle).find("img").attr("alt");

                $(actimg).attr("src", $(predosle).attr("href"));
                $("#simpoverlay p").text(newalt);
                clickedimg = predosle;

                if ($(clickedimg).prev().length == 0) $(".fa-chevron-left").fadeOut(0);
                else $(".fa-chevron-right").fadeIn(500);
            });

            $(".next").click(function(){
                if ($(clickedimg).next().length == 0) $(".fa-chevron-right").fadeOut(0);
                else $(".fa-chevron-left").fadeIn(500);
                if($(".fa-chevron-right").is(":hidden")) return;

                var nasledovne = $(clickedimg).next("a"),
                    newalt = $(nasledovne).find("img").attr("alt");

                $(actimg).attr("src", $(nasledovne).attr("href"));
                $("#simpoverlay p").text(newalt);
                clickedimg = nasledovne;

                if ($(clickedimg).next().length == 0) $(".fa-chevron-right").fadeOut(0);
                else $(".fa-chevron-left").fadeIn(500);        
            });
        });

        // Navigation selection __________________________________________________________________

        var navanchor = $("nav a"),
            pageURL = location.pathname;

        $(navanchor).parent().removeClass("selected")

        $(function(){
            $(navanchor).each(function(){
                if(pageURL.includes($(this).attr("href").slice(3))){
                    $(this).parent().addClass("selected");
                }
            });
        });

        // Alergens tittle __________________________________________________________________

        var alergenlist = $("ol li"),
            alergenalert = $("dd span");

        $(".alergens").hide();

        alergenalert.on("mouseenter", function(){
            if($(this).attr("title")) return;
            $(this).attr("title", " ");

            var that = $(this);

            $(alergenlist).each(function(index){;
                if($(that).text().search(index + 1) !== -1){
                    $(that).attr("title", $(that).attr("title") + "\n" + $(alergenlist[index]).text().trim());
                }
            });
        });

        // Offer scroll functions __________________________________________

        // Scroll UP

        var scrlup = $(".scrlup");

        $(document).on("scroll", function(){
            if($(this).scrollTop() > 400){
                $(scrlup).fadeIn();
            }
            else $(scrlup).fadeOut();
        });

        $(scrlup).on("click", function(){
            var body = $("html, body")
            $(body).animate({scrollTop: 0}, 500);
        });

        // Offer scrolls

        var buttons = $(".offer button"),
            sections = $(".offer h2");

        $(buttons).on("click", function(){
            var index = $(buttons).index(this),
                scrlposition = $(sections[index]).offset().top,
                stickyheight = $(".offer nav").height();
            
            $("html, body").animate({scrollTop: (scrlposition - stickyheight - 10)}, 500);
        });

    })(jQuery);
});