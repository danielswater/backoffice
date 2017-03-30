define(['angularAMD', 'dirPagination','InformacoesServico'], function(app) {
	app.controller('InformacoesControle', InformacoesControle);

	InformacoesControle.$inject = ['$scope','$window','$rootScope','$uibModal','ModalFabrica','$filter','MensagensFabrica','InformacoesServico']

	function InformacoesControle ($scope,$window,$rootScope,$uibModal,ModalFabrica,$filter,MensagensFabrica,InformacoesServico) {
		$scope.categoriasInformacoes = [];
		$scope.informacoes = [];
		$scope.filtro = {
			registro : [],
			flagDestaque : 'N',
			aberto: true
		};

		$scope.formatData = function(data){
			if(data == 'Atual') return data;
			else {
				return data = moment(data).format('DD/MM/YYYY');
			}
		};

		$scope.espera = InformacoesServico.listarMotivosInformacoes(
			function(resposta){
				if(resposta.data){
					$scope.motivos = $filter('orderBy')(resposta.data, 'descricao', true);
				}
			}, 
			function(resposta){
				console.log('Erro ao carregar', resposta);
			}
		);

		$scope.espera = InformacoesServico.listarCategoriasInformacoes(
			function(resposta){
				if(resposta.data){
					$scope.categoriasListSelectField = $filter('orderBy')(resposta.data, 'descricao');
				}
			}, 
			function(resposta){
				console.log('Erro ao carregar', resposta);
			}
		);

		$scope.erroFiltro = false;
		$scope.preFiltrar = function() {
 			if(
				($scope.filtro.categoria == '' || $scope.filtro.categoria == undefined || $scope.filtro.categoria == null) && 
				($scope.filtro.tituloConteudo == '' || $scope.filtro.tituloConteudo == undefined || $scope.filtro.tituloConteudo == null) && 
				($scope.filtro.registro.motivo == '' || $scope.filtro.registro.motivo == undefined || $scope.filtro.registro.motivo == null) && 
				($scope.filtro.flagDestaque == '' || $scope.filtro.flagDestaque == undefined || $scope.filtro.flagDestaque == null)
				 ){
				$scope.erroFiltro = true;

				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Preencha ao menos um dos campos indicados para realizar a pesquisa',
					function(){}
				);
			} else {
				$scope.informacoes = [];
				$scope.mensagemServidor = [];

				$scope.informacoesFiltro = {
					categoria : $scope.filtro.categoria ? $scope.filtro.categoria : null,
					tituloConteudo : $scope.filtro.tituloConteudo  ?  $scope.filtro.tituloConteudo : null,
					registro : {
						motivo : $scope.filtro.registro.motivo ? $scope.filtro.registro.motivo : null,
					},
					flagDestaque : $scope.filtro.flagDestaque ? $scope.filtro.flagDestaque == 'A' ? null : $scope.filtro.flagDestaque : null
				};

				$scope.espera = InformacoesServico.filtrar(
					$scope.informacoesFiltro,
					function(resposta){
						$scope.informacoes = [];

						if(resposta.data.dataExcecao){
							$scope.mensagemServidor = {
								descricao : resposta.data.mensagem
							}
						} else {
							$scope.informacoes = resposta.data;
						}
					},
					function(resposta){
						console.log('Erro ao carregar', resposta);
					}
				);
			}
		};

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			$scope.filtro = {
				registro : [],
				flagDestaque : 'N',
				tituloConteudo : '',
				aberto: true
			};
			$scope.mensagemServidor = '';
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
			$scope.categoriasInformacoes = $scope.categoriasBkp;
			$scope.informacoes = [];
			$scope.mensagemServidor = [];
		};

	}
});
