/*
 * Variables
*/

const state = {
	hidden: 'is-hidden',
	visible: 'is-visible',
	selected: 'is-selected',
	active: 'is-active',
	removed: 'is-removed',
	processing: 'is-processing',
	loading: 'is-loading'
}

/*
 * Initialise Components
*/

// Ready
$(window)
	.ready(
		function(){
			component.init();
		}
	);

// Resize
$(window)
	.resize(
		function(){
		}
	);

// Resize
$(window)
	.scroll(
		function(){
		}
	);
