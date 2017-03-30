define(['angularAMD'], function(app) {
	app.controller('IncluirCartaoControle', IncluirCartaoControle);

	IncluirCartaoControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'CartaoServico'];

	function IncluirCartaoControle($scope, $uibModalInstance, modal, MensagensFabrica, CartaoServico) {

		$scope.modal = modal;

		$scope.incluir = function() {
			$scope.espera = CartaoServico.criar(
				$scope.novoCartao,
				function(resposta) {
					$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
					$scope.limpar();
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