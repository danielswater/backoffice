define(['angularAMD', 'dirPagination', 'sptBotaoAlternar', 'SamServico', 'ngMask'], function(app) {

	app.controller('SamControle', SamControle);

	SamControle.$injector = ['$scope', 'MensagensFabrica', 'SamServico']

	function SamControle($scope, MensagensFabrica, SamServico) {

		// Inicializacao
		$scope.filtroSam = new SamModelo();

		$scope.situacoes = [{
			descricao: 'Ativo',
			id: 'A'
		}, {
			descricao: 'Inativo',
			id: 'I'
		}];

		$scope.filtro= {
			aberto: true
		};
		$scope.sams = [];

		/**
		 * Chama servico para carregar os tipos de SAM
		 */
		var carregarTipos = function () {
			$scope.espera = SamServico.listarTipoSAM(
				function(resposta){
					$scope.samsTipos = resposta.data;
				}, function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
				}
			);
		};

		carregarTipos();

		/**
		 * Funcao "padrao" chamada no submit da diretiva sp-filtro
		 */
		$scope.preFiltrar = function() {
			$scope.sams = [];
			delete $scope.mensagemServidor;

			$scope.espera = SamServico.filtrar($scope.filtroSam, callbackSucessoFiltro, callbackErroFiltro);
		};

		/**
		 * Funcao callback depois de ativar/reativar ou editar sam
		 */
		$scope.carregarSam = function(id) {
			$scope.sams = [];
			delete $scope.mensagemServidor;

			$scope.espera = SamServico.detalhar(id, callbackSucessoFiltro, callbackErroFiltro);
		}

		/**
		 * Funcao callback de sucesso depois de trazer uma SAM ou uma lista
		 */
		var callbackSucessoFiltro = function(resposta) {
			if (!angular.isArray(resposta.data)) {
				resposta.data = [resposta.data];
			}
			if (resposta.data.length == 0) {
				$scope.mensagemServidor = MensagensFabrica.get(8);
			}

			$scope.sams = resposta.data;
			$scope.filtro.aberto = false;
		}

		/**
		 * Funcao callback de erro depois de trazer uma SAM ou uma lista
		 */
		var callbackErroFiltro = function(resposta) {
			if (resposta.status == 404 && $scope.sams.length == 0) {
				$scope.mensagemServidor = MensagensFabrica.get(20008);
			} else {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
			}
		}

		/**
		 * Limpa todos os campos de filtro
		 */
		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			$scope.filtroSam.tipoSAM = '';
			$scope.filtroSam.numeroSerie = '';
			$scope.filtroSam.registro.situacao = '';
			$scope.mensagemServidor = '';
		};

		/**
		 * Função callback apos inserir novo SAM com sucesso
		 */
		$scope.incluirSucesso = function() {
			$scope.preFiltrar();
		}
	}

});