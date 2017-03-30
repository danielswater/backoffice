define(['angularAMD'], function(app) {
	app.controller('IncluirMoedaControle', IncluirMoedaControle);

	IncluirMoedaControle.$inject = ['$scope', '$http','$uibModalInstance', 'modal', 'ModalFabrica','MoedaServico'];

	function IncluirMoedaControle($scope, $http, $uibModalInstance, modal, ModalFabrica,MoedaServico) {
		$scope.modal = modal;
        $scope.incluir = {
			registro : {
				usuarioCriacao : 'sptrans'
			}
		};

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ok = function() {
			$uibModalInstance.close();
		};

		$scope.incluirSubmit = function(){
			if(!$scope.formMoeda.$valid){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Campo(s) obrigatório(s) não preenchido(s). Verifique.',
					function(){ }
				);
				return false;
			} else {
				$scope.espera = MoedaServico.incluir(
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
		};

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};
	};
});