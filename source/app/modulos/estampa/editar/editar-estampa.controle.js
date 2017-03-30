define(['angularAMD', 'sptMensagemErro'], function (app) {
    app.controller('EditarEstampaControle', EditarEstampaControle);

    EditarEstampaControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'EstampaServico'];

    function EditarEstampaControle($scope, $uibModalInstance, modal, MensagensFabrica, EstampaServico) {

        // Inicializacao
        $scope.modal = modal;
        $scope.estampa = new EstampaModelo();

        $scope.espera = EstampaServico.filtrar(
            { identificadorEstampa: $scope.modal.objeto.identificadorEstampa },
            function (resposta) {
                $scope.estampa = resposta.data;
            },
            function (resposta) {
                $scope.mensagemRetorno = MensagensFabrica.get(resposta.codigo);
            }
        );

        /**
         * Converte imagem em base64
         */
        $scope.subirImagem = function (event) {
            $scope.estampa.imagemClob = '';
            var input = event.target;
            var reader = new FileReader();
            reader.onload = function () {
                var dataURL = reader.result;
                $scope.estampa.imagemClob = dataURL;
            };
            reader.readAsDataURL(input.files[0]);
        };

		/**
		 * Editar uma nova estampa
		 */
        $scope.editar = function () {
            // TODO: Pegar o usuario logado
            $scope.estampa.registro = {
                usuarioAlteracao: 'SPTRANS'
            };

            $scope.espera = EstampaServico.salvar(
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
    }
});