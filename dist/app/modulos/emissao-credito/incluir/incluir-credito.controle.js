define(['angularAMD', 'EmissaoCreditoServico','CreditoServico','EmissorServico'], function(app) {
	app.controller('IncluirCreditoControle', IncluirCreditoControle);

	IncluirCreditoControle.$inject = ['$scope', '$uibModalInstance', 'modal','MensagensFabrica','RecursoCredito','EmissaoCreditoServico','CreditoServico','EmissorServico'];
	
	
	function IncluirCreditoControle($scope, $uibModalInstance, modal,MensagensFabrica,RecursoCredito,EmissaoCreditoServico,CreditoServico,EmissorServico) {
		$scope.novaEmissao = new EmissaoCreditoModelo();
		/**
		* Emissor do Crédito
		*/
		$scope.espera = EmissorServico.listarEmissor(
			function(resposta){
				$scope.emissor = resposta.data;
			}, function(resposta) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			}
		);
		/**
		* Nome do Crédito
		*/
		$scope.espera = CreditoServico.listarCreditos(
			function(resposta){
				$scope.nmCreditoEletronico = resposta.data;
			}, function(resposta) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			}
		);
		/**
		* Tipo da Vigência
		*/
		$scope.espera = EmissaoCreditoServico.listarTipoVigencia(
			function(resposta){
				$scope.TipoVigencia = resposta.data;
			}, function(resposta) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			}
		);
		/**
		* Aplicação do Crédito
		*/
		$scope.espera = EmissaoCreditoServico.listarAplicaoCredito(
			function(resposta){
				$scope.AplicacaoCredito = resposta.data;
			}, function(resposta) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			}
		);
		/**
		* Tipo Tarifário
		*/
		$scope.espera = EmissaoCreditoServico.listarTipoTarifario(
			function(resposta){
				$scope.TipoTarifario = resposta.data;
			}, function(resposta) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			}
		);

		// Dual List
		$scope.DualList = function() {
			// Listar Modal
			$scope.espera = EmissaoCreditoServico.listarModal(
				function(resposta){
					// List 1
					$scope.Modal = resposta.data;			
					// List 2
					$scope.novaEmissao.modal = [];
					$scope.sortableOptions = {
						placeholder: "app",
						connectWith: ".apps-container"
					};
					$scope.moveAll = function(from, to,event) {
						
						angular.forEach(from, function(item) {
							to.push(item);
						});
						from.length = 0;
					};
				}, function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
		};

		$scope.modal = modal;
		
		$scope.incluir = function() {
			$scope.novaEmissao.registro = {
				usuarioCriacao: 'SPTRANS'
			};
			// $scope.novaEmissao.emissorCredito = {
			// 	id: 6365
			// };

			$scope.espera = EmissaoCreditoServico.criar(
				$scope.novaEmissao,
				function(resposta) {
					if (!resposta.data.dataExcecao) {
						// sucesso
						$scope.mensagemRetorno = MensagensFabrica.get(resposta.data.codigo);
					} else {
						// erro
						$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
					}
				},
				function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
		}

		$scope.ok = function(form) {
			$uibModalInstance.close();
		}

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}

});