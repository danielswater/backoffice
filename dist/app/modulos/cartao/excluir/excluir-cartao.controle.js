define(['angularAMD'], function(app) {
	app.controller('ExcluirCartaoControle', ExcluirCartaoControle);

	ExcluirCartaoControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'CartaoServico'];

	function ExcluirCartaoControle($scope, $uibModalInstance, modal, Espera, MensagensFabrica, CartaoServico) {
		$scope.modal = modal;

		$scope.espera = CartaoServico.detalhar(
            modal.objeto.id,
			function(resposta) {
				$scope.cartao = resposta.data;
			},
			function(resposta) {
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
			}
		);

		$scope.excluir = function() {
			$scope.espera = CartaoServico.delete(
				$scope.cartao.id,
				function(resposta) {
					$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
				},
				function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
				}
            );
		}

		$scope.ok = function() {
			$uibModalInstance.close();
		}

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}
});