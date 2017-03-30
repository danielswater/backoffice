(function() {

	'use strict';

	define(['angularAMD', 'sptBotaoAlternar', 'PerfilUsuarioServico', 'dirPagination'], function(app) {

		app.controller('PerfilUsuarioControle', PerfilUsuarioControle);

		PerfilUsuarioControle.$injector = ['$scope', '$rootScope', '$uibModal',
		'FiltroRequisicao',
		'MensagensFabrica',
		'PerfilUsuarioServico'
	]

	function PerfilUsuarioControle($scope, $rootScope, $uibModal,
		FiltroRequisicao,MensagensFabrica, PerfilUsuarioServico) {

			$scope.perfis=[];
			$scope.filtro = {
				aberto: true
			};


			// mensagem de erro
			$scope.preFiltrar = function(){
				$scope.perfis=[];
				console.log('pre-func');
				if(
				$scope.filtro.nomePerfil == null || $scope.filtro.nomePerfil == ''
				&& $scope.filtro.grupoPerfil == null || $scope.filtro.grupoPerfil == ''
				&& $scope.filtro.nomeExibicaoPerfil == null || $scope.filtro.nomeExibicaoPerfil == ''
				&& $scope.filtro.politicaPublica == null || $scope.filtro.politicaPublica == ''
				&& $scope.filtro.situacaoCadastral == null || $scope.filtro.situacaoCadastral == ''
			)
				{
					console.log('É necessário o preenchimento de pelo menos um campo');
					$scope.mensagemControle = {
						"tipo" : "ERRO",
						"class": "mensagem-erro",
						"data" : {
							"mensagem" : "É necessário o preenchimento de pelo menos um campo"
						}
					};
					return false
				}
				// if($scope.filtro.nomeExibicaoPerfil && $scope.filtro.nomeExibicaoPerfil.length <= 2){
				// 	console.log('menor que 3');
				// 	$scope.mensagemControle = {
				// 		"tipo" : "ERRO",
				// 		"class": "mensagem-erro",
				// 		"data" : {
				// 			"mensagem" : "O nome deve possuir pelo menos 3 caracteres (letras e/ou números)."
				// 		}
				// 	};
				// 	return false
				// }
				// if($scope.filtro.nomeGrupoPerfil && $scope.filtro.nomeGrupoPerfil.length <= 2){
				// 	console.log('menor que 3');
				// 	$scope.mensagemControle = {
				// 		"tipo" : "ERRO",
				// 		"class": "mensagem-erro",
				// 		"data" : {
				// 			"mensagem" : "O nome deve possuir pelo menos 3 caracteres (letras e/ou números)."
				// 		}
				// 	};
				// 	return false
				// }
				PerfilUsuarioServico.filtrar(
					$scope.filtro,
					function(resultado){
						console.log(resultado);

						if(resultado.data.length == 0 ){
							console.log('Não há registro retornado na pesquisa.');
							console.log($scope.perfis.length);
							$scope.mensagemControle = {
								"tipo" : "ERRO",
								"class": "mensagem-erro",
								"data" : {
									"mensagem" : "Não há registro retornado na pesquisa."
								}
							};
							return false
						}else{
							$scope.perfis = resultado.data;
						}
					},
					function(resultado){
						if (resultado.status == 404 && $scope.perfis.length == 0) {
							$scope.mensagemServidor = MensagensFabrica.get(20008);
						} else {
							$scope.mensagemServidor = MensagensFabrica.get(resultado.data.codigo);
						}
					}
				);

			};


			// $rootScope.perfisss = [
			// 	{
			// 		ordenacao : '1',
			// 		perfil : 'Estudante A',
			// 		nomeExibicaoPerfil : 'Estudante Comum',
			// 		nomeGrupoPerfil : 'Estudante',
			// 		politicaPublica : 'Educação',
			// 		situacaoCadastral : 'Cadastro Obrigatório',
			// 		situacao : {
			// 			ativo : true
			// 		}
			// 	},
			// 	{
			// 		ordenacao : '1',
			// 		perfil : 'Estudante A',
			// 		nomeExibicaoPerfil : 'Estudante Comum',
			// 		nomeGrupoPerfil : 'Estudante',
			// 		politicaPublica : 'Educação',
			// 		situacaoCadastral : 'Cadastro Obrigatório',
			// 		situacao : {
			// 			ativo : true
			// 		}
			// 	},
			// 	{
			// 		ordenacao : '1',
			// 		perfil : 'Estudante A',
			// 		nomeExibicaoPerfil : 'Estudante Comum',
			// 		nomeGrupoPerfil : 'Estudante',
			// 		politicaPublica : 'Educação',
			// 		situacaoCadastral : 'Cadastro Obrigatório',
			// 		situacao : {
			// 			ativo : true
			// 		}
			// 	}
			// ];

			// mensagem de erro
			// $scope.preFiltrar = function(){
			// 	$scope.perfis=[];
			// 	console.log('pre-func');
			// 	if($scope.filtro.nomeGrupoPerfil == null || $scope.filtro.nomeGrupoPerfil == ''
			// 	&& $scope.filtro.nomeExibicaoPerfil == null || $scope.filtro.nomeExibicaoPerfil == '')
			// 	{
			// 		console.log('É necessário o preenchimento de pelo menos um campo');
			// 		$scope.mensagemControle = {
			// 			"tipo" : "ERRO",
			// 			"class": "mensagem-erro",
			// 			"data" : {
			// 				"mensagem" : "É necessário o preenchimento de pelo menos um campo"
			// 			}
			// 		};
			// 		return false
			// 	}
			// 	if($scope.filtro.nomeExibicaoPerfil && $scope.filtro.nomeExibicaoPerfil.length <= 2){
			// 		console.log('menor que 3');
			// 		$scope.mensagemControle = {
			// 			"tipo" : "ERRO",
			// 			"class": "mensagem-erro",
			// 			"data" : {
			// 				"mensagem" : "O nome deve possuir pelo menos 3 caracteres (letras e/ou números)."
			// 			}
			// 		};
			// 		return false
			// 	}
			// 	if($scope.filtro.nomeGrupoPerfil && $scope.filtro.nomeGrupoPerfil.length <= 2){
			// 		console.log('menor que 3');
			// 		$scope.mensagemControle = {
			// 			"tipo" : "ERRO",
			// 			"class": "mensagem-erro",
			// 			"data" : {
			// 				"mensagem" : "O nome deve possuir pelo menos 3 caracteres (letras e/ou números)."
			// 			}
			// 		};
			// 		return false
			// 	}
			// 	GrupoPerfilUsuarioServico.filtrar(
			// 		$scope.filtro,
			// 		function(resultado){
			// 			console.log(resultado);
			//
			// 			if(resultado.data.length == 0 ){
			// 				console.log('Não há registro retornado na pesquisa.');
			// 				console.log($scope.perfis.length);
			// 				$scope.mensagemControle = {
			// 					"tipo" : "ERRO",
			// 					"class": "mensagem-erro",
			// 					"data" : {
			// 						"mensagem" : "Não há registro retornado na pesquisa."
			// 					}
			// 				};
			// 				return false
			// 			}else{
			// 				$scope.perfis = resultado.data;
			// 			}
			// 		},
			//
			//
			// 		function(resultado){
			// 			if (resultado.status == 404 && $scope.perfis.length == 0) {
			// 				$scope.mensagemServidor = MensagensFabrica.get(20008);
			// 			} else {
			// 				$scope.mensagemServidor = MensagensFabrica.get(resultado.data.serverMessage.codigo);
			// 			}
			// 		}
			//
			//
			// 	);
			//
			// }; //pré-filtrar function

			// a qualquer variação após a mensagem de erro, apagar a mesma
			$scope.changeInput = function() {
				delete $scope.mensagemControle
			};

			// $scope.filtro.nomeExibicaoPerfil = '';
			// $scope.filtro.nomeGrupoPerfil = '';
			// $scope.minlength = function(){
			// 	console.log('minlength');
			// 	}
			// };

			// limpar o form
			$scope.limpar = function () {
				delete $scope.filtro.nomeGrupoPerfil;
				delete $scope.filtro.nomeExibicaoPerfil;
				$scope.formFiltro.$setPristine();
				$scope.formFiltro.$setUntouched();
			};






			// $scope.limpar = function() {
			// 	$scope.formFiltro.$setPristine();
			//
			// 	$scope.formFiltro.$setUntouched();
			// 	delete $scope.filtro.nomeAgrupamento;
			// 	delete $scope.filtro.grupoUsuarioSistema;
			// 	$scope.mensagemServidor = '';
			// 	$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
			// };
		}
	});

})();
