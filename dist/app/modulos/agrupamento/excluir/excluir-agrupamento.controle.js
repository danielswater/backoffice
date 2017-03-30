define(['angularAMD'], function(app) {
	app.controller('ExcluirAgrupamentoControle', ExcluirAgrupamentoControle);
		ExcluirAgrupamentoControle.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance', 'modal', 'ModalFabrica'
	];

			function ExcluirAgrupamentoControle($scope, $rootScope, $http, $uibModalInstance, modal, ModalFabrica
		) {

		$scope.modal = modal;
		$scope.item = $scope.modal.objeto;

		$scope.updateLista = function(){
			var itens = $rootScope.agrupamentos;
			for(var i=0 ; i < itens.length ; i++){
				var ord = i+1;
				$rootScope.agrupamentos[i] = {
					ordenacao : ord,
					nomeAgrupamento : itens[i].nomeAgrupamento,
					grupoUsuarioSistema : itens[i].grupoUsuarioSistema,
					imagem: itens[i].imagem,
					descricao : itens[i].descricao,
					corFundo : itens[i].corFundo,
					corFonte : itens[i].corFonte,
					situacao : itens[i].situacao,
				};
			}
		};

		$scope.excluir = function(item){
			var index = $rootScope.agrupamentos.indexOf(item);
			var excluiu;
			$rootScope.agrupamentos.splice(index, 1);
			$uibModalInstance.close();
			
			if(excluiu){
				// exclui o registro
				// Na exclusão de Agrupamentos, Menus da Página Principal e Páginas, o sistema deve atualizar a
				// ordenação dos demais itens
			}

			$scope.updateLista();
		};

		$scope.ok = function(){
			var msg;
			if(dadosVinculados){
				msg = "Não é possível excluir. Existem dados vinculados a este registro.";
				ModalFabrica.abrirModalMensagem('sucesso',msg);
			}

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
