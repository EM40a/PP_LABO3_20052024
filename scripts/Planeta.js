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

  checkDistancia() {
    if (isNaN(this.distancia) || this.distancia < 0) {
      return {
        success: false,
        response: "La distancia debe ser un número mayor a 0",
      };
    }

    return { success: true, response: null };
  }
}
