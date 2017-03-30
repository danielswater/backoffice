define(['angularAMD'], function(app) {

	app.factory('Utils', Utils);

	Utils.$inject = [];

	function Utils() {

		var camelCase = function(input) {
			return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
				return group1.toUpperCase();
			});
		}

		return {
			geraNomeControle: function(string) {				
				string = camelCase(string);
				return string.charAt(0).toUpperCase() + string.slice(1) + "Controle";

			}
		}
	}
});