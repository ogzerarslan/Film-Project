const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


// ui başlatma 
const ui =new UI(); 

// storge objesi üret
const storage = new Storage();

// Tüm Eventleri Yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
    cardbody.addEventListener("click",deleteFilm)
    clear.addEventListener("click",clearAllFilms)
}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;
     
    if(title ==="" || director ==="" || url ==="")
    {
        // hata yazdırma
        ui.displayMassages("Tüm Alanları Doldurun...","danger")
    }
    else{
        const newFilm= new Film(title,director,url);
        
        ui.addFilmToUI(newFilm); // arayüze film ekleme
        storage.addFilmToStorage(newFilm); // storage film ekleme
        ui.displayMassages("Film Başarıyla Eklendi","success")

    }
    ui.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}
function deleteFilm(e){
 if(e.target.id=== "delete-film"){
    ui.deleteFilmFromUI(e.target);
    storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    
    ui.displayMassages("Film Silindi..","warning");

 }
}
function clearAllFilms(){
    if( confirm("Bütün Filmleri Silmek İstediğinize Emin Misiniz ?")){
    ui.clearAllFilmsFromUI()
    storage.clearAllFilmsFromStorage()
}
}