define(['angularAMD'], function(app) {
	app.controller('ExcluirMenuPaginaPrincipalControle', ExcluirMenuPaginaPrincipalControle);

	ExcluirMenuPaginaPrincipalControle.$inject = ['$scope', '$http','$uibModalInstance', 'modal', 'ModalFabrica'
	];

	function ExcluirMenuPaginaPrincipalControle($scope, $http, $uibModalInstance, modal, ModalFabrica
		) {

		$scope.modal = modal;
		$scope.menuPaginaPrincipal = $scope.modal.objeto;

		$scope.updateLista = function(){
			var itens = $rootScope.paginasMenu;
			for(var i=0 ; i < itens.length ; i++){
				var ord = i+1;
				$rootScope.paginasMenu[i] = {
					ordenacao : ord,
					pagina : itens[i].pagina
				};
			}
		};

		$scope.excluir = function(item){
			var index = $rootScope.paginasMenu.indexOf(item);
			var excluiu;
			$rootScope.paginasMenu.splice(index, 1);
			$uibModalInstance.close();
			
			if(excluiu){
				// exclui o registro
				// Na exclusão de Agrupamentos, Menus da Página Principal e Páginas, o sistema deve atualizar a
				// ordenação dos demais itens
			}

			$scope.updateLista();
		};

		$scope.ok = function(){
			$uibModalInstance.close();
		};

		$scope.fechar = function(){
			$uibModalInstance.dismiss('cancel');
		};

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			delete $scope.quantidadeAnalise;
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};
	};
});