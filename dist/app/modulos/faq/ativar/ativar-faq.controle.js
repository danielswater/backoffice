define(['angularAMD','FaqServico'], function(app) {
	app.controller('AtivarFaqControle', AtivarFaqControle);
	AtivarFaqControle.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance','$filter', 'modal', 'ModalFabrica','FaqServico'];

	function AtivarFaqControle($scope, $rootScope, $http, $uibModalInstance,$filter, modal, ModalFabrica,FaqServico) {
		$scope.faq = modal.objeto;
		$scope.ativar = {
			registro : {
				motivo : {
					id : 0,
					descricao : ''
				},
				situacao : {
					id : 0,
					descricao : ''
				}
			}
		};
		$scope.modal = modal.objeto;
		$scope.modal.template = modal.template;
		$scope.modal.titulo = modal.titulo;
		$scope.modal.nome = 'faq';
		$scope.motivosInativacaoFaq = [];
		$scope.espera = FaqServico.listaMotivoInativacao(
			function(resposta){
				if(resposta.data){
					$scope.motivosInativacaoFaq = $filter('orderBy')(resposta.data, 'descricao');
				}
			}, 
			function(resposta){
				console.log('Erro ao carregar as categorias faq', resposta);
			}
		);

		$scope.ativarSubmit = function(){
			if(!$scope.formAtivarFaq.$valid){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Campo(s) obrigatório(s) não preenchido(s). Verifique.',
					function(){ }
				);

				return false;
			}

			if(($scope.ativar.registro.motivo.id == '' || $scope.ativar.registro.motivo.id == undefined || $scope.ativar.registro.motivo.id == null) && $scope.faq.registro.situacao.id == 'A'){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Por favor, selecione ao menos um motivo para inativar.',
					function(){ }
				);

				return false;
			}

			var msg;

			if($scope.faq.registro.situacao.id == 'A'){
				$scope.faq.registro.motivo = $scope.ativar.registro.motivo;
				msg = 'Inativação realizada com sucesso.';
			} else {
				$scope.faq.registro.motivo = null;
				msg = 'Reativação realizada com sucesso.';
			}

			$scope.faq.data_hora = '2017-01-09T17:55:00';
			$scope.faq.autor = 'Luciano Teste 1';

			$scope.espera = FaqServico.editar(
				$scope.faq,
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