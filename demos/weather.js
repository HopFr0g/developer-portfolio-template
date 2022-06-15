const contenedorCargando = document.querySelector(".clima__pantalla-carga");
const selectorDistrito = document.querySelector(".clima__selector-distrito");
const selectorLocalidad = document.querySelector(".clima__selector-localidad");

const resultadoLocalidad = document.querySelector(".clima__resultado-localidad");
const resultadoDistrito = document.querySelector(".clima__resultado-distrito");
const resultadoTemperatura = document.querySelector(".clima__resultado-temperatura");
const resultadoDescripcion = document.querySelector(".clima__resultado-descripcion");

let jsonClima;

selectorDistrito.addEventListener("change", (event)=>{
	ocultarClima();
	cargarLocalidades(event.target.value);
});

selectorLocalidad.addEventListener("change", (event)=>{
	ocultarClima();
	mostrarClima(event.target.value);
});

const ocultarClima = () => {
	resultadoLocalidad.innerHTML = "";
	resultadoDistrito.innerHTML = "";
	resultadoTemperatura.innerHTML = "";
	resultadoDescripcion.innerHTML = "";
}

const mostrarClima = id => {
	for (let i of jsonClima) {
		if (i._id == id) {
			resultadoLocalidad.innerHTML = i.name;
			resultadoDistrito.innerHTML = i.province.toUpperCase();
			resultadoTemperatura.innerHTML = i.weather.temp + " °C";
			resultadoDescripcion.innerHTML = i.weather.description;
			break;
		}
	}
}

const cargarLocalidades = distrito => {
	selectorLocalidad.innerHTML = `<option value="">Selecciona una localidad</option>`;

	if (distrito == "") {
		selectorLocalidad.style.display = "none";
	} else {
		selectorLocalidad.removeAttribute("style");

		let localidadesHTML = "";
		for (let i of jsonClima) {
			if (i.province == distrito)
				localidadesHTML += `<option value="${i._id}">${i.name}</option>`
		}

		selectorLocalidad.innerHTML += localidadesHTML;
	}
}

const ordenarJsonClima = estructuraJson => {
	// algoritmo bubble sort, modificado para ordenar la estructura JSON según province (distrito) y según name (localidad):
	let iteraciones = estructuraJson.length - 1;

	for (let i = 0; i < iteraciones; ++i) {
		for (let j = 0; j < iteraciones - i; ++j) {
			if (estructuraJson[j].province > estructuraJson[j + 1].province || (estructuraJson[j].province == estructuraJson[j + 1].province && estructuraJson[j].name > estructuraJson[j + 1].name)) {
				// swap:
				let aux = estructuraJson[j];
				estructuraJson[j] = estructuraJson[j + 1];
				estructuraJson[j + 1] = aux;
			}
		}
	}

	return estructuraJson;
}

const imprimirProvincias = estructuraJson => {
	let ultimoDistrito = "";
	let distritosHTML = "";
	for (let i of estructuraJson) {
		if (i.province != ultimoDistrito) {
			distritosHTML += `<option value="${i.province}">${i.province}</option>`;
			ultimoDistrito = i.province;
		}
	}
	selectorDistrito.innerHTML += distritosHTML;
	return true;
}

const cargarClimas = async () => {
	let peticion = await fetch("https://ws.smn.gob.ar/map_items/weather");

	let respuesta = await peticion.json();

	jsonClima = ordenarJsonClima(respuesta);

	let provinciasImpresas = imprimirProvincias(jsonClima);

	if (provinciasImpresas)
		contenedorCargando.style.display = "none";
}

cargarClimas();