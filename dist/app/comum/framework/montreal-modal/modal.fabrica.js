define(['angularAMD', 'ui-bootstrap', 'app/comum/framework/montreal-modal/modal.modelo.js'], function(app) {

	app.factory('ModalFabrica', ModalFabrica);

	ModalFabrica.$inject = ['$uibModal', '$sce', 'ModalModelo'];

	function ModalFabrica($uibModal, $sce, ModalModelo) {

		return {
			abrirModal: function(modalOptions) {
				var modal = new ModalModelo(modalOptions);
				if(modalOptions && modalOptions.controllerUrl) {
					require([modalOptions.controllerUrl], function() {
						criar(modal);
					});
				} else {
					criar(modal);
				}
			},
			abrirModalControle: function(modal) {
				var modal = new ModalModelo(modalOptions);
				require([modal.controllerUrl], function() {
					criar(modal);
				});
			},

			abrirModalMensagem: function(tipo, mensagem, callback) {
				var modal = new ModalModelo({
					templateUrl: 'app/comum/framework/montreal-modal/templates/modal-template-mensagem-' + tipo + '.html',
					controller: function($uibModalInstance, $scope) {
						$scope.ok = function () {
							$uibModalInstance.close();
						};
						$scope.mensagem = $sce.trustAsHtml(mensagem);
					},
					callback: callback
				})
				
				require([modal.controllerUrl], function() {
					criar(modal);
				});
			},
			abrirModalMensagemConfirmaCancela: function(tipo, mensagem, callback) {
				var modal = new ModalModelo({
					templateUrl: 'app/comum/framework/montreal-modal/templates/modal-template-confirma.html',
					controller: function($uibModalInstance, $scope) {
						$scope.ok = function () {
							$uibModalInstance.close();
							// callback();
						};
						$scope.cancelar = function () {
							$uibModalInstance.close();
							// callback();
						};
						$scope.mensagem = $sce.trustAsHtml(mensagem);
					},
					callback: callback
				})
				
				require([modal.controllerUrl], function() {
					criar(modal);
				});
			},

		}

        /* Metodos privados */
		function criar(modal) {
			var modalInstancia = $uibModal.open(modal);

			if (!!modal.scope)
				modal.scope.modalInstancia = modalInstancia;

			modalInstancia.result.then(function() {
				modal.callback();
			});

			modalInstancia.closed.then(function() {
				modal.callbackClick();
			});
		}
	}
});