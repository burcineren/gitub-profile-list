//  TODO - Elementleri secme
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearsLastUsers = document.getElementById("clear-last-users");
const github = new Github();
const ui = new UI();

const lastUsers = document.getElementById("last-users");

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearsLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e){
    let username = nameInput.value.trim();

    if(username === ""){
        alert("Lutfen gecerli kullanici adi girin");
    }else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("Kullanici bulunamadi.");
                //hata mesaji
            }
            else{
                 ui.showUserInfo(response.user);
            }
        })
        .catch(err => ui.showError(err))
    }
    ui.clearInput();//input temizleme
    
    e.preventDefault();//Sayfamizin yenilenmesini onlemek icin 
}
function clearAllSearched(){
    //tum aranananlari temizle
   
}
function getAllSearched(){
    //storageden bilgimizi alicaz arayuzumuze ekliyecez
    //Arananlari storageden al ve ui a ekle
}