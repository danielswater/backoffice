define(['angularAMD', 'sptMensagemErro'], function (app) {
    app.controller('ExcluirEstampaVinculoControle', ExcluirEstampaVinculoControle);

    ExcluirEstampaVinculoControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'EstampaServico'];

    function ExcluirEstampaVinculoControle($scope, $uibModalInstance, modal, MensagensFabrica, EstampaServico) {

        $scope.modal = modal;

		/**
		 * Edita vinculo da estampa
		 */
        $scope.excluir = function () {
            $scope.espera = EstampaServico.deletarVinculo(
                modal.objeto.identificadorVinculo,
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
    }

});