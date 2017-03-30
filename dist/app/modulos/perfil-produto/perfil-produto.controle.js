define(['angularAMD', 'dirPagination', 'PerfilProdutoServico', 'CreditoServico', 'EmissorCreditoServico'], function (app) {

    app.controller('PerfilProdutoControle', PerfilProdutoControle);

    PerfilProdutoControle.$inject = ['$scope', '$q', 'MensagensFabrica', 'PerfilProdutoServico', 'CreditoServico', 'EmissorCreditoServico']

    function PerfilProdutoControle($scope, $q, MensagensFabrica, PerfilProdutoServico, CreditoServico, EmissorCreditoServico) {

        // Inicializacao
        $scope.filtroProduto = new PerfilProdutoModelo();

        $scope.filtro = {
            aberto: true
        };

        // FA183.01.02
        var emissorPromise = EmissorCreditoServico.listarEmissorVigente(
            function (resposta) {
                $scope.emissorLista = resposta.data;
            },
            errorCallback
        );

        // FA187.01.02
        var creditoPromise = CreditoServico.listarCreditos(
            function (resposta) {
                $scope.creditoLista = resposta.data;
            },
            errorCallback
        );

        // RDS – 3.109
        var pagadorPromise = PerfilProdutoServico.listarTipoPagadorTarifa(
            function (resposta) {
                $scope.pagadorLista = resposta.data;
            },
            errorCallback
        );

        $scope.espera = $q.all([creditoPromise, pagadorPromise, emissorPromise]);

        $scope.preFiltrar = function () {
            if (!validaCampos()) {
                $scope.mensagemServidor = { descricao: 'Preencha ao menos um campo da pesquisa' };
                return false;
            }
            $scope.produtos = [];
            delete $scope.mensagemServidor;
            $scope.espera = PerfilProdutoServico.filtrar($scope.filtroProduto, callbackSucessoFiltro, errorCallback);
        }

        $scope.carregarProduto = function (id) {
            $scope.produtos = [];
            delete $scope.mensagemServidor;

            $scope.espera = PerfilProdutoServico.detalhar(id, callbackSucessoFiltro, errorCallback);
        }

        $scope.limpar = function () {
            $scope.formFiltro.$setPristine();
            $scope.formFiltro.$setUntouched();
            $scope.mensagemServidor = '';
            // Limpa os campos
            $scope.filtroProduto.produto = null;
            $scope.filtroProduto.emissorCredito = null;
            $scope.filtroProduto.creditoEletronico = null;
        };

        var callbackSucessoFiltro = function (resposta) {
            if (resposta.data.length == 0) {
                $scope.mensagemServidor = MensagensFabrica.get(8);
                return;
            }

            if (!angular.isArray(resposta.data)) {
                resposta.data = [resposta.data];
            }

            $scope.produtos = resposta.data;
            $scope.filtro.aberto = false;
        }

        var errorCallback = function (resposta) {
            if (resposta.status == 404) {
                $scope.mensagemServidor = MensagensFabrica.get(20008);
            } else {
                $scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
            }
        }

        /**
         * Função que valida campos. Deve ter ao menos um campo de pesquisa preenchido
         */
        var validaCampos = function () {
            return ( ($scope.filtroProduto.produto && ($scope.filtroProduto.produto.nome || $scope.filtroProduto.produto.sigla || $scope.filtroProduto.produto.tipoPagadorTarifa)) || $scope.filtroProduto.emissorCredito
                || $scope.filtroProduto.creditoEletronico);
        }
    }
});