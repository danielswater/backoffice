define(['angularAMD'], function(app) {
	app.controller('DetalhesAgrupamentoControle', DetalhesAgrupamentoControle);

	DetalhesAgrupamentoControle.$inject = ['$scope', '$uibModalInstance', 'modal'
	];

	function DetalhesAgrupamentoControle($scope, $uibModalInstance, modal
		) {

		$scope.modal = modal;
		$scope.agrupamento = modal.objeto;
		$scope.imagem = 'data:'+$scope.agrupamento.imagem;
		
		$scope.situacoes = [
				{
					data : moment('2016-12-19T12:00:00').format('DD/MM/YYYY'),
					usuario : "Luciano",
					situacao : "Inativo",
					motivoInativacao : "Agrupamento inutilizado",
				},
				{
					data : moment('2016-12-18T11:00:00').format('DD/MM/YYYY'),
					usuario : "Luciano",
					situacao : "Inativo",
					motivoInativacao : "Agrupamento inutilizado",
				},
				{
					data : moment('2016-12-17T10:00:00').format('DD/MM/YYYY'),
					usuario : "Luciano",
					situacao : "Inativo",
					motivoInativacao : "Agrupamento inutilizado",
				},
				{
					data : moment('2016-12-16T09:00:00').format('DD/MM/YYYY'),
					usuario : "Luciano",
					situacao : "Inativo",
					motivoInativacao : "Agrupamento inutilizado",
				},
				{
					data : moment('2016-12-15T08:00:00').format('DD/MM/YYYY'),
					usuario : "Luciano",
					situacao : "Inativo",
					motivoInativacao : "Agrupamento inutilizado",
				},
			]
		;
		
		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ok = function() {
			$uibModalInstance.close();
		};

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			delete $scope.quantidadeAnalise;
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};
	};
});