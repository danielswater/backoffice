define(['angularAMD','FaqServico'], function(app) {
	app.controller('DetalhesFaqControle', DetalhesFaqControle);

	DetalhesFaqControle.$inject = ['$scope','$filter', '$uibModalInstance', 'modal','FaqServico'];

	function DetalhesFaqControle($scope,$filter, $uibModalInstance, modal,FaqServico) {
		$scope.modal = modal;
		$scope.faq = modal.objeto;
		console.log('$scope.faq',$scope.faq);
		

		$scope.espera = FaqServico.listarCategoriasFaq(
			function(resposta){
				if(resposta.data){
					$scope.categoriasFaq = $filter('orderBy')(resposta.data, 'descricao');
				}
			}, 
			function(resposta){
				console.log('Erro ao carregar as categorias faq', resposta);
			}
		);

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