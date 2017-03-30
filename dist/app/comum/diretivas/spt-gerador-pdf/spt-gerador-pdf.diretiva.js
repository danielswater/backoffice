/**
 * @directive = sptGeradorPdf
 *
 * Diretiva para criar arquivos PDF
 * 
 * @date = 2017-03-21 15:34
 * @creator = Luciano M. Almeida - nickmarinho@gmail.com
 * @contrib = Nelson Francisco - nelsondelega@gmail.com
 */
define(['angularAMD','jspdf','jspdf-autotable'], function(app,jsPDF) {

	app.directive('sptGeradorPdf', ['$rootScope',

		function sptGeradorPdf($rootScope) {

			return {
				scope: {
					titulo: '@?',
					colunas: '@?',
					conteudo: '@?',
					nomearquivo: '@?',
				},
				replace: true,
				link: function(scope, element, attrs) {
					element.on('click', function() {
						var pdf = new jsPDF();
						var totalPagesExp = "{total_pages_count_string}";
						var base64Img = "data:image/png;base64,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";

						var pageContent = function (data) {
							// HEADER
							pdf.setFontSize(20);
							pdf.setTextColor(40);
							pdf.setFontStyle('normal');
							pdf.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
							pdf.text(scope.titulo, data.settings.margin.left + 15, 22);

							// FOOTER
							var str = "Página " + data.pageCount;
							// Total page number plugin only available in jspdf v1.0+
							if (typeof pdf.putTotalPages === 'function') {
								str = str + " de " + totalPagesExp;
							}
							pdf.setFontSize(10);
							pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 10);
						};

						var colunas = angular.fromJson(scope.colunas);
						var conteudo = angular.fromJson(scope.conteudo || '[]');

						pdf.autoTable(colunas, conteudo, {
							addPageContent: pageContent,
							margin: {top: 30}
						});

						// Total page number plugin only available in jspdf v1.0+
						if (typeof pdf.putTotalPages === 'function') {
							pdf.putTotalPages(totalPagesExp);
						}

						pdf.save(scope.nomearquivo);
					})
				}
			}
		}

	]);

});