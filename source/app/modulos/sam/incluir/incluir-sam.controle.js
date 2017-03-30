define(['angularAMD', 'sptMensagemErro'], function(app) {
	app.controller('IncluirSamControle', IncluirSamControle);

	IncluirSamControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'SamServico'];

	function IncluirSamControle($scope, $uibModalInstance, modal, MensagensFabrica, SamServico) {

		// Inicializacao
		$scope.modal = modal;
		$scope.novaSam = '';

		/**
		 * Chama servico para carregar os tipos de SAM
		 */
		var carregarTipos = function () {
			$scope.espera = SamServico.listarTipoSAM(
				function(resposta) {
					$scope.samsTipos = resposta.data;
				}, function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
				}
			);
		};

		carregarTipos();

		/**
		 * Inclui uma nova SAN
		 */
		$scope.incluir = function() {
			// TODO: Pegar o usuario logado
			$scope.novaSam.registro = {
				usuarioCriacao: 'SPTRANS'
			};

			$scope.espera = SamServico.criar(
				$scope.novaSam,
				function(resposta) {
					if (!resposta.data.dataExcecao) {
						// sucesso
						$scope.mensagemRetorno = MensagensFabrica.get(resposta.data.codigo);
					} else {
						// erro
						$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
					}
				},
				function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
		};

		/**
		 * Funcao do botao ok da modal
		 */
		$scope.ok = function() {
			$uibModalInstance.close();
		};

		/**
		 * Funcao do botao fechar da modal
		 */
		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}
});