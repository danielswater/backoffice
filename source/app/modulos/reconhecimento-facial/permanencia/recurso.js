define(['angularAMD', 'recursosFabrica'], function(app) {

	app.factory('RecursoPermanencia', RecursoPermanencia);

	function RecursoPermanencia(RecursosFabrica) {

		var model = {
			positivo: '',
			negativo: ''
		};

		// Transformando as requisições ao servidor
		function trataPropriedadesParaEnvio(data, request) {
			// Removendo a propriedade alteracao
			// Ela é somente leitura e não deve ser enviada
			// Apenas recebida
			// delete data.registro.alteracao;

			// Sempre retornar os dados do transformRequest como string
			return JSON.stringify(data);
		}

		var recurso = new RecursosFabrica(
			// Nome do recurso no endpoint no GATEWAY
			'recon/permanencia',
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
