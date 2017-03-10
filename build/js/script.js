"use strict";

$(document).ready(function () {

	$('.accordion__link').click(accordion);
	$('.pagination__view').click(toggleView);
	$('.carousel__item').click(carousel);
	$('.tabs__label').click(tabs);
	$('.deals__link_expand').click(deals);
	$('.navbar__bars').click(navbar);
	$('.slider__control').click(slide);

});

function accordion (e) {
	e.preventDefault();
	$(this).toggleClass('accordion__link_active');
	$(this).siblings('.accordion__text').slideToggle('fast');
}

function toggleView (e) {
	var self = $(this);

 	e.preventDefault();

	if ( !self.hasClass("pagination__view_active") ) {
		$(".pagination__view").removeClass('pagination__view_active');
		if ( self.hasClass("pagination__view_box") ) {
			$(".pagination__view_box").addClass("pagination__view_active");
			$(".grid_list_size_1.grid_list_m_size_1.grid_list_s_size_1")
			.removeClass("grid_list_size_1 grid_list_m_size_1 grid_list_s_size_1")
			.addClass("grid_list_size_4 grid_list_m_size_2 grid_list_s_size_1 content__row")
			.children(".product")
			.removeClass("product_list")
			.addClass("product_content");
		} else {
			$(".pagination__view_list").addClass("pagination__view_active");
			$(".grid_list_size_4.grid_list_m_size_2.grid_list_s_size_1")
			.removeClass("grid_list_size_4 grid_list_m_size_2 grid_list_s_size_1 content__row")
			.addClass("grid_list_size_1 grid_list_m_size_1 grid_list_s_size_1")
			.children(".product")
			.removeClass("product_content")
			.addClass("product_list");
		}
		
	}
}

function carousel () {
	var img = $(this).children("img")[0];
	var imgSrc = $(img).attr("src");
	$(".carousel__img_view").attr( "src", imgSrc );
	$(".carousel__item").removeClass("carousel__item_active");
	$(this).addClass("carousel__item_active");
}

function tabs () {
	var index = $(this).index();
	var item = $(".tabs__item")[index];

	$(".tabs__label").removeClass("tabs__label_active");
	$(this).addClass("tabs__label_active");
	$(".tabs__item").removeClass("tabs__item_active");
	$(item).addClass("tabs__item_active");
}

function deals (e) {
	e.preventDefault();
	var dealsInner = $(this).parents(".deals__row").children(".deals_detail")[0];
	if ( dealsInner != undefined) {
		$(dealsInner).slideToggle("fast");
	}
}

function navbar (e) {
	e.preventDefault();
	var navList = $(this).siblings(".navbar__list")[0];
	$(navList).toggleClass("navbar__list_active");
}

function slide (e) {
	e.preventDefault();
	if ( $(this).hasClass('slider__control_left') ) {
		slideleft(this);
	} else {
		slideright(this);
	}
}

function slideleft (object) {
	var wrapper = $(object).siblings(".slider__item-wrapper");
	if ( wrapper != undefined ) {
		var left = parseFloat($(wrapper).css("left"));
		var width = parseFloat($(wrapper).css("width"));
		$(wrapper).css("left", left + width + "px");
	}
}

function slideright (object) {
	var wrapper = $(object).siblings(".slider__item-wrapper");
	if ( wrapper != undefined ) {
		var left = parseFloat($(wrapper).css("left"));
		var width = parseFloat($(wrapper).css("width"));
		$(wrapper).css("left", left - width + "px");
	}
}