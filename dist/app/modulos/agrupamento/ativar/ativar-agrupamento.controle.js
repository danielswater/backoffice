define(['angularAMD','AgrupamentoServico'], function(app) {
	app.controller('AtivarAgrupamentoControle', AtivarAgrupamentoControle);
	AtivarAgrupamentoControle.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance', 'modal', 'ModalFabrica','AgrupamentoServico'];

	function AtivarAgrupamentoControle($scope, $rootScope, $http, $uibModalInstance, modal, ModalFabrica,AgrupamentoServico) {
		$scope.agrupamento = modal.objeto;
		$scope.modal = modal.objeto;
		$scope.modal.template = modal.template;
		$scope.modal.titulo = modal.titulo;
		$scope.modal.nome = 'agrupamento';

		$scope.updateLista = function(){
			var itens = $rootScope.agrupamentos;
			for(var i=0 ; i < itens.length ; i++){
				var ord = i+1;
				$rootScope.agrupamentos[i] = {
					ordenacao : ord,
					nomeAgrupamento : itens[i].nomeAgrupamento,
					grupoUsuarioSistema : itens[i].grupoUsuarioSistema,
					imagem: itens[i].imagem,
					descricao : itens[i].descricao,
					corFundo : itens[i].corFundo,
					corFonte : itens[i].corFonte,
					situacao : itens[i].situacao,
				};
			}
		};

		$scope.ativarSubmit = function(){
			if(!$scope.formAtivarAgrupamento.$valid){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Campo(s) obrigatório(s) não preenchido(s). Verifique.',
					function(){ }
				);

				return false;
			}

			if(($scope.agrupamento.registro.motivo.id == '' || $scope.agrupamento.registro.motivo.id == undefined || $scope.agrupamento.registro.motivo.id == null) && $scope.agrupamento.registro.situacao.id == 'A'){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Por favor, selecione ao menos um motivo para inativar.',
					function(){ }
				);

				return false;
			}
			
			var msg;

			if($scope.agrupamento.registro.situacao.id == 'A'){
				$scope.agrupamento.registro.motivo = $scope.ativar.registro.motivo;
				msg = 'Inativação realizada com sucesso.';
			} else {
				$scope.agrupamento.registro.motivo = null;
				msg = 'Reativação realizada com sucesso.';
			}
			
			$scope.agrupamento.data_hora = '2017-01-09T17:55:00';
			$scope.agrupamento.autor = 'Luciano Teste 1';

			$scope.espera = AgrupamentoServico.editar(
				$scope.agrupamento,
				function(resposta){
					if(resposta.data){
						new ModalFabrica.abrirModalMensagem(
							'sucesso',
							resposta.data.mensagem,
							function(){
								$uibModalInstance.close();
							}
						);
					}
				}, 
				function(resposta){
					new ModalFabrica.abrirModalMensagem(
						'erro',
						resposta.mensagem,
						function(){ }
					);
					
					return false;
				}
			);

			$scope.updateLista();
		};

		$scope.ok = function(){
			$uibModalInstance.close();
		};

		$scope.fechar = function(){
			$uibModalInstance.dismiss('cancel');
		};

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};
	};
});