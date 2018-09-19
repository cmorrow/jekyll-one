/***************************************************************************
  This code is from Dynamic Web Coding at www.dyn-web.com
  Copyright 2004 by Sharon Paine 
  See Terms of Use at www.dyn-web.com/bus/terms.html
  regarding conditions under which you may use this code.
  This notice must be retained in the code as is!
****************************************************************************/
dw_scrollObj.prototype.bSizeDragBar=!0,dw_scrollObj.prototype.setUpScrollbar=function(t,s,i,e,r){if(document.getElementById){var o=document.getElementById(t),n=document.getElementById(s);dw_slidebar.init(o,n,i,e,r),o.wn=dw_scrollObjs[this.id],"v"==i?this.vBarId=t:this.hBarId=t,this.bSizeDragBar&&this.setBarSize(),o.on_drag_start=o.on_slide_start=dw_scrollObj.getWndoLyrRef,o.on_drag_end=o.on_slide_end=dw_scrollObj.tossWndoLyrRef,o.on_drag=o.on_slide=dw_scrollObj.UpdateWndoLyrPos}},dw_scrollObj.getWndoLyrRef=function(){this.wnLyr=document.getElementById(this.wn.lyrId)},dw_scrollObj.tossWndoLyrRef=function(){this.wnLyr=null},dw_scrollObj.UpdateWndoLyrPos=function(t,s){var i,e;"v"==this.axis?(i=this.wn.x,e=-(s-this.minY)*(this.wn.maxY/(this.maxY-this.minY))||0):(e=this.wn.y,i=-(t-this.minX)*(this.wn.maxX/(this.maxX-this.minX))||0),this.wn.shiftTo(this.wnLyr,i,e)},dw_scrollObj.prototype.updateScrollbar=function(t,s){var i,e;if(this.vBarId){if(!this.maxY)return;e=-(s*((this.vbar.maxY-this.vbar.minY)/this.maxY)-this.vbar.minY),e=Math.min(Math.max(e,this.vbar.minY),this.vbar.maxY),i=parseInt(this.vbar.style.left),this.vbar.style.left=i+"px",this.vbar.style.top=e+"px"}if(this.hBarId){if(!this.maxX)return;i=-(t*((this.hbar.maxX-this.hbar.minX)/this.maxX)-this.hbar.minX),i=Math.min(Math.max(i,this.hbar.minX),this.hbar.maxX),e=parseInt(this.hbar.style.top),this.hbar.style.left=i+"px",this.hbar.style.top=e+"px"}},dw_scrollObj.prototype.restoreScrollbars=function(){var t;this.vBarId&&(t=document.getElementById(this.vBarId),t.style.left=t.minX+"px",t.style.top=t.minY+"px"),this.hBarId&&(t=document.getElementById(this.hBarId),t.style.left=t.minX+"px",t.style.top=t.minY+"px")},dw_scrollObj.prototype.setBarSize=function(){var t,s=document.getElementById(this.lyrId),i=document.getElementById(this.id);this.vBarId&&(t=document.getElementById(this.vBarId),t.style.height=s.offsetHeight>i.offsetHeight?t.trkHt/(s.offsetHeight/i.offsetHeight)+"px":t.trkHt-2*t.minY+"px",t.maxY=t.trkHt-t.offsetHeight-t.minY),this.hBarId&&(t=document.getElementById(this.hBarId),t.style.width=this.wd>i.offsetWidth?t.trkWd/(this.wd/i.offsetWidth)+"px":t.trkWd-2*t.minX+"px",t.maxX=t.trkWd-t.offsetWidth-t.minX)},dw_scrollObj.prototype.on_load=function(){this.restoreScrollbars(),this.bSizeDragBar&&this.setBarSize()},dw_scrollObj.prototype.on_scroll=dw_scrollObj.prototype.on_slide=function(t,s){this.updateScrollbar(t,s)},dw_scrollObj.prototype.on_scroll_start=dw_scrollObj.prototype.on_slide_start=function(){this.vBarId&&(this.vbar=document.getElementById(this.vBarId)),this.hBarId&&(this.hbar=document.getElementById(this.hBarId))},dw_scrollObj.prototype.on_scroll_end=dw_scrollObj.prototype.on_slide_end=function(t,s){this.updateScrollbar(t,s),this.lyr=null,this.bar=null};