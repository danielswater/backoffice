define(['angularAMD', 'sptMensagemErro'], function(app) {
	app.controller('ExcluirPerguntaControle', ExcluirPerguntaControle);

	ExcluirPerguntaControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'PerguntaServico'];

	function ExcluirPerguntaControle($scope, $uibModalInstance, modal, MensagensFabrica, PerguntaServico) {

		$scope.modal = modal;
		
		$scope.espera = PerguntaServico.detalhar(
			modal.objeto.idPergunta,
			function (resposta) {
				$scope.novaPergunta = resposta.data;		
			},
			function (resposta) {
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
		}

		/**
		 * Funcao que exclui a pergunta
		 */
		$scope.excluir = function() {
			$scope.espera = PerguntaServico.deletar(
				$scope.novaPergunta.PerguntaView.Pergunta.idPergunta,
				function (resposta) {
					if (resposta.data.MensagemControle) {
						$scope.mensagemRetorno = {
							descricao: resposta.data.MensagemControle.mensagem
						};
					} else {
						$scope.mensagemServidor = MensagensFabrica.get(999);
					}
				},
				function (resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
		}

	}
});