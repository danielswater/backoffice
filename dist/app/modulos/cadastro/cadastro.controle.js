(function() {

	'use strict';

	define(['angularAMD', 'dirPagination'], function(app) {

		app.controller('CadastroControle', CadastroControle);

		CadastroControle.$inject = ['$scope', 'MensagensFabrica']

		function CadastroControle($scope, MensagensFabrica) {

            // Inicializacao
			$scope.filtroCadastro = new Object;

			$scope.filtro = {
				aberto: true
			};

			$scope.preFiltrar = function() {
				$scope.cadastros = [{
					id: 1169279,
                    nomeCidadao: 'Maria Cecília de Jesus Silva',
					cpf: '294.578.154-21',
					numeroDocumento: '32.527.659-5',
					dataNascimento: '17/05/1981',
					nomeMae: 'Clarice de Jesus Silva'
                },{
					id: 654,
                    nomeCidadao: 'Usuário sem cartão vinculado',
					cpf: '123456',
					numeroDocumento: '789456',
					dataNascimento: '30/07/1984',
					nomeMae: 'Usuário sem cartão'
                }];
				delete $scope.mensagemServidor;
				// $scope.espera = CartaoServico.filtrar(filtroCadastro, callbackSucessoFiltro, callbackErroFiltro);
			}

			$scope.carregarCartao = function(id) {
				$scope.cadastros = [];
				delete $scope.mensagemServidor;

				// $scope.espera = CartaoServico.detalhar(id, callbackSucessoFiltro, callbackErroFiltro);
			}

			var callbackSucessoFiltro = function(resposta) {
				if (!resposta.data.length) {
					resposta.data = [resposta.data];
				}
				$scope.cadastros = $scope.cadastros.concat(resposta.data);
				$scope.filtro.aberto = false;
			}

			var callbackErroFiltro = function(resposta) {
				if (resposta.status == 404 && $scope.cadastros.length == 0) {
					$scope.mensagemServidor = MensagensFabrica.get(20008);
				} else {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
				}
			}

			$scope.limpar = function() {
				$scope.formFiltro.$setPristine();
				$scope.formFiltro.$setUntouched();
				$scope.filtroCadastro.cpf = '';
				$scope.filtroCadastro.numeroDocumento = '';
				$scope.filtroCadastro.dataNascimento = '';
				$scope.filtroCadastro.nomeCidadao = '';
				$scope.mensagemServidor = '';
			};
		}
	});
})();