/**
 * TODO: listaGruposUsuarioSistema
 */
define(['angularAMD', 'dirPagination', 'sptBotaoAlternar', 'AgrupamentoServico'], function(app) {
	app.controller('AgrupamentoControle', AgrupamentoControle);

	AgrupamentoControle.$inject = ['$scope', '$window', '$rootScope', '$uibModal','ModalFabrica','MensagensFabrica', 'AgrupamentoServico']

	function AgrupamentoControle ($scope, $window, $rootScope, $uibModal,ModalFabrica,MensagensFabrica,AgrupamentoServico) {
		$scope.filtro = {
			aberto: true,
			nome:null,
			grupoId:null
		};
		
		$rootScope.agrupamentos=[];

		$scope.espera = AgrupamentoServico.listarGruposUsuario(
			function(resposta){
				$scope.gruposUsuarioSistema = resposta.data;
				console.log('$scope.gruposUsuarioSistema',$scope.gruposUsuarioSistema);
				
			}
		);

		$scope.sortableOptions = {
			update: function(e, ui) {
				console.log('$rootScope.agrupamentos',$rootScope.agrupamentos);
				$scope.reordenar();
				console.log('e',e);
				console.log('ui',ui);
			},
			// axis: 'x'
		};

		$scope.reordenar = function(){
			for(var i=0;i<$rootScope.agrupamentos.length;i++){
				// console.log('$rootScope.agrupamentos[i].ordenacao ANTES',$rootScope.agrupamentos[i].ordenacao);
				$rootScope.agrupamentos[i].ordenacao = parseInt(i)+1;
				// console.log('$rootScope.agrupamentos[i].ordenacao DEPOIS',$rootScope.agrupamentos[i].ordenacao);
			}
		};

		$scope.preFiltrar = function() {
			if($scope.filtro.nome == '' && $scope.filtro.grupoUsuarioSistema == ''){
				new ModalFabrica.abrirModalMensagem(
					'sucesso',
					'Você deve ao menos escolher um dos filtros para pesquisar',
					function(){
						$uibModalInstance.close();
					}
				);
			}
		};

		$scope.espera = AgrupamentoServico.filtrar(
			$scope.filtro,
			function(resposta){
				$rootScope.agrupamentos = [];

				if(resposta.data.dataExcecao){
					$scope.mensagemServidor = {
						descricao : resposta.data.mensagem
					}
				} else {
					$rootScope.agrupamentos = resposta.data;
				}
			},
			function(resposta){
				console.log('Erro ao carregar', resposta);
			}
		);

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			$scope.mensagemServidor = '';
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};
	}
});