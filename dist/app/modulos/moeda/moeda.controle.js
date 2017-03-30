define(['angularAMD','dirPagination','sptBotaoAlternar','MoedaServico'], function(app) {
	app.controller('MoedaControle', MoedaControle);

	MoedaControle.$inject = ['$scope', '$window', '$rootScope', '$uibModal','ModalFabrica','$filter','MensagensFabrica','MoedaServico','$timeout'];

	function MoedaControle ($scope, $window, $rootScope, $uibModal,ModalFabrica,$filter,MensagensFabrica,MoedaServico,$timeout) {
		$scope.filtro = {
			aberto: true
		};

		$scope.formatData = function(data){
			if(data == 'Atual') return data;
			else {
				return data = moment(data).format('DD/MM/YYYY');
			}
		};

		$scope.erroFiltro = false;
		$scope.preFiltrar = function() {
			console.log('$scope.filtro',$scope.filtro);
			
			if($scope.filtro.nome == '' && $scope.filtro.sigla == '' && $scope.filtro.dataVigenciaInicial == '' && $scope.filtro.dataVigenciaFinal == ''){
				$scope.erroFiltro = true;

				new ModalFabrica.abrirModalMensagem(
					'sucesso',
					'Preencha ao menos um dos campos indicados para realizar a pesquisa',
					function(){
						$uibModalInstance.close();
					}
				);
			} else {
				$scope.moedas = [];
				$scope.espera = MoedaServico.filtrar(
					$scope.filtro,
					function(resposta){
						$scope.moedas = resposta.data;
						console.log('$scope.moedas',$scope.moedas);
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
				aberto: true
			};
			$scope.mensagemServidor = '';
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};

	}
});
