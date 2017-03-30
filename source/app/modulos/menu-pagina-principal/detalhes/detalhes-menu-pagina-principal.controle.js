define(['angularAMD'], function(app) {
	app.controller('DetalhesMenuPaginaPrincipalControle', DetalhesMenuPaginaPrincipalControle);
	DetalhesMenuPaginaPrincipalControle.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'modal'];

	function DetalhesMenuPaginaPrincipalControle($scope, $rootScope, $uibModalInstance, modal) {
		$scope.modal = modal;
		$scope.menuPaginaPrincipal = modal.objeto;
		$scope.imagem = 'data:'+$scope.menuPaginaPrincipal.imagem;

		$rootScope.paginasMenu = [
			{
				ordenacao : 1,
				pagina : 'Teste 1'
			},
			{
				ordenacao : 2,
				pagina : 'Teste 2'
			},
			{
				ordenacao : 3,
				pagina : 'Teste 3'
			},
			{
				ordenacao : 4,
				pagina : 'Teste 4'
			},
			{
				ordenacao : 5,
				pagina : 'Teste 5'
			},
		];

		$scope.situacoes = [
				{
					data : moment('2016-12-19T12:00:00').format('DD/MM/YYYY'),
					usuario : "Luciano",
					situacao : "Inativo",
					motivoInativacao : "Agrupamento inutilizado",
				}
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
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};
	};
});