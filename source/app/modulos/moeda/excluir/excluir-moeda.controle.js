define(['angularAMD','MoedaServico'], function(app) {
	app.controller('ExcluirMoedaControle', ExcluirMoedaControle);
	ExcluirMoedaControle.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance', 'modal', 'ModalFabrica','MoedaServico'];

	function ExcluirMoedaControle($scope, $rootScope, $http, $uibModalInstance, modal, ModalFabrica,MoedaServico) {
		$scope.modal = modal;
		$scope.item = $scope.modal.objeto;

		$scope.excluir = function(){
			$scope.espera = MoedaServico.excluir(
				$scope.item.id,
				function(resposta){
					if(resposta.data){
						new ModalFabrica.abrirModalMensagem(
							'sucesso',
							'Exclusão realizada com sucesso.',
							function(){
								$uibModalInstance.close();
							}
						);
					}
				}, 
				function(resposta){
					console.log('Erro ao excluir Faq', resposta);
				}
			);
		};

		$scope.ok = function(){
			$uibModalInstance.close();
		};

		$scope.fechar = function(){
			$uibModalInstance.dismiss('cancel');
		};

	};
});