(function() {

	'use strict';

	define(['angularAMD', 'dirPagination', './recurso.js'], function(app) {

		app.controller('PesquisaFormularioAprovacaoControle', PesquisaFormularioAprovacaoControle)
		
		PesquisaFormularioAprovacaoControle.$inject = ['$scope', '$rootScope', '$uibModal','FiltroRequisicao','RecursoCredito',
			 'MensagensFabrica'
		]
		
		function PesquisaFormularioAprovacaoControle ($scope, $rootScope, $uibModal,FiltroRequisicao,RecursoCredito,
		 MensagensFabrica
            ) {

			
			$scope.filtro = {
				aberto: true
			};

			$scope.comboFiltros = [{
				descricao: 'Todos(as)'
			}]
			
            $scope.pesquisa_formulario = [
				{
					formulario : 'Pesquisa de linhas Novembro/2015 ',
					grupo : "Conselheiros Zona Norte",
					periodo: "01/01/2016 à 30/02/2017",
					situacao: "Aprovado"
				},
				{
					formulario : 'Pesquisa de linhas Novembro/2016 ',
					grupo : "Conselheiros Zona Sul",
					periodo: "15/01/2016 à 14/02/2017",
					situacao: "Congelado"
				},
				{
					formulario : 'Pesquisa de linhas Dezembro/2016',
					grupo : "Conselheiros Zona Norte",
					periodo: "10/10/2016 à 25/08/2017",
					situacao: "Pendente de Aprovação"
				},
				{
					formulario : 'Pesquisa de linhas Janeiro/2017',
					grupo : "Conselheiros Zona Oeste?",
					periodo: "30/05/2016 à 20/08/2017",
					situacao: "Salvo com Rascunho"
				},
			];


		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

			



            $scope.preFiltrar = function() {
				// $scope.pesquisa = [];
				delete $scope.mensagemServidor;

				if($scope.filtro.pesquisa == null && $scope.filtro.grupo == null ) {
					console.log('É necessário o preenchimento de pelo menos um campo');
					$scope.mensagemControle = {
						"tipo" : "ERRO",
						"class": "mensagem-erro",
						"data" : {
							"mensagem" : "É necessário o preenchimento de pelo menos um campo"
						}
					};
				}
				
				
				
			// 	$scope.filtrar(new FiltroRequisicao);
			};
            // $scope.filtrar = function(filtroRequisicao) {
			// 	filtroRequisicao = _.merge(filtroRequisicao, $scope.filtroValor);

			// 	$scope.espera = RecursoCredito.query(
			// 		filtroRequisicao,
			// 		function(resposta) {
			// 			callbackSucessoFiltro(resposta);
			// 		},
			// 		function(resposta) {
			// 			callbackErroFiltro(resposta);
			// 		}
			// 	);
			// };

            // var callbackSucessoFiltro = function(resposta) {
			// 	if (!resposta.data.length) {
			// 		resposta.data = [resposta.data.CreditoView.Credito];
			// 	}
			// 	$scope.credito = $scope.credito.concat(resposta.data);
			// 	$scope.filtro.aberto = false;
			// }

			// var callbackErroFiltro = function(resposta) {
			// 	if (resposta.status == 404 && $scope.credito.length == 0) {
			// 		$scope.mensagemServidor = MensagensFabrica.get(20008);
			// 	} else {
			// 		$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
			// 	}
			// }

			$scope.limpar = function() {
                console.log('limpar');
				$scope.filtro.formulario = '';
				$scope.filtro.grupo = '';
				$scope.filtro.situacao = '';
                $scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
			};
		}
	});
})();