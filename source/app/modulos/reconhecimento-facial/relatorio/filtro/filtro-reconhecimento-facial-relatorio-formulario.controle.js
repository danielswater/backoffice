(function() {

	'use strict';

	define(['angularAMD', 'dirPagination', './recurso.js', './comum/enum/reconhecimento-facial-tipo-relatorio.enum.js'], function(app) {

		app.controller('ReconhecimentoFacialRelatorioControle', ReconhecimentoFacialRelatorioControle);

		ReconhecimentoFacialRelatorioControle.$inject = ['$scope', '$rootScope', '$uibModal',
			'Espera', 'RelatorioRequisicao', 'ReconhecimentoFacialTipoRelatorioEnum',
			'RecursoReconhecimentoFacialRelatorio',
			'MensagensFabrica'
		]

		function ReconhecimentoFacialRelatorioControle($scope, $rootScope, $uibModal,
			Espera, RelatorioRequisicao, ReconhecimentoFacialTipoRelatorioEnum,
			RecursoReconhecimentoFacialRelatorio,
			MensagensFabrica) {

			$scope.espera = new Espera;
			$scope.tiposRelatorios = ReconhecimentoFacialTipoRelatorioEnum.getArray();
			$scope.getTipoRelatorio = ReconhecimentoFacialTipoRelatorioEnum.get;
			$scope.tipoRelatorioAntigo = {};
			$scope.mensagemServidor = {};
			$scope.filtro = {
				aberto: true
			};

			$scope.preFiltrar = function() {
				$scope.relatorio = [];
				$scope.mensagemServidor = {};

				let inicio = $scope.filtro.dataInicio.split('T');
				inicio = inicio[0];
				let fim = $scope.filtro.dataTermino.split('T');
				fim = fim[0];

				$scope.filtroValor = {
					dataInicio: inicio,
					dataTermino: fim,
					url: $scope.filtro.tipoRelatorio,
					nroRegistro: 1
				}
				$scope.filtrar(new RelatorioRequisicao($scope.filtro));
			}

			$scope.filtrar = function(relatorioRequisicao) {
				relatorioRequisicao = _.merge(relatorioRequisicao, $scope.filtroValor);

				$scope.espera.promise = RecursoReconhecimentoFacialRelatorio($scope.filtro.tipoRelatorio.url).query(
					relatorioRequisicao,
					function(resposta) {
						if (resposta != null && resposta != "null" && resposta != undefined) {
							if (resposta.ErroFotoCadastroPorLocal) {
								$scope.relatorio = $scope.relatorio.concat(resposta.ErroFotoCadastroPorLocal);
							}
							else if(resposta.ErroFotoCadastro){
								$scope.relatorio = $scope.relatorio.concat(resposta.ErroFotoCadastro);
							}
							else if(resposta.ErroFotoValidadorPorCarro){
								$scope.relatorio = $scope.relatorio.concat(resposta.ErroFotoValidadorPorCarro);
							}
							else if(resposta.AnaliseRealizada){
								$scope.relatorio = $scope.relatorio.concat(resposta.AnaliseRealizada);
							}

							$scope.tipoRelatorioAntigo = $scope.filtro.tipoRelatorio.nome;
							$scope.filtro.aberto = false;
						} else {
							$scope.mensagemServidor.descricao = "Nenhum relatório com os filtros escolhidos para exibir";
						}
					},
					function(resposta) {
						if (resposta.status == 404 && $scope.relatorio.length == 0) {
							$scope.mensagemServidor = MensagensFabrica.get(20008);
						} else {
							$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
						}
					}
				);
			};

			$scope.exportarRelatorio = function(){
				var d = new Date();
				var dia = $scope.formataData(d.getDate()); // adicionando zero antes dos numeros menores que 10
				var mes = $scope.formataData(d.getMonth()+1);
				var hora = $scope.formataData(d.getHours());
				var minuto = $scope.formataData(d.getMinutes());
				var segundo = $scope.formataData(d.getSeconds());
				var data_formatada = d.getFullYear() + "-" + mes + "-" + dia + "--" + hora + "-" + minuto + "-" + segundo;

				html2canvas(document.getElementById('relatorio'), {
					onrendered: function (canvas) {
						var data = canvas.toDataURL();
						var docDefinition = {
							header: {
								text: 'Relatório - ' + $scope.filtro.tipoRelatorio.nome,
								alignment : 'centered',
							},
							content: [{
								image: data,
								width: 500,
							}],
							footer: {
								// LOGO SPTRANS
								image: 'data:image/png;base64,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',
								width: 150,
								height: 150,
								alignment: 'right'
							},
							info: {
								title: 'Relatório - ' + $scope.filtro.tipoRelatorio.nome,
								author: 'SPTRANS',
								subject: 'Relatório - ' + $scope.filtro.tipoRelatorio.nome,
								keywords: 'relatório ' + $scope.filtro.tipoRelatorio.nome
							},
						};
						pdfMake.createPdf(docDefinition).download(data_formatada+"--"+$scope.filtro.tipoRelatorio.id+".pdf");
					}
				});
			};

			// formatar data adicionando zero para deixar os menores que 10 com zero no começo
			$scope.formataData = function(a){
				return ("0" + a).slice(-2);
			};

			$scope.limpar = function() {
				$scope.formFiltro.$setPristine();
				$scope.formFiltro.$setUntouched();
				delete $scope.filtro.NumeroCartao;
				delete $scope.filtro.tipoCartao;
				delete $scope.filtro.prefixoCarro;
				$scope.mensagemServidor = {};
				$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
			};
		}
	});
})();
