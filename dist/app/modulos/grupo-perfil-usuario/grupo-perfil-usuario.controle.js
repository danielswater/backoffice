(function() {

	'use strict';

	define(['angularAMD', 'sptBotaoAlternar', 'GrupoPerfilUsuarioServico', 'dirPagination'], function(app) {

		app.controller('GrupoPerfilUsuarioControle', GrupoPerfilUsuarioControle);

		GrupoPerfilUsuarioControle.$injector = ['$scope', '$rootScope', '$uibModal',
		'FiltroRequisicao',
		'MensagensFabrica',
		'GrupoPerfilUsuarioServico'
	]

	function GrupoPerfilUsuarioControle($scope, $rootScope, $uibModal,
		FiltroRequisicao,MensagensFabrica, GrupoPerfilUsuarioServico) {

			$scope.perfis=[];
			$scope.filtro = {
				aberto: true
			};

			// mensagem de erro
			$scope.preFiltrar = function(){
				$scope.perfis=[];
				console.log('pre-func');
				if($scope.filtro.nomeGrupoPerfil == null || $scope.filtro.nomeGrupoPerfil == ''
				&& $scope.filtro.nomeExibicaoPerfil == null || $scope.filtro.nomeExibicaoPerfil == '')
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
				if($scope.filtro.nomeExibicaoPerfil && $scope.filtro.nomeExibicaoPerfil.length <= 2){
					console.log('menor que 3');
					$scope.mensagemControle = {
						"tipo" : "ERRO",
						"class": "mensagem-erro",
						"data" : {
							"mensagem" : "O nome deve possuir pelo menos 3 caracteres (letras e/ou números)."
						}
					};
					return false
				}
				if($scope.filtro.nomeGrupoPerfil && $scope.filtro.nomeGrupoPerfil.length <= 2){
					console.log('menor que 3');
					$scope.mensagemControle = {
						"tipo" : "ERRO",
						"class": "mensagem-erro",
						"data" : {
							"mensagem" : "O nome deve possuir pelo menos 3 caracteres (letras e/ou números)."
						}
					};
					return false
				}
				GrupoPerfilUsuarioServico.filtrar(
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
							$scope.mensagemServidor = MensagensFabrica.get(resultado.data.serverMessage.codigo);
						}
					}
				);

			}; //pré-filtrar function


			$scope.carregarItem = function(){
				$scope.perfis = [];
				GrupoPerfilUsuarioServico.filtrar(
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
						console.log(resultado);
						if (resultado.status == 404 && $scope.perfis.length == 0) {
							$scope.mensagemServidor = MensagensFabrica.get(20008);
						} else {
							$scope.mensagemServidor = MensagensFabrica.get(resultado.data.codigo);
						}
					}
				);
				delete $scope.mensagemServidor;
			};


			$scope.carregarPerfil= function(){
				$scope.perfis = [];
				delete $scope.mensagemServidor;
				$scope.espera = GrupoPerfilUsuarioServico.detalhar(id, callbackSucessoFiltro, callbackErroFiltro);
			}

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


			// $rootScope.perfis = [
			// 	{
			// 		ordenacao : '1',
			// 		perfil : 'Estudante A',
			// 		nomeExibicao : 'Estudante Comum',
			// 		grupoPerfil : 'Estudante',
			// 		politicaPublica : 'Educação',
			// 		situacaoCadastral : 'Cadastro Obrigatório',
			// 		situacao : {
			// 			ativo : true
			// 		}
			// 	},
			// 	{
			// 		ordenacao : '2',
			// 		perfil : 'Estudante B',
			// 		nomeExibicao : 'Estudante Comum',
			// 		grupoPerfil : 'Estudante',
			// 		politicaPublica : 'Educação',
			// 		situacaoCadastral : 'Cadastro Obrigatório',
			// 		situacao : {
			// 			ativo : true
			// 		}
			// 	},
			// 	{
			// 		ordenacao : '3',
			// 		perfil : 'Estudante C',
			// 		nomeExibicao : 'Estudante Comum',
			// 		grupoPerfil : 'Estudante',
			// 		politicaPublica : 'Educação',
			// 		situacaoCadastral : 'Cadastro Obrigatório',
			// 		situacao : {
			// 			ativo : true
			// 		}
			// 	}
			// ];



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
