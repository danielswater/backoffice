define(['angularAMD', 'sptMensagemErro'], function (app) {
	app.controller('IncluirEstampaControle', IncluirEstampaControle);

	IncluirEstampaControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'EstampaServico'];

	function IncluirEstampaControle($scope, $uibModalInstance, modal, MensagensFabrica, EstampaServico) {

		// Inicializacao
		$scope.modal = modal;
		$scope.novaEstampa = new EstampaModelo();


		$scope.subirImagem = function (event) {
			var input = event.target;
			var reader = new FileReader();
			reader.onload = function () {
				var dataURL = reader.result;
				$scope.novaEstampa.imagemClob = dataURL;
			};
			reader.readAsDataURL(input.files[0]);
		};

		/**
		 * Inclui uma nova estampa
		 */
		$scope.incluir = function () {
			// TODO: Pegar o usuario logado
			$scope.novaEstampa.registro = {
				usuarioCriacao: 'SPTRANS'
			};

			$scope.espera = EstampaServico.criar(
				$scope.novaEstampa,
				function (resposta) {
					if (!resposta.data.dataExcecao) {
						// sucesso
						$scope.mensagemRetorno = MensagensFabrica.get(resposta.data.codigo);
					} else {
						// erro
						$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
					}
				},
				function (resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
		};

		/**
		 * Funcao do botao ok da modal
		 */
		$scope.ok = function () {
			$uibModalInstance.close();
		};

		/**
		 * Funcao do botao fechar da modal
		 */
		$scope.fechar = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}
});