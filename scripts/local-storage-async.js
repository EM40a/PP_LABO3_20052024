//? expresado en milisegundos
const TIEMPO = 2.5 * 1000;

//? Funciones para leer y escribir en el local storage
export function leerLs(clave) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(JSON.parse(localStorage.getItem(clave)));
      } catch (error) {
        reject(error);
      }
    }, TIEMPO);
  });
}

export function escribirLs(clave, valor) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(localStorage.setItem(clave, JSON.stringify(valor)));
      } catch (error) {
        reject(error);
      }
    }, TIEMPO);
  });
}

export function limpiarLs(clave) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(localStorage.removeItem(clave));
      } catch (error) {
        reject(error);
      }
    }, TIEMPO);
  });
}
