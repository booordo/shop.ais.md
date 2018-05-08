'use strict';
$(document).ready(function() {
    if ($('*').is('#bigslider')) {
        var bigslider = new slider('#bigslider');
        $('.slider__control_left').click(function() {
            clearTimeout(bigslider.timer);
            bigslider.slideleft();
            bigslider.startSlide();
        });
        $('.slider__control_right').click(function() {
            clearTimeout(bigslider.timer);
            bigslider.slideright();
            bigslider.startSlide();
        });
        bigslider.startSlide();
    }
    $('.accordion__link').click(accordion);
    $('.carousel__item').click(carousel);
    $('.tabs__label').click(tabs);
    $('.deals__link_expand').click(deals);
    $('.navbar__bars').click(navbar);
    $('#catSort').change(sorting);
});

function accordion(e) {
    e.preventDefault();
    $(this).toggleClass('accordion__link_active');
    $(this).siblings('.accordion__text').slideToggle('fast');
}

function carousel() {
    var img = $(this).children('img')[0];
    var imgSrc = $(img).attr('src');
    $('.carousel__img_view').attr('src', imgSrc);
    $('.carousel__item').removeClass('carousel__item_active');
    $(this).addClass('carousel__item_active');
}

function tabs() {
    var index = $(this).index();
    var item = $('.tabs__item')[index];
    $('.tabs__label').removeClass('tabs__label_active');
    $(this).addClass('tabs__label_active');
    $('.tabs__item').removeClass('tabs__item_active');
    $(item).addClass('tabs__item_active');
}

function deals(e) {
    var dealsInner = $(this).parents('.deals__row').children('.deals_detail')[0];
    e.preventDefault();
    if (dealsInner != undefined) {
        $(dealsInner).slideToggle('fast');
    }
}

function navbar(e) {
    var navList = $(this).siblings('.navbar__list')[0];
    e.preventDefault();
    $(navList).toggleClass('navbar__list_active');
}

function slider(id) {
    this.id = id;
    this.wrapper = $(this.id);
    this.children = $(this.wrapper).children();
    this.length = this.children.length - 1;
    this.width = parseFloat($(this.wrapper).css('width'));
    this.minLeft = -this.width * this.length;
    this.maxLeft = 0;
    this.left = parseFloat($(this.wrapper).css('left'));
    this.animationDone = true;
    this.timer = undefined;
    this.startSlide = function() {
        self = this;
        this.timer = setTimeout(function() {
            self.slideright();
            self.startSlide();
        }, 5000);
    }
    this.slideleft = function() {
        if (!this.animationDone) return;
        this.animationDone = false;
        var nextleft = this.left + this.width;
        if (nextleft <= this.maxLeft) {
            $(this.wrapper).css('left', nextleft + 'px');
            this.left = nextleft;
        } else {
            $(this.wrapper).css('left', this.minLeft + 'px');
            this.left = this.minLeft;
        }
        this.doneAnimation();
    }
    this.slideright = function() {
        if (!this.animationDone) return;
        this.animationDone = false;
        var nextleft = this.left - this.width;
        if (nextleft >= this.minLeft) {
            $(this.wrapper).css('left', nextleft + 'px');
            this.left = nextleft;
        } else {
            $(this.wrapper).css('left', this.maxLeft + 'px');
            this.left = this.maxLeft;
        }
        this.doneAnimation();
    }
    this.doneAnimation = function() {
        self = this;
        setTimeout(function() {
            self.animationDone = true;
        }, 100)
    }
}

function sorting () {
    var value = $('#catSort')[0].value;
    if (!value) return;
    var sort = value.split('_')[0];
    var method = value.split('_')[1];
    var href = window.location.href;
    href = href.replace(/\&?sort=\w+\&method=\w+/gi, "");
    href = href.replace(/\?\&/, "?");
    href = href + (href.indexOf("?") >= 0 ? "&" : "?") + "sort=" + sort + "&method=" + method;
    window.location.href = href;
}