//TODO: Verificar porque angularAMD deve ser o primeiro item do array, e nome do modulo.
define(['angularAMD'], function(app) {
	app.controller('sptModalAcaoControle', sptModalAcaoControle);

	sptModalAcaoControle.$inject = ['$scope', '$uibModal', 'ModalModelo', 'ModalFabrica','Utils','CONFIG'];

	function sptModalAcaoControle($scope, $uibModal, ModalModelo, ModalFabrica,Utils,CONFIG) {
		$scope.bloqueado = false;
		$scope.callback = ($scope.callback) ? $scope.callback : angular.noop;
		$scope.trataObjeto = ($scope.trataObjeto) ? $scope.trataObjeto : angular.noop;

		$scope.abrirModal = function(modal) {
			var acao = $scope.acao
			var templateUrl = 'app/comum/diretivas/spt-modal/templates/modal-template' + '-' + acao + '.html';
			var modulo = $scope.modulo;
			var caminhoModulo = (!!$scope.caminhoModulo) ? CONFIG.PATHS.modulos + $scope.caminhoModulo : CONFIG.PATHS.modulos + modulo;
			
			var nomeModal = $scope.nomeModal || modulo;
			var caminhoControle = caminhoModulo + '/' + acao + '/';
			var controle = {
				nome: Utils.geraNomeControle(acao + '-' + nomeModal),
				url: caminhoControle + acao + '-' + nomeModal + '.controle.js',
			}

			var options = {
					templateUrl: templateUrl,
					size: $scope.tamanho,
					controller: controle.nome,
					controllerUrl: controle.url,
					callback: $scope.callback,
					callbackClick: function() {
						$scope.bloqueado = !$scope.bloqueado;
					},
					resolve: {
						modal: function() {
							return {
								objeto: modal.objeto,
								size: $scope.tamanho,
								template: caminhoControle + acao + '-' + nomeModal + '.html',
								titulo: $scope.titulo,
								nome: modulo
							}
						}
					}
				};
			
			ModalFabrica.abrirModal(options);
		}
	}
});