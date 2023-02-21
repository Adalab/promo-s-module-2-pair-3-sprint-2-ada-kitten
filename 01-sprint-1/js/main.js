'use strict';

/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMessageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');

//Objetos con cada gatito
/* const kittenData_1 = {
  image: 'https://dev.adalab.es/gato-siames.webp',
  name: 'Anastacio',
  desc: 'Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.',
  race: 'Siamés',
};
const kittenData_2 = {
  image: 'https://dev.adalab.es/sphynx-gato.webp',
  name: 'Fiona',
  desc: 'Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.',
  race: 'Sphynx',
};
const kittenData_3 = {
  image: 'https://dev.adalab.es/maine-coon-cat.webp',
  name: 'Cielo',
  desc: ' Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.',
  race: 'Maine Coon',
}; */

const newKittenDataObject = {
  image: '',
  name: '',
  desc: '',
  race: '',
};

let kittenDataList = [];
/* const kittenDataList = [kittenData_1,kittenData_2,kittenData_3]; */

const GITHUB_USER = '<NataliaBlanco>';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;

//Funciones
function renderKitten(kittenData) {
  const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
  return kitten;
}

function renderKittenList(kittenDataList) {
  listElement.innerHTML = '';
  for (const kittenItem of kittenDataList) {
    listElement.innerHTML += renderKitten(kittenItem);
  }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
  newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
  newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
  event.preventDefault();
  if (newFormElement.classList.contains('collapsed')) {
    showNewCatForm();
  } else {
    hideNewCatForm();
  }
}
//Adicionar nuevo gatito
/* function addNewKitten(event) {
  event.preventDefault();
  const valueDesc = inputDesc.value;
  const valuePhoto = inputPhoto.value;
  const valueName = inputName.value;
  if (valueDesc === '' && valuePhoto === '' && valueName === '') {
    labelMessageError.innerHTML = '¡Uy! parece que has olvidado algo';
  } else {
    if (valueDesc !== '' && valuePhoto !== '' && valueName !== '') {
      labelMessageError.innerHTML = '';
    }
  }
}
 */
function addNewKitten(event) {
  event.preventDefault();
  newKittenDataObject.image = inputPhoto.value;
  newKittenDataObject.name = inputName.value;
  newKittenDataObject.desc = inputDesc.value;
  if (
    newKittenDataObject.desc === '' &&
    newKittenDataObject.image === '' &&
    newKittenDataObject.name === ''
  ) {
    labelMessageError.innerHTML = '¡Uy! parece que has olvidado algo';
  } else {
    if (
      newKittenDataObject.desc !== '' &&
      newKittenDataObject.image !== '' &&
      newKittenDataObject.name !== ''
    ) {
      labelMessageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
    }
  }
  kittenDataList.push(newKittenDataObject);
  renderKittenList(kittenDataList);
}
//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
  event.preventDefault();
  newFormElement.classList.add('collapsed');
  inputDesc.value = '';
  inputPhoto.value = '';
  inputName.value = '';
}

//Filtrar por descripción
/* function filterKitten(event) {
  event.preventDefault();
  const descrSearchText = input_search_desc.value;
  listElement.innerHTML = '';
  for (const kittenItem of kittenDataList) {
    if (kittenItem.desc.includes(descrSearchText)) {
      listElement.innerHTML += renderKitten(kittenItem);
    }
  }
} */

function filterKitten(event) {
  event.preventDefault();
  const descrSearchText = input_search_desc.value;
  const raceSearchText = input_search_race.value;
  listElement.innerHTML = '';
  const resultKittens = kittenDataList
    .filter((resultKitten) => resultKitten.desc.includes(descrSearchText))
    .filter((resultKitten) => resultKitten.race.includes(raceSearchText));

  renderKittenList(resultKittens);
}

//Mostrar el litado de gatitos en ell HTML
renderKittenList(kittenDataList);

/*fetch(SERVER_URL, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
})
  .then((response) => response.json())
  .then((data) => {
    kittenDataList = data.results.map((cat) => ({
      name: cat.name,
      desc: cat.desc,
      image: cat.image,
      race: cat.race,
    }));
    renderKittenList(kittenDataList);
  });
console.log(kittenDataList); */


//Guardar en el local storage

const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

// Modifica la petición al servidor que hiciste en la sesión anterior, para que solo se realice la petición cuando no hay gatitos en el local storage.

if (kittenListStored) {
  //si existe el listado de gatitos en el local storage
  // vuelve a pintar el listado de gatitos
  console.log('SÍ hay gatitos en el localStorage'); 
  kittenDataList = kittenListStored; 
  renderKittenList(kittenDataList);
  } else {
  //sino existe el listado de gatitos en el local storage
  //haz la petición al servidor
  fetch(SERVER_URL)
    .then((response) => response.json())
    .then((data) => {
      kittenDataList = data.results.map((cat) => ({
        name: cat.name,
        desc: cat.desc,
        image: cat.image,
        race: cat.race,
      }));
      localStorage.setItem('kittensList', JSON.stringify(data.results)); 
      kittenDataList=data.results; 
      renderKittenList(kittenDataList);
      console.log('GUARDO gatitos en el localStorage'); 
    })
    .catch((error) => {
      console.error(error);
    });
  }


//Eventos
linkNewFormElememt.addEventListener('click', handleClickNewCatForm);
searchButton.addEventListener('click', filterKitten);
buttonAdd.addEventListener('click', addNewKitten);
buttonCancelForm.addEventListener('click', cancelNewKitten);


