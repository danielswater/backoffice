/**
 * TODO: listaGruposUsuarioSistema
 */
define(['angularAMD', 'dirPagination','sptBotaoAlternar','MenuPaginaPrincipalServico'], function(app) {
	app.controller('MenuPaginaPrincipalControle', MenuPaginaPrincipalControle);

	MenuPaginaPrincipalControle.$inject = ['$scope', '$window', '$rootScope', '$uibModal','ModalFabrica','MensagensFabrica','MenuPaginaPrincipalServico']

	function MenuPaginaPrincipalControle ($scope, $window, $rootScope, $uibModal,ModalFabrica,MensagensFabrica,MenuPaginaPrincipalServico) {
		$scope.filtro = {
			aberto:true,
			nome:null,
			grupoId:null,
			agrupamentoId:null,
			pagina:null
		};

		$scope.paginas = [];

		$scope.espera = MenuPaginaPrincipalServico.listarGruposUsuario(
			function(resposta){
				$scope.gruposUsuarioSistema = resposta.data;
				console.log('$scope.gruposUsuarioSistema',$scope.gruposUsuarioSistema);
				
			}
		);

		$scope.espera = MenuPaginaPrincipalServico.listarPaginas(
			function(resposta){
				if(resposta.data){
					$scope.paginas = resposta.data;
				}
			}, 
			function(resposta){
				console.log('Erro ao carregar', resposta);
			}
		);

		$scope.preFiltrar = function() {
			if($scope.filtro.grupoId == '' || $scope.filtro.grupoId == undefined || $scope.filtro.grupoId == null || $scope.filtro.agrupamentoId == '' || $scope.filtro.agrupamentoId == undefined || $scope.filtro.agrupamentoId == null){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Você deve ao menos escolher um dos filtros para pesquisar',
					function(){ }
				);

				return false;
			}

			$scope.filtroMenuPaginaPrincipal = {
				nome : $scope.filtro.nome ? $scope.filtro.nome : null,
				grupoId : $scope.filtro.nome ? $scope.filtro.grupoId.id : null,
				agrupamentoId : $scope.filtro.nome ? $scope.filtro.agrupamentoId.id : null
			}

			$scope.espera = MenuPaginaPrincipalServico.filtrar(
				$scope.filtroMenuPaginaPrincipal,
				function(resposta){
					$scope.menusPaginaPrincipal = [];

					if(resposta.data.dataExcecao){
						$scope.mensagemServidor = {
							descricao : resposta.data.mensagem
						}
					} else {
						$scope.menusPaginaPrincipal = resposta.data;
					}
				},
				function(resposta){
					console.log('Erro ao carregar', resposta);
				}
			);
		};

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};
	}
});
