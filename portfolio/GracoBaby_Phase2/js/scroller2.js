/*  Control.Scroller, version 1.1
 *  Copyright (c) 2008, Glenn Nilsson <glenn.nilsson@gmail.com>
 *
 *  Control.Scroller is distributed under the terms of an Creative Commons
 *  Attribution license. In short words, you can use this however you like
 *  as long as you give me and the code credit. Read more at:
 *  <http://creativecommons.org/licenses/by/2.5/>
 *
 *  Requirements: Prototype framework <http://prototype.conio.net/> and
 *  slider.js from <http://wiki.script.aculo.us/scriptaculous/show/Slider>
 *
 *  For details, see: <http://wailqill.com/projects/scroller/>
 *
/*--------------------------------------------------------------------------*/
Control.Scroller=Class.create(),Control.Scroller.scrollers=[],Control.Scroller.prototype={initialize:function(t,i,e,s){this.id="scroller",this.content=$(t),this.handle=$(i),this.track=$(e),this.currentValue=0,this.options=Object.extend({axis:"vertical",onChange:function(t){o.updateView(t)},onSlide:function(t){o.updateView(t)}},s);var o=this;return this.options=Object.extend({scrollOnHover:!1,visibleHeight:this.isVertical()?300:this.content.offsetHeight,visibleWidth:this.isVertical()?this.content.offsetWidth:300,delta:20,autoHide:!0,interval:100},this.options),this.maxValue=this.isVertical()?this.content.offsetHeight-this.options.visibleHeight-this.handle.offsetHeight:this.content.offsetWidth-this.options.visibleWidth-this.handle.offsetWidth,this.options.range=$R(0,this.maxValue),this.buttons={up:$(this.options.up),down:$(this.options.down)},this.isVertical()&&this.content.offsetHeight<=this.options.visibleHeight||!this.isVertical()&&this.content.offsetWidth<=this.options.visibleWidth?(this.options.autoHide&&[this.track,this.handle,this.buttons.up,this.buttons.down].invoke("hide"),void 0):(this.content.style.height=this.options.visibleHeight+"px",this.eventMouseAction=this.buttonAction.bindAsEventListener(this),$H(this.buttons).values().each(function(t){o.options.scrollOnHover?(Event.observe(t,"mouseover",o.eventMouseAction),Event.observe(t,"mouseout",o.eventMouseAction)):(Event.observe(t,"mousedown",o.eventMouseAction),Event.observe(t,"mouseup",o.eventMouseAction))}),this.slider=new Control.Slider(this.handle,this.track,this.options),void 0)},isVertical:function(){return"vertical"==this.options.axis},buttonAction:function(t){switch(this.multiplier=Event.element(t)==this.buttons.up?-1:1,t.type){case"mouseover":case"mousedown":this.scroll();var i=this;this.timer=setInterval(function(){i.scroll()},i.options.interval);break;case"mouseout":case"mouseup":clearTimeout(this.timer)}},scroll:function(){this.slider.setValue(this.currentValue+this.options.delta*this.multiplier,0)},updateView:function(t){this.currentValue=t,"vertical"==this.options.axis?(this.content.style.marginTop=-this.currentValue+"px",this.content.style.height=this.options.visibleHeight+this.currentValue+"px",this.content.style.clip="rect("+t+"px "+this.options.visibleWidth+"px "+(this.options.visibleHeight+this.currentValue)+"px 0px)"):(this.content.style.marginLeft=-this.currentValue+"px",this.content.style.clip="rect(0 "+(this.options.visibleHeight+this.currentValue)+"px "+this.options.visibleHeight+"px "+t+"px)"),(this.options.onScroll||Prototype.emptyFunction)(t,this)}};