define(['angularAMD'], function(app) {
	app.controller('EditarCreditoControle', EditarCreditoControle);

	EditarCreditoControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica','EmissaoCreditoServico'];

	function EditarCreditoControle($scope, $uibModalInstance, modal, MensagensFabrica,EmissaoCreditoServico) {

		$scope.modal = modal;
		$scope.editar = modal.objeto;
		$scope.emissao = new EmissaoCreditoModelo();


		$scope.espera = EmissaoCreditoServico.detalhar(
			$scope.modal.objeto.id,
			function(resposta) {
				$scope.emissao = resposta.data;
				
				var list1 = $scope.Modal;
				var list2 = $scope.emissao.modal;
				
				// Compara os modais das Listas 1 e 2 e remove valores duplicados
				function remove_duplicates(list1, list2) {
					for (var i = 0, len = list1.length; i < len; i++) { 
						for (var j = 0, len2 = list2.length; j < len2; j++) { 
							if (list1[i].descricao === list2[j].descricao) {
								list2.splice(j, 1);
								len2=list2.length;
							}
						}
					}
				}
				if($scope.emissao.modal)remove_duplicates(list2,list1)
			}, 
			function(resposta) {
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.codigo);
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
		// Dual List
		$scope.DualList = function() {
			// Listar Modal
			$scope.espera = EmissaoCreditoServico.listarModal(
				function(resposta){
					$scope.Modal = resposta.data;
					$scope.emissao.modal = [];
					
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
		$scope.editar = function() {
			$scope.emissao.registro = {
				usuarioAlteracao: 'SPTRANS'
			};
			$scope.espera = EmissaoCreditoServico.salvar(
				$scope.emissao,
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
		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};
		$scope.ok = function() {
			$uibModalInstance.close();
		};
	};
});