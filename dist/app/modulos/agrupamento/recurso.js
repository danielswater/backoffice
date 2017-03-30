define(['angularAMD', 'recursosFabrica'], function(app) {

	app.factory('RecursoAgrupamentoPesquisarAgrupamento', RecursoAgrupamentoPesquisarAgrupamento);

	function RecursoAgrupamentoPesquisarAgrupamento(RecursosFabrica) {

		var model = {};
		// Transformando as requisições ao servidor
		function trataPropriedadesParaEnvio(data, request) {
			// Sempre retornar os dados do transformRequest como string
			return JSON.stringify(data);
		}

		var recurso = new RecursosFabrica(
			// Nome do recurso no endpoint no GATEWAY
			'recon/agrupamento/agrupamento',
			// Versão a ser utilizada pelo recurso
			'v1',
			// Configuração dos valores default dos parâmetros
			model,
			// Configuração de métodos específicos
			// Configurando e sobrescrevendo o método SAVE
			{
				save: {
					// Transformando as requisições ao servidor
					transformRequest: trataPropriedadesParaEnvio
				}
			});

		return recurso;

	}

});