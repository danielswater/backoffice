define(['angularAMD', 'sptMensagemErro'], function(app) {
	app.controller('ExcluirSamControle', ExcluirSamControle);

	ExcluirSamControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'SamServico'];

	function ExcluirSamControle($scope, $uibModalInstance, modal, MensagensFabrica, SamServico) {

		$scope.modal = modal;

		$scope.espera = SamServico.detalhar(
			modal.objeto.id,
			function (resposta) {
				$scope.sam = resposta.data;
			},
			function (resposta) {
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
			}
		);

		/**
		 * Funcao do botao fechar da modal
		 */
		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		/**
		 * Funcao do botao ok da modal
		 */
		$scope.ok = function() {
			$uibModalInstance.close();
		}

		/**
		 * Funcao que exclui a SAM
		 */
		$scope.excluir = function() {
			$scope.espera = SamServico.deletar(
				$scope.sam.id,
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
		}

	}
});
