(function ($global) { "use strict";
var MainResize = function() {
	console.log("src/MainResize.hx:20:","Hello 'Kluez-resizer'");
	this.init();
};
MainResize.main = function() {
	var app = new MainResize();
};
MainResize.prototype = {
	init: function() {
		var _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("" + model_constants_App.NAME + " Dom ready :: build: " + "2022-08-19 14:54:40" + " ");
			_gthis.initHTML();
			_gthis.makeResizableDiv(".resizable");
		});
	}
	,makeResizableDiv: function(div) {
		var element = window.document.querySelector(div);
		var resizers = window.document.querySelectorAll(div + " .resizer");
		var minimum_size = 20;
		var original_width = 0.;
		var original_height = 0.;
		var original_x = 0.;
		var original_y = 0.;
		var original_mouse_x = 0.;
		var original_mouse_y = 0.;
		var _g = 0;
		var _g1 = resizers.length;
		while(_g < _g1) {
			var i = _g++;
			var _resizers = resizers[i];
			var currentResizer = [resizers[i]];
			var resize = [(function(currentResizer) {
				return function(e) {
					if(currentResizer[0].classList.contains("bottom-right")) {
						var width = original_width + (e.pageX - original_mouse_x);
						var height = original_height + (e.pageY - original_mouse_y);
						if(width > minimum_size) {
							element.style.width = width + "px";
						}
						if(height > minimum_size) {
							element.style.height = height + "px";
						}
					} else if(currentResizer[0].classList.contains("bottom-left")) {
						var height = original_height + (e.pageY - original_mouse_y);
						var width = original_width - (e.pageX - original_mouse_x);
						if(height > minimum_size) {
							element.style.height = height + "px";
						}
						if(width > minimum_size) {
							element.style.width = width + "px";
							element.style.left = original_x + (e.pageX - original_mouse_x) + "px";
						}
					} else if(currentResizer[0].classList.contains("top-right")) {
						var width = original_width + (e.pageX - original_mouse_x);
						var height = original_height - (e.pageY - original_mouse_y);
						if(width > minimum_size) {
							element.style.width = width + "px";
						}
						if(height > minimum_size) {
							element.style.height = height + "px";
							element.style.top = original_y + (e.pageY - original_mouse_y) + "px";
						}
					} else if(currentResizer[0].classList.contains("top-left")) {
						var width = original_width - (e.pageX - original_mouse_x);
						var height = original_height - (e.pageY - original_mouse_y);
						if(width > minimum_size) {
							element.style.width = width + "px";
							element.style.left = original_x + (e.pageX - original_mouse_x) + "px";
						}
						if(height > minimum_size) {
							element.style.height = height + "px";
							element.style.top = original_y + (e.pageY - original_mouse_y) + "px";
						}
					} else if(currentResizer[0].classList.contains("bottom")) {
						var width = original_width + (e.pageX - original_mouse_x);
						var height = original_height + (e.pageY - original_mouse_y);
						if(height > minimum_size) {
							element.style.height = height + "px";
						}
					} else if(currentResizer[0].classList.contains("top")) {
						var width = original_width - (e.pageX - original_mouse_x);
						var height = original_height - (e.pageY - original_mouse_y);
						if(height > minimum_size) {
							element.style.height = height + "px";
							element.style.top = original_y + (e.pageY - original_mouse_y) + "px";
						}
					} else if(currentResizer[0].classList.contains("right")) {
						var width = original_width + (e.pageX - original_mouse_x);
						var height = original_height - (e.pageY - original_mouse_y);
						if(width > minimum_size) {
							element.style.width = width + "px";
						}
					} else if(currentResizer[0].classList.contains("left")) {
						var width = original_width - (e.pageX - original_mouse_x);
						var height = original_height - (e.pageY - original_mouse_y);
						if(width > minimum_size) {
							element.style.width = width + "px";
							element.style.left = original_x + (e.pageX - original_mouse_x) + "px";
						}
					} else {
						console.log("src/MainResize.hx:120:",currentResizer[0].classList);
					}
				};
			})(currentResizer)];
			var stopResize = [(function(resize) {
				return function() {
					window.removeEventListener("mousemove",resize[0]);
				};
			})(resize)];
			currentResizer[0].addEventListener("mousedown",(function(stopResize,resize) {
				return function(e) {
					e.preventDefault();
					original_width = parseFloat(StringTools.replace(window.getComputedStyle(element,null).getPropertyValue("width"),"px",""));
					original_height = parseFloat(StringTools.replace(window.getComputedStyle(element,null).getPropertyValue("height"),"px",""));
					original_x = element.getBoundingClientRect().left;
					original_y = element.getBoundingClientRect().top;
					original_mouse_x = e.pageX;
					original_mouse_y = e.pageY;
					window.addEventListener("mousemove",resize[0]);
					window.addEventListener("mouseup",stopResize[0]);
				};
			})(stopResize,resize));
		}
	}
	,initHTML: function() {
		this.container = window.document.getElementById("kluez-resizer-container");
		var resizerTemplate = "\n<div class='resizable'>\n  <div class='resizers'>\n \t<!-- round resizers -->\n    <div class='resizer top-left'></div>\n    <div class='resizer top-right'></div>\n    <div class='resizer bottom-left'></div>\n    <div class='resizer bottom-right'></div>\n \t<!-- square resizers -->\n    <div class='resizer resizer-sq left'></div>\n    <div class='resizer resizer-sq right'></div>\n    <div class='resizer resizer-sq top'></div>\n    <div class='resizer resizer-sq bottom'></div>\n  </div>\n</div>\n";
		var frag = window.document.createRange().createContextualFragment(resizerTemplate);
		this.container.appendChild(frag);
	}
};
var StringTools = function() { };
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var model_constants_App = function() { };
model_constants_App.NAME = "[example_javascript]";
MainResize.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=kluez-resize.js.map