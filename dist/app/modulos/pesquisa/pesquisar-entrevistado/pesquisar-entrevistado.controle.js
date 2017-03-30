(function() {

	'use strict';

	define(['angularAMD', 'dirPagination','PerguntaServico', './recurso.js'], function(app) {

		app.controller('PesquisaEntrevistadoControle', PesquisaEntrevistadoControle)
		
		PesquisaEntrevistadoControle.$inject = ['$scope', '$rootScope', '$uibModal','FiltroRequisicao','RecursoPesquisa','MensagensFabrica','PerguntaServico']

		function PesquisaEntrevistadoControle ($scope, $rootScope, $uibModal,FiltroRequisicao,RecursoPesquisa,MensagensFabrica,PerguntaServico) {

			$scope.filtro = {
				aberto: true
			};

			/**
		 	* Categoria da Pergunta do Crédito
			*/
			$scope.espera = PerguntaServico.listarCategoriaPergunta(
				function(resposta){
					$scope.CategoriaPergunta = resposta.data;
				}, function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);

            
		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

            $scope.preFiltrar = function() {
				console.log("Pre Filtrar");
				// $scope.pesquisa = [];
				// delete $scope.mensagemServidor;
				// delete $scope.mensagemControle;

				// if($scope.filtro.CategoriaPergunta == null && $scope.filtro.pergunta == null ) {
				// 	$scope.mensagemControle = {
				// 		"tipo" : "ERRO",
				// 		"class": "mensagem-erro",
				// 		"data" : {
				// 			"mensagem" : "É necessário o preenchimento de pelo menos um campo"
				// 		}
				// 	};
				// }
				
			};

			$scope.limpar = function() {
                $scope.filtro.pergunta = '';
				$scope.filtro.CategoriaPergunta = '';
				$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
			};
		}
	});
})();
// (function() {

// 	'use strict';

// 	define(['angularAMD', 'dirPagination', './recurso.js'], function(app) {

// 		app.controller('PesquisaEntrevistadoControle', PesquisaEntrevistadoControle)
// 		// -- AngularUI implementation
// 		.filter('unique', function () {
// 			return function(collection, keyname) {
// 				var output = [], 
// 					keys = [];
// 				angular.forEach(collection, function(item) {
// 					var key = item[keyname];
// 					if(keys.indexOf(key) === -1) {
// 						keys.push(key); 
// 						output.push(item);
// 					}
// 				});
// 				return output;
// 			};
// 		});


// 		PesquisaEntrevistadoControle.$inject = ['$scope', '$rootScope', '$uibModal','FiltroRequisicao','RecursoCredito','MensagensFabrica']
		

// 		function PesquisaEntrevistadoControle ($scope, $rootScope, $uibModal,FiltroRequisicao,RecursoCredito,
// 		 MensagensFabrica
//             ) {
			
// 			$scope.filtro = {
// 				aberto: true
// 			};

// 			$scope.comboFiltros = [{
// 				descricao: 'Todos(as)'
// 			}]

// 			$scope.pesquisa = [
// 				{
// 					grupo : 'Heavy Metal',
// 					cpf : "12345678901",
// 					nome: "James Hetfield",
// 				},
// 				{
// 					grupo : 'MPB',
// 					cpf : "92345678901",
// 					nome: "Tim Maia",
// 				},
// 				{
// 					grupo : 'Outros',
// 					cpf : "82345678901",
// 					nome: "Caetano Veloso",
// 				}
// 			];
			
// 		$scope.fechar = function() {
// 			$uibModalInstance.dismiss('cancel');
// 		};

			



//             $scope.preFiltrar = function() {
// 				// $scope.pesquisa = [];
// 				delete $scope.mensagemServidor;

// 				if($scope.filtro.pesquisa == null && $scope.filtro.pergunta == null ) {
// 					console.log('É necessário o preenchimento de pelo menos um campo');
// 					$scope.mensagemControle = {
// 						"tipo" : "ERRO",
// 						"class": "mensagem-erro",
// 						"data" : {
// 							"mensagem" : "É necessário o preenchimento de pelo menos um campo"
// 						}
// 					};
// 				}
				
// 			};

// 			$scope.limpar = function() {
//                 console.log('limpar');
// 				$scope.filtro.grupo = '';
// 				$scope.filtro.entrevistado = '';
// 			};
// 		}
// 	});
// })();