define(['angularAMD'], function(app) {
	app.controller('EditarCartaoControle', EditarCartaoControle);

	EditarCartaoControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'CartaoServico'];

	function EditarCartaoControle($scope, $uibModalInstance, modal, MensagensFabrica, CartaoServico) {

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

		$scope.editar = function() {
			delete $scope.cartao.registro.status;

			$scope.espera = CartaoServico.salvar(
				$scope.cartao,
				function(resposta) {
					$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
					// $scope.limpar();
				},
				function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
				}
            );
		};

		$scope.ok = function() {
			$uibModalInstance.close();
		};

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

        // TODO: Verificar se tem a porra do limpar
		// $scope.limpar = function(form) {
		// 	$scope.formCartao.$setPristine();
		// 	$scope.formCartao.$setUntouched();
		// 	$scope.cartao.numeroLogicoCartao = '';
		// 	$scope.cartao.numeroFisicoCartao = '';
		// 	$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		// 	$scope.mensagemServidor = '';
		// };
	};

});