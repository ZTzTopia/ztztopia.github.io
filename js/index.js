function getAndroidVersion(ua) 
{
    ua = (ua || navigator.userAgent).toLowerCase(); 
    var match = ua.match(/android\s([0-9\.]*)/);
    return match ? match[1] : false;
}

function supportsWoff() 
{
	return (document.all && !document.addEventListener) || (!!window['operamini']) || (getAndroidVersion() != false && parseFloat(getAndroidVersion()) < 4.4);
}

function supportsWoff2() 
{
	if (!window.FontFace) 
		return false;
    var f = new FontFace('t', 'url("data:application/font-woff2,") format("woff2")', {});
    f.load();
    return f.status === 'loading';
}

(function($) {
	"use strict";

	$(function() {
		/* Animate On Scroll */
		AOS.init({
			once: true
		});
		$(window).bind('load', AOS.refresh);
		
    	var includes = $('[data-include]');
    	jQuery.each(includes, function() {
        	var file = $(this).data('include') + '.html';
        	alert(file)
            $(this).load(file);
    	});
		
		var navbarIsHide = true;
		var navbar = $('.navbar-scroll');
		if($(window).scrollTop() >= 20) navbar.addClass('navbar-light bg-light').removeClass('navbar-dark bg-transparent');
		else navbar.addClass('navbar-dark').removeClass('navbar-light bg-light');
		$(window).scroll(function() {
			if(navbarIsHide) {
				if($(window).scrollTop() >= 20) {
					navbar.addClass('navbar-light bg-light').removeClass('navbar-dark bg-transparent');
					$('.start-navbar').removeClass('start-style').addClass('scroll-on');
				} else {
					navbar.addClass('navbar-dark').removeClass('navbar-light bg-light');
					$('.start-navbar').removeClass('scroll-on').addClass('start-style');
				}
			}
		});
		
		navbar.find('.collapse').on('show.bs.collapse', function() {
			navbar.addClass('navbar-light bg-light').removeClass('navbar-dark bg-transparent');
			navbarIsHide = false;
	    });
	
		navbar.find('.collapse').on('hide.bs.collapse', function() {
	        if($(window).scrollTop() >= 20) navbar.addClass('navbar-light bg-light').removeClass('navbar-dark bg-transparent');
			else navbar.addClass('navbar-dark').removeClass('navbar-light bg-light');
			navbarIsHide = true;
	    });
		/* Bused panjang bet dah kode navbarnya */

		$('body').on('mouseenter mouseleave', '.nav-item', function(e) {
	        if($(window).width() > 767) {
	            var n = $(e.target).closest('.nav-item');
	            n.addClass('show');
				$(location).attr('href', n.find('.nav-link').attr('href'));
	            setTimeout(function() {
	                n[n.is(':hover') ? 'addClass' : 'removeClass']('show')
	            }, 1)
	        }
	    })
    
    	var topBtn = $(".back-to-top-btn");
		$(window).scroll(function() {
            if ($(window).scrollTop() >= 20) topBtn.css('display', 'block');
            else topBtn.css('display', 'none');
        })
	
		$('.back-to-top-btn').click((e) => {
			$(window).scrollTop(0);
			e.preventDefault();
		})
		
		var aas = $('#alert-above-section');
		//if(!(supportsWoff) || !(supportsWoff2)) aas.html('<div class="alert alert-warning alert-dismissible mt-2" role="alert"><strong><i class="fa fa-sad-tear" aria-hidden="true"></i></strong> Uh nooo... It looks like your browser is not supported woff fonts. The woff fonts will not be loaded.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
    });
})(jQuery);

(function() { 
	var v = document.getElementsByClassName("youtube-player"); 
	for (var n = 0; n < v.length; n++) { 
		v[n].onclick = function () { 
			var iframe = document.createElement("iframe"); 
			iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.id + "?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1&rel="+ this.dataset.related +"&controls="+this.dataset.control+"&showinfo=" + this.dataset.info); 
			iframe.setAttribute("frameborder", "0"); 
			iframe.setAttribute("id", "youtube-iframe"); 
			iframe.setAttribute("style", "width: 100%; height: 100%; position: absolute; top: 0; left: 0;"); 
			if (this.dataset.fullscreen == 1) iframe.setAttribute("allowfullscreen", ""); 
			while (this.firstChild) { 
				this.removeChild(this.firstChild); 
			} 
			this.appendChild(iframe); 
		}; 
	} 
})();

window.onload = function()
{
	var imgDefer = document.getElementsByTagName('img');
	for(var i = 0; i < imgDefer.length; i++) 
	{
		if(imgDefer[i].getAttribute('data-src')) 
		{
			imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
		}
	}
}