package;

import haxe.Log;
import js.Browser.*;
import js.Browser;
import js.html.*;
import model.constants.App;

using StringTools;

/**
 * @author Matthijs Kamstra aka [mck]
 */
class MainResize {
	var container:js.html.DivElement;
	var arr = ['blue', 'red', 'green'];

	public function new() {
		trace("Hello 'Kluez-resizer'");

		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} Dom ready :: build: ${App.getBuildDate()} ');

			container = cast document.getElementById('kluez-resizer-container');

			createItem();
			makeResizableDiv('.resizable');
		});
	}

	function makeResizableDiv(div) {
		var element:DivElement = cast document.querySelector(div);
		var resizers = document.querySelectorAll(div + ' .resizer');
		var minimum_size = 20;
		var original_width = 0.;
		var original_height = 0.;
		var original_x = 0.;
		var original_y = 0.;
		var original_mouse_x = 0.;
		var original_mouse_y = 0.;

		element.onmousedown = () -> {
			trace('onmousedown');
			element.onmouseup = () -> {
				trace('onmouseup');
			}
		}

		for (i in 0...resizers.length) {
			// var _resizers = resizers[i];
			var currentResizer:DivElement = cast resizers[i];

			function resize(e) {
				var value = currentResizer.dataset.kluezResizer;
				switch (value) {
					case 'bottom-right':
						var width = original_width + (e.pageX - original_mouse_x);
						var height = original_height + (e.pageY - original_mouse_y);
						if (width > minimum_size) {
							element.style.width = width + 'px';
						}
						if (height > minimum_size) {
							element.style.height = height + 'px';
						}
					case 'bottom-left':
						var height = original_height + (e.pageY - original_mouse_y);
						var width = original_width - (e.pageX - original_mouse_x);
						if (height > minimum_size) {
							element.style.height = height + 'px';
						}
						if (width > minimum_size) {
							element.style.width = width + 'px';
							element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
						}
					case 'top-right':
						var width = original_width + (e.pageX - original_mouse_x);
						var height = original_height - (e.pageY - original_mouse_y);
						if (width > minimum_size) {
							element.style.width = width + 'px';
						}
						if (height > minimum_size) {
							element.style.height = height + 'px';
							element.style.top = original_y + (e.pageY - original_mouse_y) + 'px';
						}
					case 'top-left':
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
					case 'bottom':
						var width = original_width + (e.pageX - original_mouse_x);
						var height = original_height + (e.pageY - original_mouse_y);

						if (height > minimum_size) {
							element.style.height = height + 'px';
						}
					case 'top':
						var width = original_width - (e.pageX - original_mouse_x);
						var height = original_height - (e.pageY - original_mouse_y);

						if (height > minimum_size) {
							element.style.height = height + 'px';
							element.style.top = original_y + (e.pageY - original_mouse_y) + 'px';
						}
					case 'right':
						var width = original_width + (e.pageX - original_mouse_x);
						var height = original_height - (e.pageY - original_mouse_y);
						if (width > minimum_size) {
							element.style.width = width + 'px';
						}
					case 'left':
						var width = original_width - (e.pageX - original_mouse_x);
						var height = original_height - (e.pageY - original_mouse_y);
						if (width > minimum_size) {
							element.style.width = width + 'px';
							element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
						}

					default:
						trace("case '" + currentResizer.dataset.kluezResier + "': trace ('" + currentResizer.dataset.kluezResier + "');");
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

	function createItem(id = 'foo', x = 150, y = 150, w = 150, h = 150) {
		var resizerTemplate = '
<div class="resizable" id="${id}" style="width: ${w}px; height: ${h}px; left: ${x}px; top: ${y}px;">
	<div class="dragger"></div>
	<div class="resizers">
		<!-- round resizers -->
		<div class="resizer top-left" data-kluez-resizer="top-left"></div>
		<div class="resizer top-right" data-kluez-resizer="top-right"></div>
		<div class="resizer bottom-left" data-kluez-resizer="bottom-left"></div>
		<div class="resizer bottom-right" data-kluez-resizer="bottom-right"></div>
		<!-- square resizers -->
		<div class="resizer resizer-sq left" data-kluez-resizer="left"></div>
		<div class="resizer resizer-sq right" data-kluez-resizer="right"></div>
		<div class="resizer resizer-sq top" data-kluez-resizer="top"></div>
		<div class="resizer resizer-sq bottom" data-kluez-resizer="bottom"></div>
	</div>
</div>
';

		var frag = document.createRange().createContextualFragment(resizerTemplate);
		container.appendChild(frag);
	}

	static public function main() {
		var app = new MainResize();
	}
}
