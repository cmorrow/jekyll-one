$(document).ready(function(){$(".showHide").click(function(){return docHeight=$(document).height(),$("#overlay").height(docHeight),$("#overlay").fadeIn(500),$(this.hash).fadeIn(500),$("body").append('<div id="overlay" style="background:none;">&nbsp;</div>'),$("#overlay").show(),$("#overlay").click(function(){$(".iframe:visible").fadeOut(400),$("#overlay").fadeOut(500,function(){$("#overlay").remove()})}),!1}),$(".showHideOverlay").click(function(){return docHeight=$(document).height(),$("#overlay").height(docHeight),$("#overlay").fadeIn(500),$(this.hash).fadeIn(500),$("body").append('<div id="overlay">&nbsp;</div>'),$("#overlay").fadeIn(500),$("#overlay").click(function(){$(".iframe:visible").fadeOut(400),$("#overlay").fadeOut(500,function(){$("#overlay").remove()})}),!1}),$(".overlay .close").click(function(){return $(this.hash).fadeOut(400),!1})});