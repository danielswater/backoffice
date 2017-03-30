define(['angularAMD'], function (app) {

    app.factory('HttpInterceptador', HttpInterceptador);

    HttpInterceptador.$inject = ['$q'];

    /**
     * Intercepta as chamadas http para encriptar os parametros passados na query string
     */
    function HttpInterceptador($q) {
        return {
            request: function (config) {
                // Os parametros vem dentro de config.params.
                // Por padrao, estamos passando os parametros da query string dentro de dataParam
                if (config.params && config.params.dataParam) {
                    var defer = $q.defer();
                    require(["crypto-js"], function (CryptoJS) {
                        // Encrypt
                        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(config.params.dataParam), 'teste');
                        config.params.dataParam = ciphertext.toString();
                        defer.resolve(config);
                    });
                    return defer.promise
                } else {
                    return config;
                }
            }
        }
    }
});