define(['angularAMD', 'sptMensagemErro'], function(app) {
	app.controller('AtivarPerguntaControle', AtivarPerguntaControle);

	AtivarPerguntaControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'PerguntaServico'];

	function AtivarPerguntaControle($scope, $uibModalInstance, modal, MensagensFabrica, PerguntaServico) {
		$scope.modal = modal;
		$scope.motivoLista = [];
		
		$scope.perguntaDetalhes = new PerguntaModelo();

		$scope.espera = PerguntaServico.detalhar(
			$scope.modal.objeto.idPergunta,
			function(resposta) {

				$scope.pergunta = resposta.data;
				$scope.perguntaDetalhes = $scope.pergunta.PerguntaView.Pergunta;
				
				console.log($scope.modal.objeto.registro.Situacao.id)

				if ($scope.modal.objeto.registro.Situacao.id == 'A') {
					$scope.espera = PerguntaServico.listarMotivoInativacao(
						function(resposta) {
							$scope.motivoLista = resposta.data;
						}, function(resposta) {
							$scope.mensagemRetorno = MensagensFabrica.get(resposta.codigo);
						}
					);
				}
			}, 
			function(resposta) {
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.codigo);
			}
		);
		

		$scope.ok = function() {
			$uibModalInstance.close();
		}

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};
		
		
		
		$scope.ativar = function() {
			delete $scope.perguntaDetalhes.ListaResposta
			// if($scope.perguntaDetalhes.ListaResposta==null){
			// 	delete $scope.perguntaDetalhes.ListaResposta
			// }
			// TODO: Pegar usuario logado
			
			




			$scope.perguntaDetalhes.registro.criacao = new Date()
			$scope.perguntaDetalhes.registro.usuarioCriacao = 'SPTRANS',
			$scope.perguntaDetalhes.registro.alteracao = new Date()
			$scope.perguntaDetalhes.registro.usuarioAlteracao = 'Renatinho'


			
			// Inativar
			if($scope.perguntaDetalhes.registro.Situacao.id =='A'){
				
				$scope.perguntaDetalhes.registro.Situacao.id = 'I';
				$scope.perguntaDetalhes.registro.Situacao.descricao = 'Inativo';
				$scope.perguntaDetalhes.registro.Motivo = $scope.perguntaDetalhes.motivo;
				
				delete $scope.perguntaDetalhes.motivo;
				$scope.espera = PerguntaServico.inativar(
					$scope.perguntaDetalhes,
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

			// Ativar
			}else{
				$scope.perguntaDetalhes.registro.Situacao.id = 'A';
				$scope.perguntaDetalhes.registro.Situacao.descricao = 'Ativo';
				$scope.perguntaDetalhes.registro.Motivo.id = 149;
				$scope.perguntaDetalhes.registro.Motivo.descricao = 'Ativo';
				
				$scope.espera = PerguntaServico.ativar(
					$scope.perguntaDetalhes,
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
		
	}
});