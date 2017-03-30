define(['angularAMD', 'sptMensagemErro'], function (app) {
    app.controller('ExcluirEstampaControle', ExcluirEstampaControle);

    ExcluirEstampaControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'EstampaServico'];

    function ExcluirEstampaControle($scope, $uibModalInstance, modal, MensagensFabrica, EstampaServico) {

        $scope.modal = modal;

        $scope.mensagemServidor = MensagensFabrica.get(3);

		/**
		 * Funcao do botao ok da modal
		 */
        $scope.ok = function () {
            $uibModalInstance.close();
        }

		/**
		 * Funcao do botao fechar da modal
		 */
        $scope.fechar = function () {
            $uibModalInstance.dismiss('cancel');
        };

		/**
		 * Funcao que exclui a SAM
		 */
        $scope.excluir = function () {
            $scope.espera = EstampaServico.deletar(
                $scope.modal.objeto.identificadorEstampa,
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