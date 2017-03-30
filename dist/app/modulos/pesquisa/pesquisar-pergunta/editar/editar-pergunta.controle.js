define(['angularAMD', 'PerguntaServico'], function(app) {
	app.controller('EditarPerguntaControle', EditarPerguntaControle);
	EditarPerguntaControle.$inject = ['$scope', '$uibModalInstance', 'modal','MensagensFabrica','RecursoCredito','PerguntaServico'];

	function EditarPerguntaControle($scope, $uibModalInstance, modal,MensagensFabrica,RecursoCredito,PerguntaServico) {
		$scope.modal = modal;
		$scope.editar = modal.objeto;
		$scope.perguntaDetalhes = new PerguntaModelo();
		$scope.respostas = [];
		$scope.resposta = [];

		$scope.init = function() {
			/**
			* Tipo Resposta
			*/
			$scope.espera = PerguntaServico.listarTipoResposta(
				function(resposta){
					$scope.TipoResposta = resposta.data;
				}, function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
			/**
			* Categoria da Pergunta
			*/
			$scope.espera = PerguntaServico.listarCategoriaPergunta(
				function(resposta){
					$scope.CategoriaPergunta = resposta.data;
				}, function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
				
			);

			$scope.removeRow = function ($index) {
				console.log("teste")
				$scope.perguntaDetalhes.ListaResposta.Resposta.splice($index, 1);
			};

			
			$scope.espera = PerguntaServico.detalhar(
				$scope.modal.objeto.idPergunta,
				function(resposta) {
					$scope.pergunta = resposta.data;
					$scope.perguntaDetalhes = $scope.pergunta.PerguntaView.Pergunta;
					$scope.tipoRespostaDetalhes = $scope.perguntaDetalhes.TipoResposta;
					$scope.listaRespostaDetalhes = $scope.perguntaDetalhes.ListaResposta;
					// $scope.listaRespostaDetalhes.idResposta = $scope.perguntaDetalhes.ListaResposta.Resposta.idResposta;

					$scope.switchTipo($scope.tipoRespostaDetalhes.id);
					

					if($scope.perguntaDetalhes.ListaResposta){
						var myStringArray = $scope.perguntaDetalhes.ListaResposta.Resposta;
						var respostaLength = myStringArray.length;

						// Quando alteracao ou usuarioAlteracao for null, ele seta um valor
						for (var i = 0; i < respostaLength; i++) {

							// console.log("idResposta ", myStringArray[i].idResposta);
							
							if(myStringArray[i].registro.usuarioAlteracao==null){
								myStringArray[i].registro.usuarioAlteracao ="user fake" ;
							}
							if(myStringArray[i].registro.alteracao==null){
								myStringArray[i].registro.alteracao =new Date();
							}
						}
					}
					
					
					
				},
				function(resposta) {
					$scope.mensagemRetorno = MensagensFabrica.get(resposta.codigo);
				}
			);

			// RN052.03 Cadastro das Respostas conforme o Tipo de Resposta selecionado pag.48
			$scope.min = '';
			$scope.max = '';
			
			$scope.switchTipo = function(id){
				switch (id) {
					// Opção única (lista)
					case 1:
						$scope.min = '4';
						$scope.max = '10';
						break;
					// Opção única (radio button)
					case 2:
						$scope.min = '2';
						$scope.max = '3';
						break;
					// Múltiplas respostas
					case 3:
						$scope.min = '2';
						$scope.max = '10';
						break;
					default:
				}
				
			}
			



			$scope.novaResposta = function(novaResposta){
				// Limpa as respostas quando troca o select
				// delete $scope.perguntaDetalhes.ListaResposta;
				// $scope.perguntaDetalhes.ListaResposta = []

				
				if(novaResposta){
					$scope.switchTipo(novaResposta.id)
				}
			}
			
			$scope.perguntaDetalhes.ListaResposta = {
				Resposta: $scope.respostas
			}

			// $scope.perguntaDetalhes.registro = {
			// 	criacao: new Date(),
			// 	usuarioCriacao: 'SPTRANS',
			// 	alteracao: new Date(),
			// 	usuarioAlteracao: "Renatinho"
			// };

			
			$scope.addRow = function (resposta, id) {
				
				if(resposta){
					// Caso não tenha respostas cadastradas (caso usuário tenha deletado)
					if(!$scope.perguntaDetalhes.ListaResposta){
						$scope.perguntaDetalhes.ListaResposta = {
							Resposta: $scope.respostas
						}
					}
					
					$scope.perguntaDetalhes.ListaResposta.Resposta.push(
						{
							"idPergunta": $scope.perguntaDetalhes.idPergunta,
							"descricaoResposta": resposta,
							registro: {
								criacao: new Date(),
								usuarioCriacao: 'SPTRANS',
								alteracao: new Date(),
								usuarioAlteracao: "user fake"
							}
						});

						$scope.perguntaDetalhes.resposta = []
				}else{
					return false;
				}
					
			};

			
			
			
			
			$scope.editar = function() {
				// $scope.perguntaDetalhes.ListaResposta = {
				// 	Resposta: $scope.respostas
				// }
				
				$scope.mensagemServidor ='' ;
				// if($scope.perguntaDetalhes.ListaResposta==null || $scope.perguntaDetalhes.TipoResposta.id==4){
				// 	delete $scope.perguntaDetalhes.ListaResposta
				// }
				
				$scope.perguntaDetalhes.idPergunta;

				
				
				
				switch ($scope.perguntaDetalhes.TipoResposta.id) {
					// Opção única (lista)
					case 1:
						$scope.min = '4';
						$scope.max = '10';
						break;
					// Opção única (radio button)
					case 2:
						$scope.min = '2';
						$scope.max = '3';
						break;
					// Múltiplas respostas
					case 3:
						$scope.min = '2';
						$scope.max = '10';
						break;
					default:

				}
				if($scope.perguntaDetalhes.ListaResposta){					
					if($scope.perguntaDetalhes.ListaResposta.Resposta.length < $scope.min || $scope.perguntaDetalhes.ListaResposta.Resposta.length > $scope.max){
						$scope.mensagemServidor = {
							descricao: "IMPORTANTE! Mínimo "+$scope.min+ " e no Máximo "+$scope.max+ " respostas para preenchimento."
						};
						return false;
					}
					
				}
				
				delete $scope.perguntaDetalhes.resposta;

				
				
				$scope.perguntaDetalhes.registro = {
					criacao: new Date(),
					usuarioCriacao: 'SPTRANS',
					alteracao: new Date(),
					usuarioAlteracao: "Renatinho"
				};
				
				$scope.espera = PerguntaServico.salvar(
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

			
			
			$scope.fechar = function() {
				$uibModalInstance.dismiss('cancel');
			};
			$scope.ok = function() {
				$uibModalInstance.close();
			};
		};
		$scope.init();
	};
});