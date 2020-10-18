//create map
const map = L.map('mapid').setView([-7.1093084,-34.8847347], 15);

//create and add tileLayer
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//create icon
const icon = L.icon({
    iconUrl: "./images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68]
})

let marker; //let permite que o conteúdo do marker seja alterado em algum momento 

//create and add marker
map.on("click", (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    //seletor de input escondido
    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    //remove icon
    marker && map.removeLayer(marker) //se houver marker então faça isso

    //add icon layer
    marker = L.marker([lat, lng], {icon})
    .addTo(map)    
})

//add image fields
function addPhotoField() {
    //pegar container de fotos #images
    const container = document.querySelector('#images')

    //pegar container para duplicar .new-upload
    const fieldsContainer = document.querySelectorAll('.new-upload')

    //realizar o clone da última imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)

    //verificar se o campo está vazio, se sim não adiciona um novo ao container de imagens
    const input = newFieldContainer.children[0]
    if (input.value == "") {
        return
    }

    //limpar campo antes de adicionar ao container de imagens
    input.value = ""

    //NOVA FUNCIONALIDADE: condicional para limitar quantidade de uploads a 6 imagens
    const gallery = fieldsContainer.length
    if (gallery < 6) {
        //adicionar o clone ao container de #images
        container.appendChild(newFieldContainer)
    } else {
        alert("Limite máximo de " + fieldsContainer.length + " imagens atingido.")
        return
    }
}

function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if (fieldsContainer.length <= 1) {
        //limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    //deletar o campo
    span.parentNode.remove()

}

// select yes or no button
function toggleSelect(event) {

    //retirar a classe .active dos botoes
    document.querySelectorAll('.button-select button')
    .forEach(function(button){button.classList.remove('active')})
    //ou .forEach(button => button.classList.remove('active'))

    //colocar a class .active no botao selecionado
    const button = event.currentTarget
    button.classList.add('active')

    //atualizar o input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')

    //verificar o valor sim ou nao
    input.value = button.dataset.value

}

//DESAFIO do Mayk: validar se lat e lng estão preenchidos
function validate(event) {
    //pegar campo, verificar se value está vazio com if e criar o event
    const needsLatAndLng = document.querySelector('[name="lat"], [name="lng"]')

    //verificar se campo esta vazio. se sim, mudar variavel para false
    if(needsLatAndLng.value == "") {
        event.preventDefault()
        alert('Selecione um ponto no mapa.')
    }
}
