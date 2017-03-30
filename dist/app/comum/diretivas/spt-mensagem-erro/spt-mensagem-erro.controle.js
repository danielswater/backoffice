define(['angularAMD'], function(app) {
	app.controller('MensagemErroControle', MensagemErroControle);

	MensagemErroControle.$inject = ['$scope', 'MensagensFabrica'];

	function MensagemErroControle($scope, MensagensFabrica) {

		$scope.contexto = (!!$scope.contexto) ? $scope.contexto : null;

		//obtem erros correspondentes quando o formulário for submetido
		$scope.$watch('form.$submitted', function(novo, antigo) {
			if (novo != antigo) {
				_.forOwn($scope.form.$error, function(valor, chave) {
					$scope.mensagem = MensagensFabrica.getViaMapa($scope.contexto, chave);
					return false;
				});
			}
		});

		$scope.$watch('form.$error', function(novo, antigo) {

			if (novo != antigo) {
				var erros = [];
				//itera nas propriedades objeto de erro obtendo as mensagens correspondentes
				_.forOwn($scope.form.$error, function(valor, chave) {

					//define prioridade erro campo obrigatório
					if(!!$scope.form.$error.required && chave != 'required'){
						return true;	
					}

					$scope.mensagem = MensagensFabrica.getViaMapa($scope.contexto, chave);

					var erro = _.find(valor, {
						'$touched': true,
						'$invalid': true
					});

					if (!!erro) {
						erros.push(erro);
						return false;
					}
				});
				$scope.invalido = !!erros.length;
			}
		}, true)

	}
});