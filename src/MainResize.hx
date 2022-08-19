package;

import haxe.Log;
import js.Browser.*;
import js.Browser;
import js.html.*;
import model.constants.App;

using StringTools;

/**
 * @author Matthijs Kamstra aka [mck]
 * MIT
 *
 */
class MainResize {
	var container:js.html.DivElement;

	public function new() {
		trace("Hello 'Kluez-resizer'");
		init();
	}

	function init() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} Dom ready :: build: ${App.getBuildDate()} ');
			initHTML();
			makeResizableDiv('.resizable');
		});
	}

	function makeResizableDiv(div) {
		var element = document.querySelector(div);
		var resizers = document.querySelectorAll(div + ' .resizer');
		var minimum_size = 20;
		var original_width = 0.;
		var original_height = 0.;
		var original_x = 0.;
		var original_y = 0.;
		var original_mouse_x = 0.;
		var original_mouse_y = 0.;

		for (i in 0...resizers.length) {
			var _resizers = resizers[i];
			// trace(_resizers);

			var currentResizer:DivElement = cast resizers[i];

			function resize(e) {
				// trace(cast(currentResizer));
				if (currentResizer.classList.contains('bottom-right')) {
					var width = original_width + (e.pageX - original_mouse_x);
					var height = original_height + (e.pageY - original_mouse_y);
					if (width > minimum_size) {
						element.style.width = width + 'px';
					}
					if (height > minimum_size) {
						element.style.height = height + 'px';
					}
				} else if (currentResizer.classList.contains('bottom-left')) {
					var height = original_height + (e.pageY - original_mouse_y);
					var width = original_width - (e.pageX - original_mouse_x);
					if (height > minimum_size) {
						element.style.height = height + 'px';
					}
					if (width > minimum_size) {
						element.style.width = width + 'px';
						element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
					}
				} else if (currentResizer.classList.contains('top-right')) {
					var width = original_width + (e.pageX - original_mouse_x);
					var height = original_height - (e.pageY - original_mouse_y);
					if (width > minimum_size) {
						element.style.width = width + 'px';
					}
					if (height > minimum_size) {
						element.style.height = height + 'px';
						element.style.top = original_y + (e.pageY - original_mouse_y) + 'px';
					}
				} else if (currentResizer.classList.contains('top-left')) {
					var width = original_width - (e.pageX - original_mouse_x);
					var height = original_height - (e.pageY - original_mouse_y);
					if (width > minimum_size) {
						element.style.width = width + 'px';
						element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
					}
					if (height > minimum_size) {
						element.style.height = height + 'px';
						element.style.top = original_y + (e.pageY - original_mouse_y) + 'px';
					}
				} else if (currentResizer.classList.contains('bottom')) {
					var width = original_width + (e.pageX - original_mouse_x);
					var height = original_height + (e.pageY - original_mouse_y);

					if (height > minimum_size) {
						element.style.height = height + 'px';
					}
				} else if (currentResizer.classList.contains('top')) {
					var width = original_width - (e.pageX - original_mouse_x);
					var height = original_height - (e.pageY - original_mouse_y);

					if (height > minimum_size) {
						element.style.height = height + 'px';
						element.style.top = original_y + (e.pageY - original_mouse_y) + 'px';
					}
				} else if (currentResizer.classList.contains('right')) {
					var width = original_width + (e.pageX - original_mouse_x);
					var height = original_height - (e.pageY - original_mouse_y);
					if (width > minimum_size) {
						element.style.width = width + 'px';
					}
				} else if (currentResizer.classList.contains('left')) {
					var width = original_width - (e.pageX - original_mouse_x);
					var height = original_height - (e.pageY - original_mouse_y);
					if (width > minimum_size) {
						element.style.width = width + 'px';
						element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
					}
				} else {
					trace(currentResizer.classList);
				}
			}

			function stopResize() {
				window.removeEventListener('mousemove', resize);
			}

			currentResizer.addEventListener('mousedown', function(e) {
				e.preventDefault();
				original_width = Std.parseFloat(window.getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
				original_height = Std.parseFloat(window.getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
				original_x = element.getBoundingClientRect().left;
				original_y = element.getBoundingClientRect().top;
				original_mouse_x = e.pageX;
				original_mouse_y = e.pageY;
				window.addEventListener('mousemove', resize);
				window.addEventListener('mouseup', stopResize);
			});
		}
	}

	function initHTML() {
		container = cast document.getElementById('kluez-resizer-container');

		var resizerTemplate = "
<div class='resizable'>
  <div class='resizers'>
 	<!-- round resizers -->
    <div class='resizer top-left'></div>
    <div class='resizer top-right'></div>
    <div class='resizer bottom-left'></div>
    <div class='resizer bottom-right'></div>
 	<!-- square resizers -->
    <div class='resizer resizer-sq left'></div>
    <div class='resizer resizer-sq right'></div>
    <div class='resizer resizer-sq top'></div>
    <div class='resizer resizer-sq bottom'></div>
  </div>
</div>
";

		var frag = document.createRange().createContextualFragment(resizerTemplate);

		container.appendChild(frag);
	}

	static public function main() {
		var app = new MainResize();
	}
}
