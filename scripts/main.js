import Planeta from "./Planeta.js";
import { escribirLs, leerLs, limpiarLs } from "./local-storage-async.js";
import { cargarDatos } from "./loader.js";
import { crearTabla, renderizarTabla, idFilaSeleccionada } from "./tabla.js";
import { $DIALOG, $BTN_SUBMIT } from "./dialog.js";

const KEY_STORAGE = "saturno";
const OBJETOS = [];

const $FORM = document.forms[0];
const $BTN_ELIMINAR = document.getElementById("btn-eliminar");
const $BTN_ELIMINAR_TODO = document.getElementById("btn-eliminar-todo");
const $BTN_MODIFICAR = document.getElementById("btn-modificar");

document.addEventListener("DOMContentLoaded", onInit);

function onInit(e) {
  handlerCargarObjetos(OBJETOS);
  handlerCargarTabla();

  $FORM.addEventListener("submit", handlerSubmit);
  $BTN_MODIFICAR.addEventListener("click", handlerModificar);
  $BTN_ELIMINAR.addEventListener("click", handlerEliminar);
  $BTN_ELIMINAR_TODO.addEventListener("click", handlerEliminarTodo);
}

async function handlerSubmit(e) {
  e.preventDefault();
  const form = e.target;

  switch ($BTN_SUBMIT.textContent) {
    case "Guardar":
      const MODEL = new Planeta(
        Date.now(),
        ...Object.values(form)
          .filter((e) => e.type !== "hidden") //? Omite el input del id
          .map((e) => (e.type === "checkbox" ? e.checked : e.value))
      );

      alta(MODEL);
      break;

    case "Actualizar":
      const objetoSeleccionado = OBJETOS.find(
        (e) => e.id == idFilaSeleccionada
      );
      modificar(objetoSeleccionado, form);
      break;
    default:
      break;
  }

  restablecerFormulario();
  $DIALOG.close();
}

function handlerModificar(e) {
  try {
    if (!idFilaSeleccionada) {
      throw new Error("No se ha seleccionado un Planeta para modificar");
    }

    const $fila = document.querySelector(`tr[data-id="${idFilaSeleccionada}"]`);

    if ($fila) {
      $BTN_SUBMIT.textContent = "Actualizar";
      $DIALOG.showModal();
    }
  } catch (error) {
    alert(error);
  }
}

function handlerEliminar(e) {
  try {
    if (!idFilaSeleccionada) {
      throw new Error("No se ha seleccionado un Planeta para eliminar");
    }

    console.warn("Eliminando...");
    const $fila = document.querySelector(`tr[data-id="${idFilaSeleccionada}"]`);

    if ($fila && confirm("¿Desea eliminar el Planeta?")) {
      cargarDatos(async () => {
        const id = $fila.getAttribute("data-id");
        let elementos = OBJETOS.filter((p) => p.id != id);

        await escribirLs(KEY_STORAGE, elementos);
        handlerCargarTabla(elementos);
      });
    }
  } catch (error) {
    alert(error);
  }
}

function handlerEliminarTodo(e) {
  cargarDatos(async () => {
    if (confirm("¿Desea eliminar todos los Items?")) {
      await limpiarLs(KEY_STORAGE);
      OBJETOS.length = 0;
      handlerCargarTabla();
    }
  });
}

async function alta(model) {
  cargarDatos(async () => {
    const respuesta = model.verificar();

    if (respuesta.success) {
      OBJETOS.push(model);

      try {
        await escribirLs(KEY_STORAGE, OBJETOS);
        restablecerFormulario();
        handlerCargarTabla();
      } catch (error) {
        alert(error);
      }
    } else {
      alert(respuesta.response);
    }
  });
}

function modificar(model, form) {
  cargarDatos(async () => {
    const propiedades = Object.keys(model).filter((e) => e !== "id");
    propiedades.forEach((field) => {
      if (form[field]) {
        model[field] = form[field].value;
      }
    });

    const respuesta = model.verificar();

    if (respuesta.success) {
      try {
        await escribirLs(KEY_STORAGE, OBJETOS);
        restablecerFormulario();
        handlerCargarTabla();
      } catch (error) {
        alert(error);
      }
    } else {
      alert(respuesta.response);
    }
  });
}

function handlerCargarObjetos(array) {
  cargarDatos(async () => {
    let objetosLs = (await leerLs(KEY_STORAGE)) || [];

    objetosLs.forEach((obj) => {
      const model = new Planeta(...Object.values(obj));
      array.push(model);
    });

    handlerCargarTabla(array);
  });
}

function restablecerFormulario() {
  $FORM.reset();
}

//? Carga la tabla con los objetos del local storage
function handlerCargarTabla(datos = OBJETOS) {
  const tabla = crearTabla(datos);
  renderizarTabla(tabla, document.getElementById("tabla-container"));
}
