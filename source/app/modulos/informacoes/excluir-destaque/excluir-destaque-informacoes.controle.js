define(['angularAMD','InformacoesServico'], function(app) {
	app.controller('ExcluirDestaqueInformacoesControle', ExcluirDestaqueInformacoesControle);
	ExcluirDestaqueInformacoesControle.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance', 'modal', 'ModalFabrica','InformacoesServico', 'MensagensFabrica'];

	function ExcluirDestaqueInformacoesControle($scope, $rootScope, $http, $uibModalInstance, modal, ModalFabrica,InformacoesServico,MensagensFabrica) {
		$scope.modal = modal;
		$scope.informacao = $scope.modal.objeto;
		$scope.informacao.flagDestaque = 'N';

		$scope.excluir = function(){
			$scope.espera = InformacoesServico.editar(
				$scope.informacao,
				function(resposta){
					var mensagem = MensagensFabrica.get(resposta.data.codigo);
					console.log('mensagem',mensagem);

					new ModalFabrica.abrirModalMensagem(
						mensagem.tipo == 'ERRO' ? 'erro' : 'sucesso',
						mensagem.descricao,
						function(){
							$uibModalInstance.close();
						}
					);

					return false;
				}, 
				function(resposta){
					new ModalFabrica.abrirModalMensagem(
						'erro',
						resposta.mensagem,
						function(){
							console.log('resposta',resposta);
						}
					);

					return false;
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