define(['angularAMD'], function(app) {
	app.controller('DetalhesCartaoControle', DetalhesCartaoControle);

	DetalhesCartaoControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'CartaoServico'];

	function DetalhesCartaoControle($scope, $uibModalInstance, modal, CartaoServico) {

		$scope.modal = modal;

		$scope.espera.promise = CartaoServico.detalhar(
            modal.objeto.id,
			function(resposta) {
				$scope.cartao = resposta.data;
			},
			function(resposta) {
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
			}
		);

		$scope.ok = function() {
			$uibModalInstance.close();
		};

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

	};

});