define(['angularAMD'], function (app) {
	app.controller('DetalhesEstampaControle', DetalhesEstampaControle);

	DetalhesEstampaControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'EstampaServico', 'MensagensFabrica'];

	function DetalhesEstampaControle($scope, $uibModalInstance, modal, EstampaServico, MensagensFabrica) {

		$scope.modal = modal;

		$scope.espera = EstampaServico.filtrar(
			{ identificadorEstampa: $scope.modal.objeto.identificadorEstampa },
			function (resposta) {
				$scope.estampa = resposta.data;
			},
			function (resposta) {
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.codigo);
			}
		);

		/**
		 * Funcao do botao fechar da modal
		 */
		$scope.fechar = function () {
			$uibModalInstance.dismiss('cancel');
		};

		/**
		 * Funcao do botao ok da modal
		 */
		$scope.ok = function () {
			$uibModalInstance.close();
		};

	};

});