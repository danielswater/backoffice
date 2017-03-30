define(['angularAMD', 'sptMensagemErro', 'PerfilProdutoServico'], function(app) {
    app.controller('IncluirEstampaVinculoControle', IncluirEstampaVinculoControle);

    IncluirEstampaVinculoControle.$inject = ['$scope', '$q', '$uibModalInstance', 'modal', 'MensagensFabrica', 'EstampaServico', 'PerfilProdutoServico'];

    function IncluirEstampaVinculoControle($scope, $q, $uibModalInstance, modal, MensagensFabrica, EstampaServico, PerfilProdutoServico) {

        // Inicializacao
        $scope.modal = modal;
        $scope.novoVinculo = new EstampaModelo();
        $scope.produtos = [];

        var listarCascoPromise = EstampaServico.listarTipoCasco(
            function(resposta) {
                $scope.tipoCascos = resposta.data;
            },
            function(resposta) {
                $scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
            }
        );

        var listarEstampaPromise = EstampaServico.filtrar(
            null,
            function(resposta) {
                $scope.estampas = resposta.data;
            },
            function(resposta) {
                $scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
            }
        );

        var listarProdutos = PerfilProdutoServico.filtrar(
            new PerfilProdutoModelo(),
            function(resposta) {
                $scope.listaProdutos = resposta.data;
            },
            function(resposta) {
                $scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
            }
        );

        $scope.espera = $q.all([listarCascoPromise, listarEstampaPromise, listarProdutos]);

		/**
		 * Inclui uma nova estampa
		 */
        $scope.incluir = function() {
            $scope.novoVinculo.produtos = [];
            angular.forEach($scope.produtos, function(value, key) {
                if (value) {
                    $scope.novoVinculo.produtos.push(key);
                }
            });

            $scope.novoVinculo.identificadorEstampa = $scope.estampa.identificadorEstampa;

            // TODO: Pegar o usuario logado
            $scope.novoVinculo.registro = {
                usuarioCriacao: 'SPTRANS'
            };

            $scope.espera = EstampaServico.criarVinculo(
                $scope.novoVinculo,
                function(resposta) {
                    if (!resposta.data.dataExcecao) {
                        // sucesso
                        $scope.mensagemRetorno = MensagensFabrica.get(resposta.data.codigo);
                    } else {
                        // erro
                        $scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
                    }
                },
                function(resposta) {
                    $scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
                }
            );
        };

		/**
		 * Funcao do botao ok da modal
		 */
        $scope.ok = function() {
            $uibModalInstance.close();
        };

		/**
		 * Funcao do botao fechar da modal
		 */
        $scope.fechar = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
});