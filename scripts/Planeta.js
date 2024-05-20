import PlanetaBase from "./PlanetaBase.js";

export default class Planeta extends PlanetaBase {
  constructor(
    id,
    nombre,
    masa,
    tamano,
    tipo,
    distancia,
    vida,
    anillo,
    composicion
  ) {
    super(id, nombre, masa, tamano, tipo);

    this.distancia = +distancia;
    this.vida = vida;
    this.anillo = anillo;
    this.composicion = composicion;
  }

  verificar() {
    const respuesta = super.verificar();

    if (!respuesta.success) {
      return respuesta;
    }

    const checkDistancia = super.checkNum(this.distancia);

    if (!checkDistancia.success) {
      return {
        success: false,
        response: "Distancia inválida",
      };
    }

    if (!super.checkCadena(this.composicion)) {
      return {
        success: false,
        response: "Composición inválida",
      };
    }

    return { success: true, response: null };
  }
}
