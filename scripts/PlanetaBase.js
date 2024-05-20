export default class PlanetaBase {
  constructor(id, nombre, masa, tamano, tipo) {
    this.id = id;
    this.nombre = nombre;
    this.masa = masa;
    this.tamano = +tamano;
    this.tipo = tipo;
  }

  verificar() {
    console.log(this);
    return (
      this.checkNombre() ||
      this.checkMasa() ||
      this.checkTamano() ||
      this.checkTipo()
    );
  }

  checkTipo() {
    switch (this.tipo.toLowerCase()) {
      case "rocoso":
      case "gaseoso":
      case "enano":
      case "helado":
        return { success: true, response: null };
      default:
        return {
          success: false,
          response: "Tipo invalido",
        };
    }
  }

  checkTamano() {
    if (isNaN(this.tamano) || this.tamano < 0) {
      return {
        success: false,
        response: "El tamaño debe ser un número mayor a 0",
      };
    }

    return { success: true, response: null };
  }

  checkMasa() {
    if (isNaN(this.masa) || this.masa <= 0) {
      return {
        success: false,
        response: "La masa debe ser un número mayor a 0",
      };
    }

    return { success: true, response: null };
  }

  checkNombre() {
    if (this.nombre.length < 4) {
      return { success: false, response: "El nombre es muy corto" };
    }

    return { success: true, response: null };
  }
}
