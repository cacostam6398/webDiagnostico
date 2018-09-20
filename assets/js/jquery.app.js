! function(t) {
    "use strict";
    var e = function() {
        this.$body = t("body"), this.$window = t(window)
    };
    e.prototype.initMenu = function() {
        var e = this;
        t(".button-menu-mobile").on("click", function(i) {
            i.preventDefault(), e.$body.toggleClass("enlarged"), t(".slimscroll-menu").slimscroll({
                height: "auto",
                position: "right",
                size: "8px",
                color: "#9ea5ab",
                wheelStep: 5
            })
        }), t(".navbar-toggle").on("click", function(e) {
            t(this).toggleClass("open"), t("#navigation").slideToggle(400)
        }), t(".navigation-menu>li").slice(-2).addClass("last-elements"), t('.navigation-menu li.has-submenu a[href="#"]').on("click", function(e) {
            t(window).width() < 992 && (e.preventDefault(), t(this).parent("li").toggleClass("open").find(".submenu:first").toggleClass("open"))
        }), t(".slimscroll-menu").slimscroll({
            height: "auto",
            position: "right",
            size: "8px",
            color: "#9ea5ab",
            wheelStep: 5
        }), t(".right-bar-toggle").on("click", function(e) {
            t("body").toggleClass("right-bar-enabled")
        }), t(document).on("click", "body", function(e) {
            t(e.target).closest(".right-bar-toggle, .right-bar").length > 0 || t("body").removeClass("right-bar-enabled")
        }), t(".navigation-menu a").each(function() {
            var e = window.location.href.split(/[?#]/)[0];
            this.href == e && (t(this).addClass("active"), t(this).parent().addClass("active"), t(this).parent().parent().addClass("in"), t(this).parent().parent().prev().addClass("active"), t(this).parent().parent().parent().addClass("active"), t(this).parent().parent().parent().parent().addClass("in"), t(this).parent().parent().parent().parent().parent().addClass("active"))
        })
    }, e.prototype.initLayout = function() {
        this.$window.width() < 1025 ? this.$body.addClass("enlarged") : 1 != this.$body.data("keep-enlarged") && this.$body.removeClass("enlarged")
    }, e.prototype.init = function() {
        this.initLayout(), this.initMenu()
    }, t.App = new e, t.App.Constructor = e
}(window.jQuery),
function(t) {
    "use strict";
    window.jQuery.App.init()
   

    setTimeout(function(){
        jQuery(".navbar-toggle").on("click", function(e) {  
        
            jQuery(".navbar-toggle").toggleClass("open"), 
            jQuery("#navigation").slideToggle(400)           
        })

    },800)
   


}();

