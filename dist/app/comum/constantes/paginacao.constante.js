(function() {

	'use strict';

	define(['angularAMD'], function(app) {
		app.constant("PAGINACAO", {
			ITENS_POR_PAGINA: 10,
			QTD_REGISTROS_CACHE: 2
		})
	});

})();