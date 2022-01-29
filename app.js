//  TODO - Elementleri secme
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearsLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();



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
                ui.addSearchedUserToUi(username);
                Storage.addSearchedUserToStorage(username);
                 ui.showUserInfo(response.user);
                 ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err))
    }
    ui.clearInput();//input temizleme
    
    e.preventDefault();//Sayfamizin yenilenmesini onlemek icin 
}
function clearAllSearched(){
    //tum aranananlari temizle
    if(confirm("Emin misiniz?")){
        //Silme
        Storage.clearAllSearchedUsersFromStorage(); //Storagedan temizleyecek
        ui.clearAllSearchedFromUI();
    }

   
}
function getAllSearched(){
    //storageden bilgimizi alicaz arayuzumuze ekliyecez
    //Arananlari storageden al ve ui a ekle
    let users =Storage.getSearchedUsersFormStorages();
    
     let resoult = "";   
    users.forEach(user => {
       resoult += `<li class="list-group-item">${user}</li>`;
    });
    lastUsers.innerHTML = resoult;
}