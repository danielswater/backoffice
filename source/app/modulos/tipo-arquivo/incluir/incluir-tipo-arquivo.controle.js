define(['angularAMD', '../recurso.js'], function(app) {
	app.controller('IncluirTipoArquivoControle', IncluirTipoArquivoControle);

	IncluirTipoArquivoControle.$inject = ['$scope', '$uibModalInstance', 'modal',
		'MensagensFabrica',
		'RecursoTipoArquivo'
	];

	function IncluirTipoArquivoControle($scope, $uibModalInstance, modal,
		MensagensFabrica,
		RecursoTipoArquivo
		) {

		$scope.modal = modal;
		$scope.tipoArquivo = new RecursoTipoArquivo;

		$scope.transmissoes = [{
			nome: 'Download',
			download: 'S'
		}, {
			nome: 'Upload',
			download: 'N'
		}]

		$scope.binarios = [{
			nome: 'Binarizado',
			binarizado: 'S'
		}, {
			nome: 'Não Binarizado',
			binarizado: 'N'
		}]

		$scope.assinaturas = [{
			nome: 'Assinado',
			assinado: 'S'
		}, {
			nome: 'Não Assinado',
			assinado: 'N'
		}]

		$scope.incluir = function() {
			$scope.tipoArquivo.assinado = $scope.filtro.assinatura.assinado;
			$scope.tipoArquivo.binarizado = $scope.filtro.binario.binarizado;
			$scope.tipoArquivo.download = $scope.filtro.transmissao.download;

			$scope.espera = RecursoTipoArquivo.create(
				$scope.tipoArquivo,
				function(resposta) {
					$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
					$scope.limpar();
				},
				function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
				});
		}

		$scope.ok = function(form) {
			$uibModalInstance.close();
		}

		$scope.limpar = function(form) {
			$scope.formTipoArquivo.$setPristine();
			$scope.formTipoArquivo.$setUntouched();
			$scope.tipoArquivo.descricao = '';
			delete $scope.filtro.assinatura;
			delete $scope.filtro.binario;
			delete $scope.filtro.transmissao;
			$scope.mensagemServidor = '';
		};

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}

});