const formInscr = document.forms['connect'];
const userFirstname = formInscr['firstname'];
const userName = formInscr['name'];
const userMail = formInscr['mail'];
const userPseudo = formInscr['pseudo'];
const regName = /^[a-zA-ZéèîïÉÈÎÏ]{2,}([-'\s][a-zA-ZéèîïÉÈÎÏ]+)?$/;
const regName2 = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
const regMail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;
const regPseudo= /^(.){3,10}$/;
let error;

function isNotEmpty(form){
    let NbInputs = form.length-1; // on compte tous les champs du formulaire moins le bouton
    let nbInputNonVide=0; // pour verifier que tous les champs soient controlés
    const optionnalInputs = userPseudo; // si des champs son optionnels on saute la condition qui demande a remplir le champ et on passe a la validation dans le else

    //---- CONTROLE GENERIQUE sur champs vides----//
    for(i=0; i<NbInputs; i++){ 
        if(form[i].value == "" && !optionnalInputs){
            controlMsg(form[i],'!! veuillez remplir ce champ !!',false);
             error = true;
        }else{
            nbInputNonVide++
            controlMsg(form[i],'',true);    
        }   
    }
    //si le nb de champs non vide est = au nb de champs du formulaire alors verif OK
    if(nbInputNonVide == NbInputs){ 
        error = false; // les champs sont remplis pas d'erreur : on peut controler les données
    }
}

function validateRegex(input,inputValue,regex){
     if(!regex.test(inputValue)){
        error=true;
        controlMsg(input, "Champ non renseigné ou format incorrect",false);
    }
 //   if(inputValue == ""){
   //     controlMsg(input, "Veuillez remplir ce champ regex",false);
     //   error=true;
    //}    
}

//fonction de gestion des erreurs et styles erreur
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

formInscr.addEventListener('submit',function(e){
    const userFirstnameValue = userFirstname.value.trim(); //suppression des espaces.
    const userNameValue = userName.value.trim();
    const userMailValue = userMail.value.trim();
    const userPseudoValue = userPseudo.value.trim();
   
    isNotEmpty(formInscr);
    validateRegex(userFirstname,userFirstnameValue,regName);
    validateRegex(userName,userNameValue,regName);
    validateRegex(userMail,userMailValue,regMail);

    
   if(userPseudoValue && (userPseudoValue.length <3 || userPseudoValue.length >10)){
       controlMsg(userPseudo,'entre 3 et 10 caractères attendus',false);
       error=true;
   }

    // validation finale envoie du formulaire
    if(error){
        e.preventDefault();
        alert('Formulaire non envoyé : Merci de vérifier les donnnées renseignés')
    }else{
        alert('Formulaire envoyé');
    }
})




    


