/*************************************************************************
  This code is from Dynamic Web Coding at www.dyn-web.com
  Copyright 2001-4 by Sharon Paine 
  See Terms of Use at www.dyn-web.com/bus/terms.html
  regarding conditions under which you may use this code.
  This notice must be retained in the code as is!
*************************************************************************/
dw_scrollObj.stopScroll=function(s){dw_scrollObjs[s]&&dw_scrollObjs[s].endScroll()},dw_scrollObj.doubleSpeed=function(s){dw_scrollObjs[s]&&(dw_scrollObjs[s].speed*=2)},dw_scrollObj.resetSpeed=function(s){dw_scrollObjs[s]&&(dw_scrollObjs[s].speed/=2)},dw_scrollObj.initScroll=function(s,t,l){if(dw_scrollObjs[s]){var i,r;if("string"==typeof t)switch(t){case"up":t=90;break;case"down":t=270;break;case"left":t=180;break;case"right":t=0;break;default:alert("Direction of scroll in mouseover scroll links should be 'up', 'down', 'left', 'right' or number: 0 to 360.")}if(t%=360,t%90==0)i=0==t?-1:180==t?1:0,r=90==t?1:270==t?-1:0;else{var e=t*Math.PI/180;i=-Math.cos(e),r=Math.sin(e)}dw_scrollObjs[s].fx=i/(Math.abs(i)+Math.abs(r)),dw_scrollObjs[s].fy=r/(Math.abs(i)+Math.abs(r)),dw_scrollObjs[s].endX=90==t||270==t?dw_scrollObjs[s].x:90>t||t>270?-dw_scrollObjs[s].maxX:0,dw_scrollObjs[s].endY=0==t||180==t?dw_scrollObjs[s].y:180>t?0:-dw_scrollObjs[s].maxY,dw_scrollObjs[s].startScroll(l)}},dw_scrollObj.prototype.startScroll=function(s){this.ready&&(this.timerId&&clearInterval(this.timerId),this.speed=s||dw_scrollObj.speed,this.lyr=document.getElementById(this.lyrId),this.lastTime=(new Date).getTime(),this.on_scroll_start(),this.timerId=setInterval(this.animString+".scroll()",10))},dw_scrollObj.prototype.scroll=function(){var s=(new Date).getTime(),t=(s-this.lastTime)/1e3*this.speed;if(t>0){var l=this.x+this.fx*t,i=this.y+this.fy*t;0==this.fx||0==this.fy?-1==this.fx&&l>-this.maxX||1==this.fx&&0>l||-1==this.fy&&i>-this.maxY||1==this.fy&&0>i?(this.lastTime=s,this.shiftTo(this.lyr,l,i),this.on_scroll(l,i)):(clearInterval(this.timerId),this.timerId=0,this.shiftTo(this.lyr,this.endX,this.endY),this.on_scroll_end(this.endX,this.endY)):this.fx<0&&l>=-this.maxX&&this.fy<0&&i>=-this.maxY||this.fx>0&&0>=l&&this.fy>0&&0>=i||this.fx<0&&l>=-this.maxX&&this.fy>0&&0>=i||this.fx>0&&0>=l&&this.fy<0&&i>=-this.maxY?(this.lastTime=s,this.shiftTo(this.lyr,l,i),this.on_scroll(l,i)):(clearInterval(this.timerId),this.timerId=0,this.on_scroll_end(this.x,this.y))}},dw_scrollObj.prototype.endScroll=function(){this.ready&&(this.timerId&&clearInterval(this.timerId),this.timerId=0,this.lyr=null)},dw_scrollObj.prototype.on_scroll=function(){},dw_scrollObj.prototype.on_scroll_start=function(){},dw_scrollObj.prototype.on_scroll_end=function(){};