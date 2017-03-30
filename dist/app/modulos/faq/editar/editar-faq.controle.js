define(['angularAMD','FaqServico'], function(app) {
	app.controller('EditarFaqControle', EditarFaqControle);

	EditarFaqControle.$inject = ['$scope','$http','$filter','$uibModalInstance','modal','ModalFabrica','FaqServico'];

	function EditarFaqControle($scope,$http,$filter,$uibModalInstance, modal,ModalFabrica,FaqServico) {
		$scope.modal = modal;
		console.log('$scope.modal',$scope.modal);
		
		$scope.editar = $scope.modal.objeto;
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

		$scope.editarSubmit = function(){
			if(!$scope.formFaq.$valid){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Campo(s) obrigatório(s) não preenchido(s). Verifique.',
					function(){ }
				);
				return false;
			} else {
				$scope.espera = FaqServico.editar(
					$scope.editar,
					function(resposta){
						if(resposta.data.dataExcecao){
							new ModalFabrica.abrirModalMensagem(
								'erro',
								'Registro já cadastrado.',
								function(){ }
							);
							
							return false;
						} else {
							new ModalFabrica.abrirModalMensagem(
								'sucesso',
								'Alteração realizada com sucesso.',
								function(){
									$uibModalInstance.close();
								}
							);
						}
					}, 
					function(resposta){
						new ModalFabrica.abrirModalMensagem(
							'erro',
							resposta.mensagem,
							function(){ }
						);
						
						return false;
					}
				);
			}
			console.log('$scope.editar',$scope.editar);
		};

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			delete $scope.quantidadeAnalise;
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};
	}
});