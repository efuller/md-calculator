window.EPF_Calculator = {};
(function(window, document, app) {

	var screenValue = '';

	var config = {
		numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
		operations: ["equal", "del", "clear"],
	};

	function calc(e) {
		var action = e.target.getAttribute('data-action');

		if (!action) {
			return false;
		}

		if (config.numbers.indexOf(action) !== -1) {
			setScreenValue(action);
		} else if (config.operations.indexOf(action) !== -1) {
			operations(action);
		}
	}

	function operations(action) {

		switch(action) {
			case "clear":
				clearScreen();
				break;
			case "del":
				deleteLast();
				break;
			default:
				equals();
				break;
		}
	}

	function equals() {
		var result = eval(screenValue);
		setScreenValue(result, true);
	}

	function setScreenValue(num, eval) {
		if (num && eval) {
			app.c.screen.innerHTML = num;
			return;
		}

		screenValue += num;
		app.c.screen.innerHTML = screenValue;
	}

	function clearScreen() {
		screenValue = '';
		app.c.screen.innerHTML = screenValue;
	}

	function deleteLast() {
		screenValue = screenValue.substring(0, screenValue.length -1);
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