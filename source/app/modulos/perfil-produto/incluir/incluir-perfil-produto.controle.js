define(['angularAMD', 'GrupoPerfilUsuarioServico', 'PerfilUsuarioServico', 'EmissaoCreditoServico', 'sptMensagemErro', 'sptData'], function (app) {
    app.controller('IncluirPerfilProdutoControle', IncluirPerfilProdutoControle);

    IncluirPerfilProdutoControle.$inject = ['$scope', '$q', '$uibModalInstance', 'modal', 'MensagensFabrica', 'PerfilProdutoServico', 'GrupoPerfilUsuarioServico', 'PerfilUsuarioServico', 'CreditoServico', 'EmissaoCreditoServico', 'EmissorCreditoServico'];

    function IncluirPerfilProdutoControle($scope, $q, $uibModalInstance, modal, MensagensFabrica, PerfilProdutoServico, GrupoPerfilUsuarioServico, PerfilUsuarioServico, CreditoServico, EmissaoCreditoServico, EmissorCreditoServico) {

        // Inicializacao
        $scope.modal = modal;
        $scope.novoProduto = new PerfilProdutoModelo;

        // FA214.01.02
        var grupoPerfilPromise = GrupoPerfilUsuarioServico.filtrar(
            { id: null, nomeGrupoPerfil: null, nomeExibicaoPerfil: null },
            function (resposta) {
                $scope.grupoPerfilLista = resposta.data;
            },
            errorCallback
        );

        // FA183.01.02
        var emissorPromise = EmissorCreditoServico.listarEmissorVigente(
            function (resposta) {
                $scope.emissorLista = resposta.data;
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

        $scope.espera = $q.all([pagadorPromise, grupoPerfilPromise, emissorPromise]);

        /**
         * Lista perfil do usuário de acordo com o grupo selecionado
         */
        $scope.listaPerfilUsuario = function () {
            if (!$scope.novoProduto.perfilUtilizacao) {
                return;
            }

            $scope.perfilLista = [];
            // FA214.02.02
            $scope.espera = PerfilUsuarioServico.filtrar(
                { grupoPerfil: $scope.novoProduto.perfilUtilizacao },
                function (resposta) {
                    $scope.perfilLista = resposta.data;
                },
                errorCallback
            );
        };

        /**
         * Detalhes do perfil do usuario
         */
        $scope.detalhePerfilUsuario = function () {
            if (!$scope.novoProduto.perfilUsuarioTransporte) {
                return;
            }
            // FA214.02.03
            $scope.espera = PerfilUsuarioServico.detalhar(
                $scope.novoProduto.perfilUsuarioTransporte.id,
                function (resposta) {
                    $scope.perfilUsuarioTransporte = resposta.data;
                },
                errorCallback
            );
        };

        /**
         * Lista creditos de acordo com emissor
         */
        $scope.listaCreditos = function () {
            if (!$scope.novoProduto.emissorCredito) {
                return;
            }

            $scope.creditoLista = [];
            // FA187.01.08
            $scope.espera = CreditoServico.listarCreditosPorEmissor(
                $scope.novoProduto.emissorCredito.id,
                function (resposta) {
                    $scope.creditoLista = resposta.data;
                },
                errorCallback
            );
        };

        $scope.detalheTipoEmissaoCredito = function () {
            if (!$scope.novoProduto.creditoEletronico) {
                return;
            } 
            $scope.novoProduto.tipoEmissaoCredito = new EmissaoCreditoModelo();
            var filtro = {
                emissorCredito: $scope.novoProduto.emissorCredito.id,
                creditoEletronico: {
                    id: $scope.novoProduto.creditoEletronico.id
                }
            };
            // FA213.01.03
            EmissaoCreditoServico.filtrar(
                filtro,
                function (resposta) {
                    $scope.novoProduto.tipoEmissaoCredito = resposta.data[0];
                },
                errorCallback
            );
        };

        /**
         * Inclui um novo Produto
         */
        $scope.incluir = function () {
            if (!validaCampos()) {
                return false;
            }
            // TODO: Pegar o usuario logado
            $scope.novoProduto.registro = {
                usuarioCriacao: 'SPTRANS'
            };

            $scope.espera = PerfilProdutoServico.criar(
                $scope.novoProduto,
                function (resposta) {
                    if (!resposta.data.dataExcecao) {
                        // sucesso
                        $scope.mensagemRetorno = MensagensFabrica.get(resposta.data.codigo);
                    } else {
                        // erro
                        $scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
                    }
                },
                errorCallback
            );
        };

		/**
		 * Funcao do botao ok da modal
		 */
        $scope.ok = function () {
            $uibModalInstance.close();
        };

		/**
		 * Funcao do botao fechar da modal
		 */
        $scope.fechar = function () {
            $uibModalInstance.dismiss('cancel');
        };

        var validaCampos = function () {
            if ($scope.novoProduto.produto.nome && $scope.novoProduto.produto.nome.length < 3
                || $scope.novoProduto.produto.nomeExibicao && $scope.novoProduto.produto.nomeExibicao.length < 3) {
                $scope.mensagemServidor = '';
                $scope.mensagemServidor = MensagensFabrica.get(367);
                return false;
            } else if ($scope.novoProduto.produto.sigla && $scope.novoProduto.produto.sigla.length < 2) {
                $scope.mensagemServidor = '';
                $scope.mensagemServidor = MensagensFabrica.get(374);
                return false;
            }
            return true;
        }

        var errorCallback = function (resposta) {
            if (resposta.status == 404) {
                $scope.mensagemServidor = MensagensFabrica.get(20008);
            } else {
                $scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
            }
        }
    }
});