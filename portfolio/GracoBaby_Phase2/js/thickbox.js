/*
 * Thickbox 3.1 - One Box To Rule Them All.
 * By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2007 cody lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/
function tb_init(e){jQuery(e).click(function(){var e=this.title||this.name||null,t=this.href||this.alt,n=this.rel||!1;return tb_show(e,t,n),this.blur(),!1})}function tb_show(e,t,n){try{"undefined"==typeof document.body.style.maxHeight?(jQuery("body","html").css({height:"100%",width:"100%"}),jQuery("html").css("overflow","hidden"),null===document.getElementById("TB_HideSelect")&&(jQuery("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>"),jQuery("#TB_overlay").click(tb_remove))):null===document.getElementById("TB_overlay")&&(jQuery("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>"),jQuery("#TB_overlay").click(tb_remove)),tb_detectMacXFF()?jQuery("#TB_overlay").addClass("TB_overlayMacFFBGHack"):jQuery("#TB_overlay").addClass("TB_overlayBG"),null===e&&(e=""),jQuery("body").append("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>"),jQuery("#TB_load").show();var i;i=-1!==t.indexOf("?")?t.substr(0,t.indexOf("?")):t;var o=/\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/,r=i.toLowerCase().match(o);if(".jpg"==r||".jpeg"==r||".png"==r||".gif"==r||".bmp"==r){if(TB_PrevCaption="",TB_PrevURL="",TB_PrevHTML="",TB_NextCaption="",TB_NextURL="",TB_NextHTML="",TB_imageCount="",TB_FoundURL=!1,n)for(TB_TempArray=jQuery("a[@rel="+n+"]").get(),TB_Counter=0;TB_Counter<TB_TempArray.length&&""===TB_NextHTML;TB_Counter++){{TB_TempArray[TB_Counter].href.toLowerCase().match(o)}TB_TempArray[TB_Counter].href!=t?TB_FoundURL?(TB_NextCaption=TB_TempArray[TB_Counter].title,TB_NextURL=TB_TempArray[TB_Counter].href,TB_NextHTML="<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>"):(TB_PrevCaption=TB_TempArray[TB_Counter].title,TB_PrevURL=TB_TempArray[TB_Counter].href,TB_PrevHTML="<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>"):(TB_FoundURL=!0,TB_imageCount="Image "+(TB_Counter+1)+" of "+TB_TempArray.length)}imgPreloader=new Image,imgPreloader.onload=function(){function i(){return jQuery(document).unbind("click",i)&&jQuery(document).unbind("click",i),jQuery("#TB_window").remove(),jQuery("body").append("<div id='TB_window'></div>"),tb_show(TB_PrevCaption,TB_PrevURL,n),!1}function o(){return jQuery("#TB_window").remove(),jQuery("body").append("<div id='TB_window'></div>"),tb_show(TB_NextCaption,TB_NextURL,n),!1}imgPreloader.onload=null;var r=tb_getPageSize(),d=r[0]-150,a=r[1]-150,T=imgPreloader.width,_=imgPreloader.height;T>d?(_*=d/T,T=d,_>a&&(T*=a/_,_=a)):_>a&&(T*=a/_,_=a,T>d&&(_*=d/T,T=d)),TB_WIDTH=T+30,TB_HEIGHT=_+60,jQuery("#TB_window").append("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+t+"' width='"+T+"' height='"+_+"' alt='"+e+"'/></a><div id='TB_caption'>"+e+"<div id='TB_secondLine'>"+TB_imageCount+TB_PrevHTML+TB_NextHTML+"</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div>"),jQuery("#TB_closeWindowButton").click(tb_remove),""!==TB_PrevHTML&&jQuery("#TB_prev").click(i),""!==TB_NextHTML&&jQuery("#TB_next").click(o),document.onkeydown=function(e){keycode=null==e?event.keyCode:e.which,27==keycode?tb_remove():190==keycode?""!=TB_NextHTML&&(document.onkeydown="",o()):188==keycode&&""!=TB_PrevHTML&&(document.onkeydown="",i())},tb_position(),jQuery("#TB_load").remove(),jQuery("#TB_ImageOff").click(tb_remove),jQuery("#TB_window").css({display:"block"})},imgPreloader.src=t}else{var d=t.replace(/^[^\?]+\??/,""),a=tb_parseQuery(d);TB_WIDTH=1*a.width+30||630,TB_HEIGHT=1*a.height+40||440,ajaxContentW=TB_WIDTH-30,ajaxContentH=TB_HEIGHT-45,-1!=t.indexOf("TB_iframe")?(urlNoQuery=t.split("TB_"),jQuery("#TB_iframeContent").remove(),"true"!=a.modal?jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+e+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(1e3*Math.random())+"' onload='tb_showIframe()' style='width:"+(ajaxContentW+29)+"px;height:"+(ajaxContentH+17)+"px;' > </iframe>"):(jQuery("#TB_overlay").unbind(),jQuery("#TB_window").append("<iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(1e3*Math.random())+"' onload='tb_showIframe()' style='width:"+(ajaxContentW+29)+"px;height:"+(ajaxContentH+17)+"px;'> </iframe>"))):"block"!=jQuery("#TB_window").css("display")?"true"!=a.modal?jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+e+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a> or Esc Key</div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>"):(jQuery("#TB_overlay").unbind(),jQuery("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>")):(jQuery("#TB_ajaxContent")[0].style.width=ajaxContentW+"px",jQuery("#TB_ajaxContent")[0].style.height=ajaxContentH+"px",jQuery("#TB_ajaxContent")[0].scrollTop=0,jQuery("#TB_ajaxWindowTitle").html(e)),jQuery("#TB_closeWindowButton").click(tb_remove),-1!=t.indexOf("TB_inline")?(jQuery("#TB_ajaxContent").append(jQuery("#"+a.inlineId).children()),jQuery("#TB_window").unload(function(){jQuery("#"+a.inlineId).append(jQuery("#TB_ajaxContent").children())}),tb_position(),jQuery("#TB_load").remove(),jQuery("#TB_window").css({display:"block"})):-1!=t.indexOf("TB_iframe")?(tb_position(),jQuery.browser.safari&&(jQuery("#TB_load").remove(),jQuery("#TB_window").css({display:"block"}))):jQuery("#TB_ajaxContent").load(t+="&random="+(new Date).getTime(),function(){tb_position(),jQuery("#TB_load").remove(),tb_init("#TB_ajaxContent a.thickbox"),jQuery("#TB_window").css({display:"block"})})}a.modal||(document.onkeyup=function(e){keycode=null==e?event.keyCode:e.which,27==keycode&&tb_remove()})}catch(T){}}function tb_showIframe(){jQuery("#TB_load").remove(),jQuery("#TB_window").css({display:"block"})}function tb_remove(){return jQuery("#TB_imageOff").unbind("click"),jQuery("#TB_closeWindowButton").unbind("click"),jQuery("#TB_window").fadeOut("fast",function(){jQuery("#TB_window,#TB_overlay,#TB_HideSelect").trigger("unload").unbind().remove()}),jQuery("#TB_load").remove(),"undefined"==typeof document.body.style.maxHeight&&(jQuery("body","html").css({height:"auto",width:"auto"}),jQuery("html").css("overflow","")),document.onkeydown="",document.onkeyup="",!1}function tb_position(){jQuery("#TB_window").css({marginLeft:"-"+parseInt(TB_WIDTH/2,10)+"px",width:TB_WIDTH+"px"}),jQuery.browser.msie&&jQuery.browser.version<7||jQuery("#TB_window").css({marginTop:"-"+parseInt(TB_HEIGHT/2,10)+"px"})}function tb_parseQuery(e){var t={};if(!e)return t;for(var n=e.split(/[;&]/),i=0;i<n.length;i++){var o=n[i].split("=");if(o&&2==o.length){var r=unescape(o[0]),d=unescape(o[1]);d=d.replace(/\+/g," "),t[r]=d}}return t}function tb_getPageSize(){var e=document.documentElement,t=window.innerWidth||self.innerWidth||e&&e.clientWidth||document.body.clientWidth,n=window.innerHeight||self.innerHeight||e&&e.clientHeight||document.body.clientHeight;return arrayPageSize=[t,n]}function tb_detectMacXFF(){var e=navigator.userAgent.toLowerCase();return-1!=e.indexOf("mac")&&-1!=e.indexOf("firefox")?!0:void 0}var tb_pathToImage="../images/loadingAnimation.gif";jQuery(document).ready(function(){tb_init("a.thickbox, area.thickbox, input.thickbox"),imgLoader=new Image,imgLoader.src=tb_pathToImage});