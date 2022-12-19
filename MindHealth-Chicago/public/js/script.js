$(function () {
	// Anchor Target Scroll Animation

	$('a[href*="#"]:not([href="#"])').click(function () {
		if (
			location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
			location.hostname == this.hostname
		) {
			var target = $(this.hash);
			target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
			if (target.length) {
				$("html, body").animate(
					{
						scrollTop: target.offset().top - 62
					},
					600
				);
				return false;
			}
		}
	});

	// Header Shadow

	$(window).scroll(function () {
		var windowScroll = $(this).scrollTop();

		if (windowScroll > 304) {
			$(".navbar-fixed-top").addClass("shadow");
		} else {
			$(".navbar-fixed-top").removeClass("shadow");
		}
	});
});
var mySwiper = new Swiper(".swiper-container", {
	direction: "vertical",
	loop: true,
	pagination: ".swiper-pagination",
	grabCursor: true,
	speed: 1000,
	paginationClickable: true,
	parallax: true,
	autoplay: false,
	effect: "slide",
	mousewheelControl: 1
});
// PreLoader
jQuery.noConflict();
(function ($) {
	$(window).on("load", function () {
		// makes sure the whole site is loaded
		$("#status").fadeOut(); // will first fade out the loading animation
		$("#preloader").delay(100).fadeOut("slow"); // will fade out the white DIV that covers the website.
	});
})(jQuery);
// update footer copyright year

var today = new Date();
var year = today.getFullYear();

var copyright = document.getElementById("copyright");
copyright.innerHTML = "© MindHealth " + year;
