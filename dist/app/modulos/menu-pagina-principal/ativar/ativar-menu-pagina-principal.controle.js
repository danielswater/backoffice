define(['angularAMD','MenuPaginaPrincipalServico'], function(app) {
	app.controller('AtivarMenuPaginaPrincipalControle', AtivarMenuPaginaPrincipalControle);
	AtivarMenuPaginaPrincipalControle.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance', 'modal', 'ModalFabrica','MenuPaginaPrincipalServico'];

	function AtivarMenuPaginaPrincipalControle($scope, $rootScope, $http, $uibModalInstance, modal, ModalFabrica,MenuPaginaPrincipalServico) {
		$scope.menupaginaprincipal = modal.objeto;
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
		$scope.modal.nome = 'menu-pagina-principal';
		$scope.motivosInativacaoMenuPaginaPrincipal = [];
		$scope.espera = MenuPaginaPrincipalServico.listaMotivoInativacao(
			function(resposta){
				if(resposta.data){
					$scope.motivosInativacaoMenuPaginaPrincipal = $filter('orderBy')(resposta.data, 'descricao');
				}
			}, 
			function(resposta){
				console.log('Erro ao carregar', resposta);
			}
		);

		$scope.ativarSubmit = function(){
			if(!$scope.formMenuPaginaPrincipal.$valid){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Campo(s) obrigatório(s) não preenchido(s). Verifique.',
					function(){ }
				);

				return false;
			}

			if(($scope.ativar.registro.motivo.id == '' || $scope.ativar.registro.motivo.id == undefined || $scope.ativar.registro.motivo.id == null) && $scope.menupaginaprincipal.registro.situacao.id == 'A'){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Por favor, selecione ao menos um motivo para inativar.',
					function(){ }
				);

				return false;
			}

			var msg;

			if($scope.menupaginaprincipal.registro.situacao.id == 'A'){
				$scope.menupaginaprincipal.registro.motivo = $scope.ativar.registro.motivo;
				msg = 'Inativação realizada com sucesso.';
			} else {
				$scope.menupaginaprincipal.registro.motivo = null;
				msg = 'Reativação realizada com sucesso.';
			}

			$scope.menupaginaprincipal.data_hora = '2017-01-09T17:55:00';
			$scope.menupaginaprincipal.autor = 'Luciano Teste 1';

			$scope.espera = MenuPaginaPrincipalServico.editar(
				$scope.menupaginaprincipal,
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

		$scope.updateLista = function(){
			var itens = $rootScope.menuprincipals;
			for(var i=0 ; i < itens.length ; i++){
				var ord = i+1;
				$rootScope.menuprincipals[i] = {
					ordenacao : ord,
					nomeMenuPrincipal : itens[i].nomeMenuPrincipal,
					grupoUsuarioSistema : itens[i].grupoUsuarioSistema,
					imagem: itens[i].imagem,
					descricao : itens[i].descricao,
					corFundo : itens[i].corFundo,
					corFonte : itens[i].corFonte,
					situacao : itens[i].situacao,
				};
			}
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