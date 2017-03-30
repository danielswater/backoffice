define(['angularAMD', 'sptMensagemErro'], function(app) {
	app.controller('ExcluirCreditoControle', ExcluirCreditoControle);

	ExcluirCreditoControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'EmissaoCreditoServico'];

	function ExcluirCreditoControle($scope, $uibModalInstance, modal, MensagensFabrica, EmissaoCreditoServico) {

		$scope.modal = modal;

		$scope.espera = EmissaoCreditoServico.detalhar(
			modal.objeto.id,
			function (resposta) {
				$scope.emissao = resposta.data;
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
		 * Funcao que exclui a emissao
		 */
		$scope.excluir = function() {
			$scope.espera = EmissaoCreditoServico.deletar(
				$scope.emissao.id,
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