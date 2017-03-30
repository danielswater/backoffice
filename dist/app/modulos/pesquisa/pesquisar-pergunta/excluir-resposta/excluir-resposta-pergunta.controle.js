define(['angularAMD', 'sptMensagemErro'], function(app) {
	app.controller('ExcluirRespostaPerguntaControle', ExcluirRespostaPerguntaControle);

	ExcluirRespostaPerguntaControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'PerguntaServico'];

	function ExcluirRespostaPerguntaControle($scope, $uibModalInstance, modal, MensagensFabrica, PerguntaServico) {

		$scope.modal = modal;
		$scope.resposta = modal.objeto;


		/**
		 * Funcao que exclui a resposta
		 */
		$scope.excluir = function($index) {

			console.log($scope.resposta.idResposta, " Excluir");
			
			// $scope.resposta.splice($index, 1);
			// Guardar em um array o id da resposta a ser excluído ao clicar em Salvar






			$scope.espera = PerguntaServico.deletarResposta(
				$scope.resposta,
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


	}
});