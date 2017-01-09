window.EPF_Calculator = {};
(function(window, document, app) {

	// Initialize the screen value.
	var screenValue = '';

	// Config object to hold buttons.
	var config = {
		chars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
		operations: ["equal", "del", "clear"],
	};

	/**
	 * Private function that is attached to all buttons. A controller of sorts.
	 *
	 * @param e The button event.
	 *
	 * @returns {boolean}
	 */
	function calc(e) {
		// Set the action from the button that was clicked.
		var action = e.target.getAttribute('data-action');

		// Bail if there is no action.
		if (!action) {
			return false;
		}

		// Call a function based on what button was clicked.
		if (config.chars.indexOf(action) !== -1) {
			setScreenValue(action);
		} else if (config.operations.indexOf(action) !== -1) {
			operations(action);
		}
	}

	/**
	 * Handle operations.
	 *
	 * @param action The action of the button that was clicked.
	 */
	function operations(action) {

		// Call a function based on the action passed.
		switch(action) {
			case "clear":
				clearScreen(); // The 'C' button.
				break;
			case "del":
				deleteLast(); // The 'D' button.
				break;
			default:
				equals(); // The '=' button.
				break;
		}
	}

	/**
	 * Run when the equals button is clicked.
	 */
	function equals() {
		var result = eval(screenValue); // Run eval on the screen value.

		// Set the screen value.
		setScreenValue(result, true);
	}

	/**
	 * Set the screen value.
	 *
	 * @param num The number value of the button that was clicked.
	 * @param {Boolean} eval Is this a result of running eval?
	 */
	function setScreenValue(num, eval) {
		// If there is a number and eval is true.
		if (num && eval) {
			app.c.screen.innerHTML = num;
			return;
		}

		// Append the screen value.
		screenValue += num;

		// Update the screen value in the DOM.
		app.c.screen.innerHTML = screenValue;
	}

	/**
	 * Clear the screen.
	 */
	function clearScreen() {
		screenValue = '';
		app.c.screen.innerHTML = screenValue;
	}

	/**
	 * For the 'D' button. Remove the last/most recent addition to the screen value.
	 */
	function deleteLast() {
		// Remove last/most recent value from screen value.
		screenValue = screenValue.substring(0, screenValue.length -1);

		// Update DOM.
		app.c.screen.innerHTML = screenValue;
	}

	/**
	 * Initialize validation.
	 */
	app.init = function() {
		app.cache();
		app.bindEvents();
	};

	/**
	 * Cache DOM elements that we will need.
	 */
	app.cache = function() {

		// Cache object
		app.c = {
			screen: document.getElementById('screen'),
			calculator: document.getElementById('calculator'),
			buttons: document.querySelectorAll('#calculator button.key'),
		}
	};

	/**
	 * Bind events
	 */
	app.bindEvents = function() {

		// Loop over each button and add a click event listener.
		for (var i = 0; i < app.c.buttons.length; i++) {
			app.c.buttons[i].addEventListener('click', calc);
		}
	};

	// Engage!
	app.init();
})(window, document, window.EPF_Calculator);