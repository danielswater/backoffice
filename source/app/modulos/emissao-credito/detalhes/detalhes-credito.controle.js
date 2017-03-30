define(['angularAMD'], function(app) {
	app.controller('DetalhesCreditoControle', DetalhesCreditoControle);

	DetalhesCreditoControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'EmissaoCreditoServico', 'MensagensFabrica'];

	function DetalhesCreditoControle($scope, $uibModalInstance, modal, EmissaoCreditoServico, MensagensFabrica) {

		$scope.modal = modal;
		$scope.emissao = new EmissaoCreditoModelo();

		$scope.espera = EmissaoCreditoServico.detalhar(
			$scope.modal.objeto.id,
			function(resposta) {
				$scope.emissao = resposta.data;
			}, 
			function(resposta) {
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.codigo);
			}
		);

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ok = function() {
			$uibModalInstance.close();
		};

	};

});