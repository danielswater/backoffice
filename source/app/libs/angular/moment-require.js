//Arquivo criado para utilizar moment JS com require
define('moment-require',['moment', 'moment-pt-br'], function (moment) {
	moment.locale('pt-BR');
    window.moment = moment;
});