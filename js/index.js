const inputTarea = document.querySelector('#inputTarea')
const buttonAgregar =  document.querySelector('#buttonAgregar')
const listaTareas = document.querySelector('#listaTareas')

const tareas = []

const app = {
    tareas,
    inputTarea,
    listaTareas
}

window.onload = () => {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || []
    app.tareas = tareasGuardadas.map((tarea) => {
        return crearTarea(tarea.titulo, tarea.estaCompleta)
    })
    app.tareas.forEach(tarea => {
        return anadirTareaLista(tarea, app.listaTareas)
    })
}

function guardarTareasLocalStorage(tareas) {
    localStorage.setItem('tareas', JSON.stringify(tareas))
}

function crearTarea(titulo, estaCompleta = false) {
    return {
        id: Date.now(),
        titulo,
        estaCompleta
    }
}

function anadirTareaLista(tarea, listaTareas) {
    const elementoTarea = crearElementoTarea(tarea)
    listaTareas.appendChild(elementoTarea)
}

function anadirTarea(app) {
    const tituloNuevaTarea = app.inputTarea.value
    const nuevaTarea = crearTarea(tituloNuevaTarea)
    app.tareas.push(nuevaTarea)

    anadirTareaLista(nuevaTarea, app.listaTareas)
    guardarTareasLocalStorage(app.tareas)
    app.inputTarea.value = ''
}

function crearElementoTarea(tarea) {
    const elementoTarea = document.createElement('li')
    const checkboxTarea = document.createElement('input')
    checkboxTarea.type = 'checkbox'
    checkboxTarea.checked = tarea.estaCompleta
    checkboxTarea.addEventListener('change', () => {
      tarea.estaCompleta = checkboxTarea.checked
      textoTarea.classList.toggle('completed', tarea.estaCompleta)
      guardarTareasLocalStorage(app.tareas)
    })

    const textoTarea = document.createElement('span')
    textoTarea.textContent = tarea.titulo
    textoTarea.classList.toggle('completed', tarea.estaCompleta)

    const buttonBorrarTarea = document.createElement('button')
    buttonBorrarTarea.textContent = 'Eliminar'
    buttonBorrarTarea.className = 'delete-button'
    buttonBorrarTarea.addEventListener('click', (e) => {
      elementoTarea.remove()

      const indiceTarea = app.tareas.indexOf(tarea)
      if (indiceTarea > -1) {
        app.tareas.splice(indiceTarea, 1)
      }
      guardarTareasLocalStorage(app.tareas)
    }) 
    
    elementoTarea.appendChild(checkboxTarea)
    elementoTarea.appendChild(textoTarea)
    elementoTarea.appendChild(buttonBorrarTarea)

    return elementoTarea
}

buttonAgregar.addEventListener('click', (e) => {
    e.preventDefault()
    anadirTarea(app)
})