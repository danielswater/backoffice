define(['angularAMD', 'dirPagination', 'sptBotaoAlternar', 'EstampaServico'], function (app) {

    app.controller('EstampaControle', EstampaControle);

    EstampaControle.$injector = ['$scope', '$sce', 'MensagensFabrica', 'EstampaServico']

    function EstampaControle($scope, $sce, MensagensFabrica, EstampaServico) {

        // Inicializacao
        $scope.filtroEstampa = new EstampaModelo();

        $scope.filtro = {
            aberto: true
        };
        $scope.estampas = [];


		/**
		 * Funcao "padrao" chamada no submit da diretiva sp-filtro
		 */
        $scope.preFiltrar = function () {
            $scope.estampas = [];
            delete $scope.mensagemServidor;

            $scope.espera = EstampaServico.filtrar($scope.filtroEstampa, callbackSucessoFiltro, errorCallback);
        };

        /**
         * Funcao callback depois de ativar/reativar ou editar estampa
         */
        $scope.carregarEstampa = function(id) {
        	$scope.sams = [];
        	delete $scope.mensagemServidor;

        	$scope.espera = EstampaServico.filtrar({ identificadorEstampa: id }, callbackSucessoFiltro, errorCallback);
        }


		/**
		 * Funcao callback de sucesso depois de filtrar
		 */
        var callbackSucessoFiltro = function (resposta) {
            if (resposta.data.length == 0) {
                $scope.mensagemServidor = MensagensFabrica.get(8);
                return;
            }

            if (!angular.isArray(resposta.data)) {
                resposta.data = [resposta.data];
            }

            $scope.estampas = resposta.data;
            $scope.filtro.aberto = false;
        }

		/**
		 * Funcao callback de erro
		 */
        var errorCallback = function (resposta) {
            if (resposta.status == 404) {
                $scope.mensagemServidor = MensagensFabrica.get(20008);
            } else {
                $scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
            }
        }

        /**
         * Limpa todos os campos de filtro
         */
        $scope.limpar = function () {
            $scope.formFiltro.$setPristine();
            $scope.formFiltro.$setUntouched();
            $scope.filtroEstampa.nome = '';
            $scope.mensagemServidor = '';
        };

        /**
         * Função callback apos inserir novo Estampa com sucesso
         */
        $scope.incluirSucesso = function() {
        	$scope.preFiltrar();
        }
    }

});