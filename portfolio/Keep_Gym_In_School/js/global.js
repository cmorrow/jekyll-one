function fixPng(t){var e=t.src;t.style.width||(t.style.width=$(t).width()),t.style.height||(t.style.height=$(t).height()),t.onload=function(){},t.src=blank.src,t.runtimeStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+e+"',sizingMethod='scale')"}$(document).ready(function(){var t=$("#content").height();$("#contentDivider").height(t);var e=new Image;e.src="../images/blank.gif";var i=/MSIE ((5\.5)|6)/.test(navigator.userAgent)&&"Win32"==navigator.platform;i&&$("img[src$=.png]").each(function(){this.complete?fixPng(this):this.onload=function(){fixPng(this)}}),$("a.external").attr("target","_blank")});