(function ($global) { "use strict";
var MainResize = function() {
	var _gthis = this;
	console.log("src/MainResize.hx:19:","Hello 'Kluez-resizer'");
	window.document.addEventListener("DOMContentLoaded",function(event) {
		$global.console.log("" + model_constants_App.NAME + " Dom ready :: build: " + "2022-08-19 18:01:59" + " ");
		_gthis.container = window.document.getElementById("kluez-resizer-container");
		_gthis.createItem();
		_gthis.makeResizableDiv(".resizable");
	});
};
MainResize.main = function() {
	var app = new MainResize();
};
MainResize.prototype = {
	makeResizableDiv: function(div) {
		var element = window.document.querySelector(div);
		var resizers = window.document.querySelectorAll(div + " .resizer");
		var minimum_size = 20;
		var original_width = 0.;
		var original_height = 0.;
		var original_x = 0.;
		var original_y = 0.;
		var original_mouse_x = 0.;
		var original_mouse_y = 0.;
		element.onmousedown = function() {
			console.log("src/MainResize.hx:43:","onmousedown");
			return element.onmouseup = function() {
				console.log("src/MainResize.hx:45:","onmouseup");
			};
		};
		var _g = 0;
		var _g1 = resizers.length;
		while(_g < _g1) {
			var i = _g++;
			var _resizers = resizers[i];
			var currentResizer = [resizers[i]];
			var resize = [(function(currentResizer) {
				return function(e) {
					var value = currentResizer[0].dataset.kluezResizer;
					switch(value) {
					case "bottom":
						var width = original_width + (e.pageX - original_mouse_x);
						var height = original_height + (e.pageY - original_mouse_y);
						if(height > minimum_size) {
							element.style.height = height + "px";
						}
						break;
					case "bottom-left":
						var height = original_height + (e.pageY - original_mouse_y);
						var width = original_width - (e.pageX - original_mouse_x);
						if(height > minimum_size) {
							element.style.height = height + "px";
						}
						if(width > minimum_size) {
							element.style.width = width + "px";
							element.style.left = original_x + (e.pageX - original_mouse_x) + "px";
						}
						break;
					case "bottom-right":
						var width = original_width + (e.pageX - original_mouse_x);
						var height = original_height + (e.pageY - original_mouse_y);
						if(width > minimum_size) {
							element.style.width = width + "px";
						}
						if(height > minimum_size) {
							element.style.height = height + "px";
						}
						break;
					case "left":
						var width = original_width - (e.pageX - original_mouse_x);
						var height = original_height - (e.pageY - original_mouse_y);
						if(width > minimum_size) {
							element.style.width = width + "px";
							element.style.left = original_x + (e.pageX - original_mouse_x) + "px";
						}
						break;
					case "right":
						var width = original_width + (e.pageX - original_mouse_x);
						var height = original_height - (e.pageY - original_mouse_y);
						if(width > minimum_size) {
							element.style.width = width + "px";
						}
						break;
					case "top":
						var width = original_width - (e.pageX - original_mouse_x);
						var height = original_height - (e.pageY - original_mouse_y);
						if(height > minimum_size) {
							element.style.height = height + "px";
							element.style.top = original_y + (e.pageY - original_mouse_y) + "px";
						}
						break;
					case "top-left":
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
						break;
					case "top-right":
						var width = original_width + (e.pageX - original_mouse_x);
						var height = original_height - (e.pageY - original_mouse_y);
						if(width > minimum_size) {
							element.style.width = width + "px";
						}
						if(height > minimum_size) {
							element.style.height = height + "px";
							element.style.top = original_y + (e.pageY - original_mouse_y) + "px";
						}
						break;
					default:
						console.log("src/MainResize.hx:128:","case '" + currentResizer[0].dataset.kluezResier + "': trace ('" + currentResizer[0].dataset.kluezResier + "');");
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
	,createItem: function(id,x,y,w,h) {
		if(h == null) {
			h = 150;
		}
		if(w == null) {
			w = 150;
		}
		if(y == null) {
			y = 150;
		}
		if(x == null) {
			x = 150;
		}
		if(id == null) {
			id = "foo";
		}
		var resizerTemplate = "\n<div class=\"resizable\" id=\"" + id + "\" style=\"width: " + w + "px; height: " + h + "px; left: " + x + "px; top: " + y + "px;\">\n\t<div class=\"dragger\"></div>\n\t<div class=\"resizers\">\n\t\t<!-- round resizers -->\n\t\t<div class=\"resizer top-left\" data-kluez-resizer=\"top-left\"></div>\n\t\t<div class=\"resizer top-right\" data-kluez-resizer=\"top-right\"></div>\n\t\t<div class=\"resizer bottom-left\" data-kluez-resizer=\"bottom-left\"></div>\n\t\t<div class=\"resizer bottom-right\" data-kluez-resizer=\"bottom-right\"></div>\n\t\t<!-- square resizers -->\n\t\t<div class=\"resizer resizer-sq left\" data-kluez-resizer=\"left\"></div>\n\t\t<div class=\"resizer resizer-sq right\" data-kluez-resizer=\"right\"></div>\n\t\t<div class=\"resizer resizer-sq top\" data-kluez-resizer=\"top\"></div>\n\t\t<div class=\"resizer resizer-sq bottom\" data-kluez-resizer=\"bottom\"></div>\n\t</div>\n</div>\n";
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