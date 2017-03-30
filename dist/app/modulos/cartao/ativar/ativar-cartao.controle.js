define(['angularAMD'], function(app) {
	app.controller('AtivarCartaoControle', AtivarCartaoControle);

	AtivarCartaoControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'CartaoServico'];

	function AtivarCartaoControle($scope, $uibModalInstance, modal, MensagensFabrica, CartaoServico) {

		$scope.modal = modal;

		$scope.espera = CartaoServico.detalhar(
            modal.objeto.id,
			function(resposta) {
				$scope.cartao = resposta.data;
				$scope.modal.situacao = $scope.cartao.registro.status;
			},
			function(resposta) {
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
			}
		);

		$scope.ativar = function() {
			// var cartao = angular.copy($scope.cartao);
			// cartao.registro.status = ($scope.cartao.registro.status == 'A') ? 'I' : 'A'
			// cartao.registro.justificativa = (cartao.registro.status == 'A') ? $scope.cartao.registro.justificativa : $scope.ativacao.justificativa;

			$scope.espera = CartaoServico.salvar(
				$scope.cartao,
				function(resposta) {
					$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
				},
				function(resposta) {
					$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
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