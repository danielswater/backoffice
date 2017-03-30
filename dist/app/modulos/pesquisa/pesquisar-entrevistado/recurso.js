define(['angularAMD', 'recursosFabrica'], function(app) {

	app.factory('RecursoPesquisa', RecursoPesquisa);

	function RecursoPesquisa(RecursosFabrica) {

		function trataPropriedadesParaEnvio(data, request) {
			return JSON.stringify(data);
		}

		var recurso = new RecursosFabrica({
			save: {
				transformRequest: trataPropriedadesParaEnvio
			}
		});

		return recurso;

	}

});