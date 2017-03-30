define(['angularAMD', 'PerguntaServico'], function(app) {
	app.controller('IncluirPerguntaControle', IncluirPerguntaControle);
	IncluirPerguntaControle.$inject = ['$scope', '$uibModalInstance', 'modal','MensagensFabrica','RecursoCredito','PerguntaServico'];

	function IncluirPerguntaControle($scope, $uibModalInstance, modal,MensagensFabrica,RecursoCredito,PerguntaServico) {
		$scope.novaPergunta = new PerguntaModelo();
		$scope.respostas = [];

		/**
		* Categoria da Pergunta
		*/
		$scope.espera = PerguntaServico.listarCategoriaPergunta(
			function (resposta) {
				$scope.CategoriaPergunta = resposta.data;
			}, function (resposta) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			}
		);
		/**
		* Tipo Resposta
		*/
		$scope.espera = PerguntaServico.listarTipoResposta(
			function (resposta) {
				$scope.TipoResposta = resposta.data;
				
			}, function (resposta) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			}
		);
		
		// RN052.03 Cadastro das Respostas conforme o Tipo de Resposta selecionado pag.48
		$scope.min = '';
		$scope.max = '';
		$scope.novaResposta = function(novaResposta){
			// Limpa as respostas quando troca o select
			$scope.respostas = [];
			// Regra para cadastro de respostas de acordo com o tipo de resposta
			if(novaResposta){
				switch (novaResposta.id) {
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
				// console.log("minimo "+$scope.min+" | máximo "+$scope.max)
			}
			
		}
		$scope.addRow = function (resposta, id) {
			
			if(resposta){
				$scope.respostas.push(
					{
						"descricaoResposta": resposta,
						registro: {
							criacao: new Date(),
							usuarioCriacao: 'SPTRANS',
							alteracao: new Date(),
							usuarioAlteracao: "user fake"
						}
					});
					$scope.novaPergunta.resposta = [];
			}else{
				return false;
			}
		};

		$scope.removeRow = function ($index) {
			$scope.respostas.splice($index, 1);
 		};

		
		$scope.modal = modal;
		$scope.incluir = function () {			
			
			if($scope.novaPergunta.TipoResposta){
				// Validar Mínimo de Respostas Cadastradas segundo Tipo da Resposta selecionado
				switch ($scope.novaPergunta.TipoResposta.id) {
					// Opção única (lista)
					case 1:
						if($scope.respostas.length<=3){
							console.log("Error");

							var myEl = angular.element( document.querySelector( '#resposta' ) );
							myEl.addClass('border-red');  

							return false;
						}
						break;
					// Opção única (radio button)
					case 2:
						if($scope.respostas.length<=1){
							console.log("Error");
							return false;
						}
						break;
					// Múltiplas respostas
					case 3:
						if($scope.respostas.length<=1){
							console.log("Error");
							return false;
						}
						break;
					default:
				}
			}
			





			$scope.novaPergunta.ListaResposta = {
				Resposta: $scope.respostas
			}

			$scope.novaPergunta.registro = {
				criacao: new Date(),
				usuarioCriacao: 'SPTRANS',
				alteracao: new Date(),
				usuarioAlteracao: "Renatinho"
			};
			if(!$scope.novaPergunta.textoOrientacao)
				$scope.novaPergunta.textoOrientacao=' ';
				
			
				
			// console.log($scope.novaPergunta.textoOrientacao)
			delete $scope.novaPergunta.idPergunta;

			$scope.espera = PerguntaServico.criar(
				$scope.novaPergunta,
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

		$scope.ok = function (form) {
			$uibModalInstance.close();
		}

		$scope.fechar = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}

});