define(['angularAMD'], function(app) {
	// Sobrescrevendo as opcoes padrao
	app.value('cgBusyDefaults', {
		message: 'Por favor, aguarde...',
		templateUrl: "app/comum/framework/montreal-espera/carregando.html"
	});
});