/*
 * Accordion 1.5 - jQuery menu widget
 *
 * Copyright (c) 2007 JÃ¶rn Zaefferer, Frank Marcia
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-accordion/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.accordion.js 4137 2007-12-13 12:37:58Z joern.zaefferer $
 *
 */
!function(e){e.ui=e.ui||{},e.ui.accordion={},e.extend(e.ui.accordion,{defaults:{selectedClass:"selected",alwaysOpen:!0,animated:"slide",event:"click",header:"a",autoheight:!0},animations:{slide:function(t,i){if(t=e.extend({easing:"swing",duration:300},t,i),!t.toHide.size())return t.toShow.animate({height:"show"},t),void 0;var n=t.toHide.height(),a=t.toShow.height(),o=a/n;t.toShow.css({height:0,overflow:"hidden"}).show(),t.toHide.filter(":hidden").each(t.complete).end().filter(":visible").animate({height:"hide"},{step:function(e){t.toShow.height((n-e)*o)},duration:t.duration,easing:t.easing,complete:t.complete})},bounceslide:function(e){this.slide(e,{easing:e.down?"bounceout":"swing",duration:e.down?1e3:200})},easeslide:function(e){this.slide(e,{easing:"easeinout",duration:700})}}}),e.fn.extend({accordion:function(t){function i(t){return void 0!=t?"number"==typeof t?d.filter(":eq("+t+")"):d.not(d.not(t)):t===!1?e("<div>"):d.filter(":eq(0)")}function n(i,n,a,o,r){var d=function(e){l=e?0:--l,l||(t.clearStyle&&i.add(n).css({height:"",overflow:""}),s.trigger("change",a))};l=0==n.size()?i.size():n.size(),t.animated?!t.alwaysOpen&&o?(i.slideToggle(t.animated),d(!0)):e.ui.accordion.animations[t.animated]({toShow:i,toHide:n,complete:d,down:r}):(!t.alwaysOpen&&o?i.toggle():(n.hide(),i.show()),d(!0))}function a(i){if(!i.target&&!t.alwaysOpen){h.parent().andSelf().toggleClass(t.selectedClass);var a=h.next(),o=h=e([]);return n(o,a),!1}var r=e(i.target);if(r.parents(t.header).length)for(;!r.is(t.header);)r=r.parent();var s=r[0]==h[0];if(l||t.alwaysOpen&&s||!r.is(t.header))return!1;h.parent().andSelf().toggleClass(t.selectedClass),s||r.parent().andSelf().addClass(t.selectedClass);var o=r.next(),a=h.next(),c=[r,h,o,a],u=d.index(h[0])>d.index(r[0]);return h=s?e([]):r,n(o,a,c,s,u),!1}function o(e,t){1!=arguments.length&&a({target:i(t)[0]})}if(!this.length)return this;if(t=e.extend({},e.ui.accordion.defaults,t),t.navigation){var r=this.find("a").filter(function(){return this.href==location.href});r.length&&(r.filter(t.header).length?t.active=r:(t.active=r.parent().parent().prev(),r.addClass("current")))}var s=this,d=s.find(t.header),h=i(t.active),l=0;if(t.fillSpace){var c=this.parent().height();d.each(function(){c-=e(this).outerHeight()});var u=0;d.next().each(function(){u=Math.max(u,e(this).innerHeight()-e(this).height())}).height(c-u)}else if(t.autoheight){var c=0;d.next().each(function(){c=Math.max(c,e(this).outerHeight())}).height(c)}return d.not(h||"").next().hide(),h.parent().andSelf().addClass(t.selectedClass),s.bind(t.event||"",a).bind("activate",o)},activate:function(e){return this.trigger("activate",[e])},unaccordion:function(){return this.find("*").andSelf().unbind().end().end()}})}(jQuery);