define(['angularAMD'], function(app) {

app.factory('DataUtilsFabrica', DataUtilsFabrica);

DataUtilsFabrica.$inject = [];

function DataUtilsFabrica() {
	return {
		getAnoAtual: function() {
			return moment().format('YYYY');
		},
		getAnosIntervalo: function(intervalo) {
			var ano = parseInt(moment().format('YYYY'));
			var anosIntervalo = [];

			for (i = -intervalo; i <= intervalo; i++) {
				anosIntervalo.push({
					nome: ano + i,
					valor: ano + i
				});
			}

			return anosIntervalo;
		},
		formataData: function(data) {
			switch (true) {
				case new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}").test(data):
					data = data.split('/');
					data = data[2] + "-" + data[1] + "-" + data[0];
					break;
				case angular.isDate(new Date(data)):
					data = moment(data).format("YYYY-MM-DD");
					break;
			}

			return data;
		},
		formataDataInput: function(data) {
			return moment(data).format("DD/MM/YYYY");
		},
		getMesesDoAno: function() {
			return [{
				valor: 1,
				nome: "Janeiro"
			}, {
				valor: 2,
				nome: "Fevereiro"
			}, {
				valor: 3,
				nome: "Março"
			}, {
				valor: 4,
				nome: "Abril"
			}, {
				valor: 5,
				nome: "Maio"
			}, {
				valor: 6,
				nome: "Junho"
			}, {
				valor: 7,
				nome: "Julho"
			}, {
				valor: 8,
				nome: "Agosto"
			}, {
				valor: 9,
				nome: "Setembro"
			}, {
				valor: 10,
				nome: "Outubro"
			}, {
				valor: 11,
				nome: "Novembro"
			}, {
				valor: 12,
				nome: "Dezembro"
			}]
		}
	}
}
});