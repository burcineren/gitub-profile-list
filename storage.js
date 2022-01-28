class Storage{
        
    static getSearchedUsersFormStorages(){
        //Tum kullanicilari al
            let users;
        if(localStorage.getItem("searched") === null){
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }
    static addSearchedUserToStorage(username){
        //Kullanici ekle
        let users = this.getSearchedUsersFormStorages(); //this burada storage seklinde de kullabilirdik
        
        //Usernae i indexOf ile sorgularsak ve bize -1 degerini donerse o username users arayinde yoktur demektir.
        if(users.indexOf(username) === -1){
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));
    }
    static clearAllSearchedUsersFromStorage(){
        //Tum kullanicilari silent

        localStorage.removeItem("searched");
    }
}