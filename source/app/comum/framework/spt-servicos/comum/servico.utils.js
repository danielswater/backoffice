define(['angularAMD'], function(app) {

	app.factory('ServicoUtils', ServicoUtils);

	ServicoUtils.$inject = [];

	function ServicoUtils() {

		return {
			deParaMensagem: function(codigo, status) {
                switch(codigo) {
                    case 2:
                        codigo = (status == 'A' ? 5 : 7);
                        break; 
                }
                return codigo;
			}
		}

	}
});