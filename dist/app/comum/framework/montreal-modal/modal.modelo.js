define(['angularAMD'], function(app) {

	app.factory("ModalModelo", ModalModelo)

	ModalModelo.$inject = [];

	function ModalModelo() {

		return function get(params) {
			// Objeto default
			var obj = {
				backdrop: 'static',
				keyboard: false,
				size: 'LG',
				resolve: {},
				callback: angular.noop,
				callbackClick: angular.noop
			};

			// Construtor
			if (angular.isDefined(params)) {
				angular.extend(obj, params);
			}

			return obj;
		}

	}

});