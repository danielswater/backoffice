define(['angularAMD', 'sptMensagemErro'], function (app) {
    app.controller('AtivarEstampaControle', AtivarEstampaControle);

    AtivarEstampaControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'EstampaServico'];

    function AtivarEstampaControle($scope, $uibModalInstance, modal, MensagensFabrica, EstampaServico) {

        $scope.modal = modal;
        $scope.estampa = new EstampaModelo();
        $scope.motivoLista = [];

        $scope.espera = EstampaServico.filtrar(
            { identificadorEstampa: $scope.modal.objeto.identificadorEstampa },
            function (resposta) {
                $scope.estampa = resposta.data;
                $scope.estampa.registro.motivo = null;
                $scope.modal.situacao = $scope.estampa.registro.situacao.id;
            },
            function (resposta) {
                $scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
            }
        );

        if ($scope.modal.objeto.registro.situacao.id == 'A') {
            $scope.espera = EstampaServico.listarMotivoInativacao(
                function (resposta) {
                    $scope.motivoLista = resposta.data;
                }, function (resposta) {
                    $scope.mensagemRetorno = MensagensFabrica.get(resposta.codigo);
                }
            );
        }

        $scope.ok = function () {
            $uibModalInstance.close();
        }

        $scope.fechar = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.ativar = function () {
            // TODO: Pegar usuario logado
            $scope.estampa.registro.usuarioAlteracao = 'SPTRANS';
            $scope.espera = EstampaServico.ativar(
                $scope.estampa,
                function (resposta) {
                    if (!resposta.data.dataExcecao) {
                        // sucesso
                        $scope.mensagemRetorno = MensagensFabrica.get(resposta.data.codigo);
                    } else {
                        // erro
                        $scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
                    }
                },
                function (resposta) {
                    $scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
                }
            );
        }

    }
});