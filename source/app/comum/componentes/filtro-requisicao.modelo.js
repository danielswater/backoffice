define(['angularAMD'], function(app) {

	app.factory("FiltroRequisicao", FiltroRequisicao)

	FiltroRequisicao.$inject = ['PAGINACAO'];

	function FiltroRequisicao(PAGINACAO) {
		return function get(itens) {
			return {
				numeroRegistro: (!!itens) ? itens + 1 : 1,
				quantidadeRegistro: PAGINACAO.ITENS_POR_PAGINA
			};
		}
	}

	return FiltroRequisicao;

});