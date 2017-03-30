define(['angularAMD'], function(app) {
	app.controller('DetalhesSamControle', DetalhesSamControle);

	DetalhesSamControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'SamServico', 'MensagensFabrica'];

	function DetalhesSamControle($scope, $uibModalInstance, modal, SamServico, MensagensFabrica) {

		$scope.modal = modal;
		$scope.modal.titulo = "Detalhes do SAM";
		$scope.sam = new SamModelo();

		$scope.espera = SamServico.detalhar(
			$scope.modal.objeto.id,
			function(resposta) {
				$scope.sam = resposta.data;
			}, 
			function(resposta) {
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
			}
		);

		/**
		 * Funcao do botao fechar da modal
		 */
		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		/**
		 * Funcao do botao ok da modal
		 */
		$scope.ok = function() {
			$uibModalInstance.close();
		};

	};

});