define(['angularAMD'], function(app) {
	app.controller('DetalhesPerguntaControle', DetalhesPerguntaControle);

	DetalhesPerguntaControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'PerguntaServico', 'MensagensFabrica'];

	function DetalhesPerguntaControle($scope, $uibModalInstance, modal, PerguntaServico, MensagensFabrica) {

		$scope.modal = modal;
		$scope.perguntaDetalhes = new PerguntaModelo();


		

		$scope.espera = PerguntaServico.detalhar(
			$scope.modal.objeto.idPergunta,
			function(resposta) {
				$scope.pergunta = resposta.data;
				$scope.perguntaDetalhes = $scope.pergunta.PerguntaView.Pergunta;
				// console.log($scope.perguntaDetalhes);
				if($scope.perguntaDetalhes.ListaResposta){
					$scope.respostaDetalhes = $scope.perguntaDetalhes.ListaResposta.Resposta;
				}
				// console.log($scope.respostaDetalhes);
				$scope.registroDetalhes = $scope.perguntaDetalhes.registro;
				
				// Deletar Lista de Respostas caso o Tipo seja Texto Descritivo
				if($scope.perguntaDetalhes.TipoResposta.id=="4"){
					delete $scope.perguntaDetalhes.ListaResposta;
				}
					



				
				
				
			}, 
			function(resposta) {
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.codigo);
			}
		);


		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

	};

});