define(['angularAMD', 'sptMensagemErro', 'sptData', 'GrupoPerfilUsuarioServico', 'PerfilUsuarioServico', 'EmissaoCreditoServico'], function(app) {
	app.controller('EditarPerfilProdutoControle', EditarPerfilProdutoControle);

	EditarPerfilProdutoControle.$inject = ['$scope', '$q', '$uibModalInstance', 'modal', 'MensagensFabrica', 'PerfilProdutoServico', 'GrupoPerfilUsuarioServico', 'PerfilUsuarioServico', 'EmissorCreditoServico', 'CreditoServico', 'EmissaoCreditoServico'];

	function EditarPerfilProdutoControle($scope, $q, $uibModalInstance, modal, MensagensFabrica, PerfilProdutoServico, GrupoPerfilUsuarioServico, PerfilUsuarioServico, EmissorCreditoServico, CreditoServico, EmissaoCreditoServico) {

        // Inicializacao
		$scope.modal = modal;
		$scope.produto = new PerfilProdutoModelo;

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
        // $scope.emissorLista = [{id: 1, descricao: '001 - São Paulo transporte SA'}];

        // RDS – 3.109
        var pagadorPromise = PerfilProdutoServico.listarTipoPagadorTarifa(
            function(resposta) {
                $scope.pagadorLista = resposta.data;
            },
            errorCallback
        );

        // Depois que todos os RDSs estiverem prontos e no DOM, trazer os detalhes do produto
        $scope.espera = $q.all([pagadorPromise, grupoPerfilPromise, emissorPromise]).then(function() {
            PerfilProdutoServico.detalhar(
                $scope.modal.objeto.produto.id,
                function(resposta) {
                    $scope.produto = resposta.data;
                    $scope.listaPerfilUsuario();
                    $scope.detalhePerfilUsuario();
                    $scope.listaCreditos();
                    $scope.detalheTipoEmissaoCredito();
                }, 
                function(resposta) {
                    $scope.mensagemRetorno = MensagensFabrica.get(resposta.codigo);
                }
            );
        });

        /**
         * Lista perfil do usuário de acordo com o grupo selecionado
         */
        $scope.listaPerfilUsuario = function () {
            if (!$scope.produto.perfilUtilizacao) {
                return;
            }

            $scope.perfilLista = [];
            // FA214.02.02
            $scope.espera = PerfilUsuarioServico.filtrar(
                { grupoPerfil: $scope.produto.perfilUtilizacao },
                function (resposta) {
                    $scope.perfilLista = resposta.data;
                },
                errorCallback
            );
        };

        /**
         * Detalhes do perfil do usuario
         */
        $scope.detalhePerfilUsuario = function() {
            if (!$scope.produto.perfilUsuarioTransporte) {
                return;
            }
            // FA214.02.03
            $scope.espera = PerfilUsuarioServico.detalhar(
                $scope.produto.perfilUsuarioTransporte.id,
                function (resposta) {
                    $scope.perfilUsuarioTransporte = resposta.data;
                },
                errorCallback
            );
        };

        /**
         * Lista creditos de acordo com emissor
         */
        $scope.listaCreditos = function() {
            if (!$scope.produto.emissorCredito) {
                return;
            }

            $scope.creditoLista = [];
            // FA187.01.08
            $scope.espera = CreditoServico.listarCreditosPorEmissor(
                $scope.produto.emissorCredito.id,
                function (resposta) {
                    $scope.creditoLista = resposta.data;
                },
                errorCallback
            );
        };

        /**
         * Detalhes do Tipo de Emissão de Crédito
         */
        $scope.detalheTipoEmissaoCredito = function() {
            if (!$scope.produto.creditoEletronico) {
                return;
            } 
            $scope.produto.tipoEmissaoCredito = new EmissaoCreditoModelo();
            var filtro = {
                emissorCredito: $scope.produto.emissorCredito.id,
                creditoEletronico: {
                    id: $scope.produto.creditoEletronico.id
                }
            };
            // FA213.01.03
            EmissaoCreditoServico.filtrar(
                filtro,
                function (resposta) {
                    $scope.produto.tipoEmissaoCredito = resposta.data[0];
                },
                errorCallback
            );
        };

		$scope.editar = function() {
			$scope.produto.registro = {
				usuarioAlteracao: 'SPTRANS'
			};
			$scope.espera = PerfilProdutoServico.salvar(
				$scope.produto,
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
		}

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

        var errorCallback = function (resposta) {
            if (resposta.status == 404) {
                $scope.mensagemServidor = MensagensFabrica.get(20008);
            } else {
                $scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
            }
        }
	};
});