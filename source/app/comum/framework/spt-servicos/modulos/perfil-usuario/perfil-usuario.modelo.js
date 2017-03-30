class PerfilUsuarioModelo {
  constructor(id = null, nomeGrupoPerfil = null, nomeExibicaoPerfil = null, grupoPerfil = null, politicaPublica = null, situacaoCadastral = null, registro = null) {
    this.id = id;
    this.nomePerfil = nomePerfil;
    this.nomeExibicaoPerfil = nomeExibicaoPerfil;
    this.grupoPerfil = grupoPerfil;
    this.politicaPublica = politicaPublica;
    this.situacaoCadastral = situacaoCadastral;
    this.registro = registro;
  }
}

try {
  module.exports = exports = PerfilUsuarioModelo;
} catch (e) {
  exports = PerfilUsuarioModelo;
}