define(['angularAMD','InformacoesServico'], function(app) {
	app.controller('ExcluirInformacoesControle', ExcluirInformacoesControle);
	ExcluirInformacoesControle.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance', 'modal', 'ModalFabrica','InformacoesServico'];

	function ExcluirInformacoesControle($scope, $rootScope, $http, $uibModalInstance, modal, ModalFabrica,InformacoesServico) {
		$scope.modal = modal;
		$scope.item = $scope.modal.objeto;

		$scope.excluir = function(){
			$scope.espera = InformacoesServico.excluir(
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
					console.log('Erro ao excluir Informacoes', resposta);
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