define(['angularAMD', 'PerguntaServico'], function(app) {
	app.controller('ImportarPerguntaControle', ImportarPerguntaControle);
	ImportarPerguntaControle.$inject = ['$scope', '$uibModalInstance', 'modal','MensagensFabrica','RecursoCredito','PerguntaServico'];

	function ImportarPerguntaControle($scope, $uibModalInstance, modal,MensagensFabrica,RecursoCredito,PerguntaServico) {
		

		$scope.modal = modal;
		$scope.novaPergunta = new PerguntaModelo();
		$scope.selected = [];
		

		/**
		* Categoria da Pergunta
		*/
		$scope.espera = PerguntaServico.listarCategoriaPergunta(
			function (resposta) {
				
				$scope.CategoriaPergunta = resposta.data;
				// console.log($scope.CategoriaPergunta);
			}, function (resposta) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			}
		);

		/**
		* Pesquisar
		*/
		$scope.preFiltrar = function() {
			delete $scope.mensagemServidor;
			$scope.espera = PerguntaServico.filtrar($scope.filtro, callbackSucessoFiltro, callbackErroFiltro);
		};

		/**
		* Funcao callback de sucesso
		*/
		var callbackSucessoFiltro = function(resposta) {
			if (resposta.data.dataExcecao) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			} else {
				if (!angular.isArray(resposta.data)) {
					resposta.data = [resposta.data];
				}
			}


			$scope.filtro.aberto = false;
			$scope.pergunta = resposta.data[0].Pergunta;
		
			
			

			$scope.pergunta.registro = {
				criacao: new Date(),
				usuarioCriacao: 'SPTRANS',
				alteracao: new Date(),
				usuarioAlteracao: "Renatinho"
			};

			


			console.log($scope.pergunta);

			(!$scope.pergunta) ? ($scope.filtro.aberto = true,$scope.mensagemRetorno = MensagensFabrica.get(8)) : $scope.mensagemRetorno = '';
		}
		/**
		 * Funcao callback de erro
		 */
		var callbackErroFiltro = function(resposta) {
			if (resposta.status == 404 && $scope.pergunta.length == 0) {
				$scope.mensagemServidor = MensagensFabrica.get(20008);
			} else {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			}
		}
		
		$scope.importar = function() {

			
			// $scope.pergunta = {
			// 	idPergunta : $scope.pergunta[0].idPergunta,
			// 	idCategoriaDestino : 2,
			// }



			
			$scope.espera = PerguntaServico.importar(
				$scope.pergunta,
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

		$scope.ok = function(form) {
			$uibModalInstance.close();
		}

		$scope.limpar = function(form) {
			console.log("limpar")
		};

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}

});