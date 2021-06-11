const api = {
    key: '9e122cd782b2d0333f5fe4e7fa192062',
    url: `https://api.openweathermap.org/data/2.5/weather`
}


const clima = document.getElementById('clima');

const ciudad = document.getElementById('ciudad');
const date = document.getElementById('date');
const img = document.getElementById('img');
const img2 = document.getElementById('img2')
const temp = document.getElementById('temp');
const nubes = document.getElementById('nubes');
const rango = document.getElementById('rango');

function updateImages(data) {
    const temp = toCelcius(data.main.temp);
    let src = 'image/temperatura.png';
    if (temp > 26) {
        src = 'image/calor.png'
    } else if (temp < 20){
        src='image/frio.png'
    }
    img.src = src;
}

function weatherImage(data) {
    const nubes = data.clouds.all;

    console.log(nubes);
    let src = 'image/dom.png';
   
    if (nubes >= 75){

        src = 'image/nubes.png';
        console.log("object 75");

    }else if (nubes >= 50 && nubes < 75){

        src = 'image/nube.png';
        console.log("object 50");

    }else if (nubes >= 25 && nubes < 50){

        src = 'image/nube.png';
        console.log("object 50");

    }

   

    img2.src = src;
}

async function buscar(query) {
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();
        console.log(data);

        if (data.main.temp) {
            clima.style.display = 'block';
        }

        ciudad.innerHTML = `${data.name}-${data.sys.country}`;
        temp.innerHTML = toCelcius(data.main.temp)+"°C";
        nubes.innerHTML = data.weather[0].description;
        rango.innerHTML = `${toCelcius(data.main.temp_max)+"°C"} / ${toCelcius(data.main.temp_min)+"°C"}`
        updateImages(data);
        weatherImage(data);
    } catch (error) {
        alert('hubo un error')
    }
}

function toCelcius(temp) {
    return Math.round(temp - 273.15)
}

function onSubmit(e) {
    e.preventDefault();
    buscar(buscador.value);
    
}

const formulario = document.getElementById('formulario');
const buscador = document.getElementById('buscador');

formulario.addEventListener('submit', onSubmit, true);