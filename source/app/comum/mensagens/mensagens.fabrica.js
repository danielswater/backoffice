define(['angularAMD', 'mensagens', 'mapa-mensagens'], function (app) {

	app.factory('MensagensFabrica', MensagensFabrica);

	MensagensFabrica.$inject = [];

	function MensagensFabrica() {

		var geraMensagem = function (resposta) {

			if (resposta.MensagemControle != undefined) {
				return {
					"tipo": "SUCESSO",
					"class": "mensagem-sucesso",
					"data": resposta.MensagemControle
				}
			} else {
				return {
					"tipo": "ERRO",
					"class": "mensagem-erro",
					"data": resposta.MensagemErro
				}
			}
		}

		var geraMensagemViaMapa = function (codigo) {
			return mensagem = _.find(getMensagens(), {
				"codigo": parseInt(codigo)
			});
		}

		return {
			get: function (codigo) {
				return geraMensagemViaMapa(codigo);
			},

			getViaMapa: function (contexto, tipo) {
				var mapa = _.find(getMapaMensagens(), {
					'contexto': contexto,
					'tipo': [tipo]
				});
				// console.log(geraMensagemViaMapa(mapa.codigo));
				return geraMensagemViaMapa(mapa.codigo);
			}
		}
	}
});