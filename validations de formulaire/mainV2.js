//ciblage du formulaire
const formConnect = document.getElementById('formConnect');
//on cible les elements du formulaires
const firstname = document.getElementById('connect-first');
const userName = document.getElementById('connect-name') ;
const mail = document.getElementById('connect-mail');
//regex régles à respecter
const regName = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
const regMail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;


//evenement input pour aide à la saisie en direct
formConnect.addEventListener('input',function(e){
    if(e.target.id == 'connect-first'){
        if(firstname.value.length <2 || firstname.value.length >10){
            controlMsg(firstname,'doit contenir entre 2 et 10 caractères',false);

        }else if(!regName.test(firstname.value)){
            controlMsg(firstname,'le format est incorrect',false);

        }else{
            controlMsg(firstname,'',true);
        }; 
    };

    if(e.target.id == 'connect-name'){
        if(userName.value.length <2 || userName.value.length >10){
            controlMsg(userName,'doit contenir entre 2 et 10 caractères',false);

        }else if(!regName.test(userName.value)){
            controlMsg(userName,'le format est incorrect',false);

        }else{
            controlMsg(userName,'',true);
        };        
    };

    if(e.target.id == 'connect-mail'){
        if(!regMail.test(mail.value)){

            controlMsg(mail,'Veuillez saisir un format mail correct',false);
        }else{
            controlMsg(mail,'',true);
        };        
    };
});

// Soumission du formulaire
formConnect.addEventListener('submit',function(e){
    //on supprime les espaces des valeurs données dans les input avant controle
    const firstNameValue = firstname.value.trim();
    const userNameValue = userName.value.trim();
    const mailValue = mail.value.trim();

    let error;

    //verification des données 

    //verification du prenom
    if(firstNameValue.length <2 || firstNameValue.length >10){  
        error=true;
        controlMsg(firstname,'!! doit contenir entre 2 et 10 caractères !!',false);
    }
    if(!regName.test(firstNameValue.value)){  
        error=true;
        controlMsg(firstname,'!! le format est incorrect !!',false);
    }
    if(firstNameValue === ""){
        error=true
        controlMsg(firstname,'!! Ce Champ doit être renseigné !!',false);
    }

    //verification du nom
    if(userNameValue.length <2 || userNameValue.length >10){
        console.log('taille')
        error=true;
        controlMsg(userName,'!! doit contenir entre 2 et 10 caractères !!',false);
    }
    if(!regName.test(userNameValue)){  
        console.log('regex')
        error=true;
        controlMsg(userName,'!! le format est incorrect !!',false);
    }
    if(userName.value === ""){
        console.log('vide')
        error=true;
        controlMsg(userName,'!! Ce Champ doit être renseigné !!',false);
    }
    
    //verification du mail
    if(!regMail.test(mailValue)){
        error=true;
        controlMsg(mail,'!! Veuillez saisir un format mail correct !!',false)
    }
    if(mail.value === ""){
        error=true;
        controlMsg(mail,'!! Ce Champ doit être renseigné !!',false);
    }

    //blocage ou envoi du formulaire 
    if(error){
        e.preventDefault();
        alert('le formulaire n\'est pas envoyé, veuillez resaisir les champs en erreurs');
    }else{
        alert('ok');
    }
});

// verification des données avant lors de la soumission du formulaire
/*function inputsCheck(){
    
    //recuperation des valeurs des inputs
    const firstNameValue = firstname.value.trim();
    const userNameValue = userName.value.trim();
    const mailValue = mail.value.trim();

    //verification des données 
    if(firstNameValue === ""){
        
        controlMsg(firstname,'! Ce Champ doit être renseigné',false);
    }else if(firstNameValue.length <2 || firstNameValue.length >10){  
          
        controlMsg(firstname,'! doit contenir entre 2 et 10 caractères',false);
    }else{
        controlMsg(firstname,'',true);
    }
};*/

// Gestion message et style des erreurs de données
function controlMsg(input, message,valid){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    
    small.innerText = message;

    if(!valid){
        formControl.classList.add('error');
        formControl.classList.remove('success'); 
    }else{
        formControl.classList.add('success'); 
        formControl.classList.remove('error');    
    }
};