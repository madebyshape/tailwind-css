/*
 * Variables
*/

const state = {
	hidden: 'hidden',
	visible: 'visible',
	selected: 'selected',
	active: 'active',
	removed: 'removed',
	processing: 'processing',
	loading: 'loading'
}

/*
 * Initialise Components
*/

// Ready
$(window)
	.ready(
		function(){
			component.load();
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
