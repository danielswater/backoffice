define(['angularAMD','FaqServico'], function(app) {
	app.controller('ExcluirFaqControle', ExcluirFaqControle);
	ExcluirFaqControle.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance', 'modal', 'ModalFabrica','FaqServico'];

	function ExcluirFaqControle($scope, $rootScope, $http, $uibModalInstance, modal, ModalFabrica,FaqServico) {
		$scope.modal = modal;
		$scope.item = $scope.modal.objeto;

		$scope.excluir = function(){
			$scope.espera = FaqServico.excluir(
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