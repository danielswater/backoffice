(function() {

	'use strict';

	define(['angularAMD', 'dirPagination','sptBotaoAlternar','EmissaoCreditoServico','CreditoServico','EmissorServico', 'ModalFabrica', './recurso.js'], function(app) {

		app.controller('EmissaoCreditoControle', EmissaoCreditoControle);

		EmissaoCreditoControle.$inject = ['$scope', '$rootScope', '$uibModal','FiltroRequisicao','RecursoCredito','MensagensFabrica','EmissaoCreditoServico','CreditoServico','EmissorServico','ModalFabrica'
		]

		function EmissaoCreditoControle ($scope, $rootScope, $uibModal,FiltroRequisicao,RecursoCredito,MensagensFabrica,EmissaoCreditoServico,CreditoServico,EmissorServico,ModalFabrica){
			$scope.emissao = [];
			$scope.situacoes = [{
				descricao: 'Ativo',
				id: 'A'
			}, {
				descricao: 'Inativo',
				id: 'I'
			}];
			/**
		 	* Emissor do Crédito
			*/
			$scope.espera = EmissorServico.listarEmissor(
				function(resposta){
					$scope.emissor = resposta.data;
				}, function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
			/**
		 	* Nome do Crédito
			*/
			$scope.espera = CreditoServico.listarCreditos(
				function(resposta){
					$scope.nmCreditoEletronico = resposta.data;
				}, function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
			/**
		 	* Tipo da Vigência
			*/
			$scope.espera = EmissaoCreditoServico.listarTipoVigencia(
				function(resposta){
					$scope.TipoVigencia = resposta.data;
				}, function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
			/**
		 	* Aplicação do Crédito
			*/
			$scope.espera = EmissaoCreditoServico.listarAplicaoCredito(
				function(resposta){
					$scope.AplicacaoCredito = resposta.data;
				}, function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
			/**
		 	* Tipo Tarifário
			*/
			$scope.espera = EmissaoCreditoServico.listarTipoTarifario(
				function(resposta){
					$scope.TipoTarifario = resposta.data;
				}, function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
			/**
			* Pesquisar
			*/
			$scope.preFiltrar = function() {
				delete $scope.mensagemServidor;
				if(
				($scope.filtro.id == '' || $scope.filtro.id == undefined || $scope.filtro.id == null) && 
				($scope.filtro.emissorCredito == '' || $scope.filtro.emissorCredito == undefined || $scope.filtro.emissorCredito == null) &&
				($scope.filtro.creditoEletronico == '' || $scope.filtro.creditoEletronico == undefined || $scope.filtro.creditoEletronico == null) &&
				($scope.filtro.vigenciaCreditoTemporal == '' || $scope.filtro.vigenciaCreditoTemporal == undefined || $scope.filtro.vigenciaCreditoTemporal == null) &&
				($scope.filtro.tipoTarifario == '' || $scope.filtro.tipoTarifario == undefined || $scope.filtro.tipoTarifario == null) &&
				($scope.filtro.AplicacaoCredito == '' || $scope.filtro.AplicacaoCredito == undefined || $scope.filtro.AplicacaoCredito == null)
				 ){
				$scope.erroFiltro = true;

				
				$scope.mensagemServidor = {
					descricao: "Preencha ao menos um dos campos indicados para realizar a pesquisa"
				};

				// new ModalFabrica.abrirModalMensagem(
				// 	'erro',
				// 	'Preencha ao menos um dos campos indicados para realizar a pesquisa',
				// 	function(){}
				// );
			} else {


				// if($scope.filtro.id == undefined || $scope.filtro.id == ''){
				// 	$scope.erroFiltro = true;
				// 	$scope.mensagemServidor = {
				// 		descricao: "IMPORTANTE!"
				// 	};
				// 	new ModalFabrica.abrirModalMensagem(
				// 		'erro',
				// 		'Preencha ao menos um dos campos indicados para realizar a pesquisa',
				// 		function(){ }
				// 	);
				// } else {
					$scope.emissao = [];
					delete $scope.mensagemServidor;
					$scope.espera = EmissaoCreditoServico.filtrar($scope.filtro, callbackSucessoFiltro, callbackErroFiltro)
				}
				
			};
			/**
			* Funcao callback de sucesso
			*/
			var callbackSucessoFiltro = function(resposta) {
				
				if (resposta.data.dataExcecao) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				} else {
					if (!angular.isArray(resposta.data)) {
						resposta.data = [resposta.data];
					}
				}

				$scope.emissao = resposta.data;
				$scope.filtro.aberto = false;
			}
			/**
			 * Funcao callback de erro
			 */
			var callbackErroFiltro = function(resposta) {
				if (resposta.status == 404 && $scope.sams.length == 0) {
					$scope.mensagemServidor = MensagensFabrica.get(20008);
				} else {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			}
			/**
			 * Funcao callback depois de ativar/reativar
			 */
			$scope.carregarEmissao = function(id) {
				$scope.emissao = [];
				delete $scope.mensagemServidor;

				$scope.espera = EmissaoCreditoServico.detalhar(id, callbackSucessoFiltro, callbackErroFiltro);
			}
			// Inicializacao
			$scope.filtroTipoEmissaoCredito = new EmissaoCreditoModelo();
			
			$scope.filtro = {
				aberto: true
			};


            $scope.sortableOptions = {
                update: function(e, ui) {
                    $scope.reordenar();
                },
                // axis: 'x'
            };
			$scope.incluirSucesso = function() {
				$scope.preFiltrar();
			}
			$scope.limpar = function() {
				$scope.emissao = [];
				$scope.formFiltro.$setPristine();
				$scope.formFiltro.$setUntouched();
                $scope.filtro.id = '';
				$scope.mensagemServidor = '';
				$scope.filtro.emissorCredito = '';
				$scope.filtro.creditoEletronico = '';
				$scope.filtro.vigenciaCreditoTemporal = '';
				$scope.filtro.tipoTarifario = '';
				$scope.filtro.AplicacaoCredito = '';
				$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
			};
		}
	});
})();