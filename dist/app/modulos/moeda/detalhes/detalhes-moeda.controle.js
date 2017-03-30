define(['angularAMD'], function(app) {
	app.controller('DetalhesMoedaControle', DetalhesMoedaControle);

	DetalhesMoedaControle.$inject = ['$scope', '$uibModalInstance', 'modal'];

	function DetalhesMoedaControle($scope, $uibModalInstance, modal) {
		$scope.modal = modal;
		$scope.moeda = modal.objeto;
		console.log('modal',modal);
		console.log('$scope.moeda',$scope.moeda);

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ok = function() {
			$uibModalInstance.close();
		};

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};
	};
});