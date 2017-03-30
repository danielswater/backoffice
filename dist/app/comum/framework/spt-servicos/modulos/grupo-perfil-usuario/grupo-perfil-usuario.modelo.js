class GrupoPerfilUsuarioModelo {
  constructor(id = null, nomeGrupoPerfil = null, nomeExibicaoPerfil = null) {
    this.id = id;
    this.nomeGrupoPerfil = nomeGrupoPerfil;
    this.nomeExibicaoPerfil = nomeExibicaoPerfil;
  }
}


try {
  module.exports = exports = GrupoPerfilUsuarioModelo;
} catch (e) {
  exports = GrupoPerfilUsuarioModelo;
}