function populateUFs() {
  const ufSelect = document.querySelector("select[name = uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
      .then( states => { 
        for(const state of states) {
          ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
      })
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("[name = city]");
  const stateInput = document.querySelector("[name = state]");

  const indexOfSelectState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectState].text;

  console.log(event.target.value)

  const ufValue = event.target.value;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  
  fetch(url)
  .then( res => res.json())
    .then( cities => { 
      for(const city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
      }

      citySelect.disabled = false
    })
}

document
  .querySelector("select[name = uf]")
  .addEventListener("change", getCities)

  const itemsToCollect = document.querySelectorAll(".items-grid li");

for(let item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem (event) {
  const itemLi = event.target;
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item == itemId; //true or false
    return itemFound;
  })

  if(alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    })

    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);  //adicionar
  }

  collectedItems.value = selectedItems;
}
