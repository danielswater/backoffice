(function() {
	'use strict';
	define(['angularAMD'], function(app) {
		app.constant("CONFIG", {
			PATHS: {
                gateway : 'http://10.6.11.163:9090',
                modulos : 'app/modulos/',
				reconhecimentoFacial: 'app/modulos/reconhecimento-facial/'
			},
			disableInterceptor: true
		})
	});
})();