define(['angularAMD'], function(app) {
	app.controller('EditarMoedaControle', EditarMoedaControle);

	EditarMoedaControle.$inject = ['$scope', '$http','$uibModalInstance', 'modal', 'ModalFabrica','MoedaServico'];

	function EditarMoedaControle($scope, $http, $uibModalInstance, modal, ModalFabrica,MoedaServico) {
		$scope.modal = modal;
        $scope.editar = $scope.modal.objeto;

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ok = function() {
			$uibModalInstance.close();
		};

		$scope.editarSubmit = function(){
			if(!$scope.formMoeda.$valid){
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
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};
	};
});