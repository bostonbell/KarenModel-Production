//Factory for switching functions, takes the selector and the class that
//we will be toggling.
var switching_prototype = function(selector, toggleableClass)
{
    return function(){
	($(selector).toggleClass(toggleableClass));
    };
};

//Factory for additive forcer functions, takes the selector and the class
//that we will be toggling.
var force_off_prototype_additive = function(selector, toggleableClass)
{
    return function(){
	$(selector).addClass(toggleableClass);
    };
};

//Factory for subtractive forcer functions, takes the selector and the class
//that we will be toggling.
var force_off_prototype_subtractive = function(selector, toggleableClass)
{
    return function(){
	$(selector).removeClass(toggleableClass);
    };
};

var create_page_hook = function(startPoint, stopPoint, linkID, ssCont, offset)
{
	new ScrollMagic.Scene({
	    offset: $(startPoint).offset().top - offset,
	    duration: $(stopPoint).offset().top - $(startPoint).offset().top 
	})
	    .setClassToggle(linkID, 'slide-out-item-active')
	    .addTo(ssCont);
    
};


//Toggle constructs
var switch_toggle = switching_prototype(".slide-out", "slide-out-toggleOff");
var switch_layout_width = switching_prototype(".page-layout-element", "shrunken");
var switch_fast_facts_header = switching_prototype(".fast-facts-header-container", "fast-facts-header-toggled");
var switch_fast_facts_content = switching_prototype(".fast-facts-columns", "fast-facts-content-toggled");
var switch_intro_content = switching_prototype(".introduction-text-container", "introduction-text-toggled");

//Forcer Constructs
//Note that some of these are additive and some area
//subtractive: this is because I didn't realize it at
//the time, but I actually made some CSS elements ADDED
//if you clicked the toggle, and made some SUBTRACTED.
var force_toggle = force_off_prototype_additive(".slide-out", "slide-out-toggleOff");
var force_layout_width = force_off_prototype_subtractive(".page-layout-element", "shrunken");
var force_fast_facts_header = force_off_prototype_subtractive(".fast-facts-header-container", "fast-facts-header-toggled");
var force_fast_facts_content = force_off_prototype_subtractive(".fast-facts-columns", "fast-facts-content-toggled");
var force_intro_content = force_off_prototype_subtractive(".introduction-text-container", "introduction-text-toggled");


$(document).ready(function(){
    //Functions as a switch (Could be done using CSS but
    //JavaScript is easier. Switch toggle checks for
    //presence of class or non-presense.
    $(".navbar-mobile-toggler").click(function(){
	switch_toggle();
	switch_layout_width();
	switch_fast_facts_header();
	switch_fast_facts_content();
	switch_intro_content();
    });

    //Functions as a force, basically means the user
    //can really easily click out of the sidebar.
    $(".page-layout-element").click(function(){
	force_toggle();
	force_layout_width();
	force_fast_facts_header();
	force_fast_facts_content();
	force_intro_content();
    });

    //If you click a link, we want it to scroll
    //downwards instead of just going immediately to the link.
    $('.slide-down').click(function(){
	$(document).scrollTo($($.attr(this, 'href')).offset().top - 69, 200);
	//$(document).scrollTo(.top - 70, 200);
	return false;
    });

    var controller = new ScrollMagic.Controller();
    var home_hook = create_page_hook('body', '.about-divider', '#link-to-home', controller, 70);
    var about_hook = create_page_hook('.about-divider', '.gallery-divider', '#link-to-about', controller, 70);
    var gallery_hook = create_page_hook('.gallery-divider', '.contact-divider', '#link-to-gallery', controller, 70);
    var contact_hook = create_page_hook('.contact-divider', '.footer', '#link-to-contact', controller, 70);
});

