define(['angularAMD', 'dirPagination', 'sptBotaoAlternar', 'EstampaServico'], function (app) {

    app.controller('EstampaVinculoControle', EstampaVinculoControle);

    EstampaVinculoControle.$injector = ['$scope', '$sce', 'MensagensFabrica', 'EstampaServico']

    function EstampaVinculoControle($scope, $sce, MensagensFabrica, EstampaServico) {

        // Inicializacao
        $scope.filtro = {
            aberto: true
        };
        $scope.vinculos = [];

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

            $scope.vinculos = resposta.data;
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
         * Lista todos os vinculos
         */
        $scope.preFiltrar = function() {
            $scope.espera = EstampaServico.filtrarVinculo(null, callbackSucessoFiltro, errorCallback);
        }

        $scope.preFiltrar();
        

        /**
         * Função callback apos inserir novo vinculo com sucesso
         */
        $scope.incluirSucesso = function() {
        	$scope.preFiltrar();
        }
    }

});