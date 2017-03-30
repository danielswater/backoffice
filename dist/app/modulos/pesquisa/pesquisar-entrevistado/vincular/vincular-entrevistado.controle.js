define(['angularAMD', 'PerguntaServico'], function(app) {
	app.controller('VincularEntrevistadoControle', VincularEntrevistadoControle);

	VincularEntrevistadoControle.$inject = ['$scope', '$uibModalInstance', 'modal','MensagensFabrica','PerguntaServico'];
		
	function VincularEntrevistadoControle($scope, $uibModalInstance, modal,MensagensFabrica,PerguntaServico) {
		
		$scope.modal = modal;
		/**
		* Categoria da Pergunta do Crédito
		*/
		$scope.espera = PerguntaServico.listarCategoriaPergunta(
			function(resposta){
				$scope.CategoriaPergunta = resposta.data;
			}, function(resposta) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			}
		);
		
		$scope.vincular = function() {
			console.log("vincular");
		}

		
		 

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}

});