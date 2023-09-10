// Identificando elementos

const carro = document.querySelector('#carro');
const listaCursos = document.querySelector('#lista-cursos');
const botonVaciarCarro = document.querySelector('#vaciar-carro');
const contenidoCarro = document.querySelector('#carro tbody');

let productosCarro = [];

listaCursos.addEventListener('click', agregarCurso);
botonVaciarCarro.addEventListener('click', vaciarCarro);
carro.addEventListener('click', eliminarCurso);

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carro')) {
        getDatosCursos(e.target.parentElement.parentElement);
    }
}

function getDatosCursos(c) {
    const datosCursos = {
        imagen: c.querySelector('img').src,
        tituloCurso: c.querySelector('h4').textContent,
        precio: c.querySelector('.precio span').textContent,
        id_curso: c.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    for (const p in productosCarro) {
        if (productosCarro[p].id_curso == datosCursos.id_curso) {
            productosCarro[p].cantidad++;
            agregarACarro();
            return
        }
    }

    productosCarro.push(datosCursos)

    agregarACarro();
}


function agregarACarro() {
    console.log(productosCarro);
        
    limpiarCarro();

    productosCarro.forEach(curso => {
        const filaTabla = document.createElement('tr');
        filaTabla.innerHTML = `<td> <img src="${curso.imagen}" width='150%'> </td>
                                <td style="text-align: center; font-size: .8em">${curso.tituloCurso}</td>
                                <td style="text-align: center; font-size: .8em">${curso.precio}</td>
                                <td style="text-align: center; font-size: .8em">${curso.cantidad}</td>
                                <td> <a href="#" class="borrar-curso" dataId="${curso.id_curso}"> X </a> </td>`;
        
        
        contenidoCarro.appendChild(filaTabla);
    })
    mostrarTotal();
    
}

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('dataId')
        productosCarro = productosCarro.filter(el => el.id_curso != cursoId)

        console.log(productosCarro);

        agregarACarro()
    }
    mostrarTotal()
}

function limpiarCarro() {
    contenidoCarro.innerHTML = ''
    
}

function vaciarCarro() {
    productosCarro = []
    limpiarCarro()
}

function calcularTotal() {
    let total = 0;

    productosCarro.forEach( producto => total += parseFloat(producto.precio) * producto.cantidad)

    return total
}

function mostrarTotal() {
    const elemTotal = document.querySelector('#total-carro span');

    elemTotal.textContent = calcularTotal()
}