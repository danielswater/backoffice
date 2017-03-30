define(['angularAMD','FaqServico'], function(app) {
	app.controller('IncluirFaqControle', IncluirFaqControle);

	IncluirFaqControle.$inject = ['$scope', '$http','$filter','$uibModalInstance', 'modal', 'ModalFabrica','FaqServico'];

	function IncluirFaqControle($scope, $http,$filter,$uibModalInstance, modal, ModalFabrica,FaqServico) {
		$scope.modal = modal;
		$scope.incluir = {
			registro : {
				usuarioCriacao : 'sptrans'
			}
		};

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

		$scope.incluirSubmit = function(){
			if(!$scope.formFaq.$valid){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Campo(s) obrigatório(s) não preenchido(s). Verifique.',
					function(){ }
				);
				return false;
			} else {
				$scope.espera = FaqServico.incluir(
					$scope.incluir,
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
								'Inclusão realizada com sucesso.',
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

			console.log('$scope.incluir',$scope.incluir);
		};

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};
	}
});