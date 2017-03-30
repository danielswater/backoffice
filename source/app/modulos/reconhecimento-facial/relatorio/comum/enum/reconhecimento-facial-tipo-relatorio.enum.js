define(['angularAMD'], function(app) {

	app.factory('ReconhecimentoFacialTipoRelatorioEnum', ReconhecimentoFacialTipoRelatorioEnum);

	ReconhecimentoFacialTipoRelatorioEnum.$inject = [];

	function ReconhecimentoFacialTipoRelatorioEnum() {

		var tipoRelatorio = [{
			id: 1,
			nome: 'Erros de Importação de Fotos de Cadastro Por Local de Cadastramento',
			url: 'erro-foto-cadastro-por-local',
			parcial: 'parcial-erro-foto-cadastro-por-local.html'
		}, {
			id: 2,
			nome: 'Erros de Importação de Fotos de Cadastro',
			url: 'erro-foto-cadastro',
			parcial: 'parcial-erro-foto-cadastro.html'
		}, {
			id: 3,
			nome: 'Erros de Importação de Fotos de Utilização Por Carro',
			url: 'erro-foto-validador-por-carro',
			parcial: 'parcial-erro-foto-validador-por-carro.html'
		}, {
			id: 4,
			nome: 'Resumo de Análises Realizadas',
			url: 'analises-realizadas',
			parcial: 'parcial-analises-realizadas.html'
		}];

		return {
			getNome: function(id) {
				return _.find(tipoRelatorio, {'id': id}).nome;
			},

			getArray: function(){
				return tipoRelatorio;
			},

			get: function(id){
				return _.find(tipoRelatorio, {'id': parseInt(id)});
			}
		}


	}
});
