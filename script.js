/**********************
 * Declaration des variables globaux
 **********************/
var tab = new Array(25);
tab=initArray(tab);
var fontImage;
var cptForbarreChargement=1;
var responseXHR;
var endload;  // CETTE VARIABLE CONTIENDRA UNE IMAGE QUI SERVIRA PAS MAIS JUSTE POUR DECLANCHER UNE FONCTION AU CHARGEMENT DE CETTE IMAGES 
var loadInProgress=true; // Pour la barre de chargement qui sera utiliser au chagement de theme
var theme="BLUE";
var startScript=true;
var username;
var tabRecuEnGlobal;


/**********************
 * FONCTIONS
 **********************/

function disconnect()
{
	var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {   
            var rep = xhr.responseText;       
			if(rep=="1")
			{
				//Effacer les listener 
				window.removeEventListener("resize", checkSizeOfScreen );
				//Effacer tout les messages du chat
				document.getElementById("allMessage").innerHTML="";
				// Remettre les variables et les style comme si on venait d'entrer dans la page
				startScript=true;
				username="";
				loadInProgress=true;
				loadImage(theme);
				var body = document.getElementsByTagName("body");
				body[0].style.backgroundImage = 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(40,40,138,1) 0%, rgba(0,212,255,1) 100%)';
				var acceuil=document.getElementById("accueil");
				var screenGame=document.getElementById("gamescreen");
				document.getElementById("errone").style.display="none";
				acceuil.style.display='block';
				screenGame.style.display='none';
				document.getElementById("disconnect").style.display="none";
			}   		
        }
    }
	xhr.open("GET","logout.php");
	xhr.send();	
}


function findPos(el) {
    var x = y = 0;
    if(el.offsetParent) {
        x = el.offsetLeft;
        y = el.offsetTop;
        while(el = el.offsetParent) {
            x += el.offsetLeft;
            y += el.offsetTop;
        }
    }
    return {'x':x, 'y':y};
}

var diffx;
	var diffy ;
	mondiv = document.getElementById("emotic");
	mondiv.onclick = function(e) {
		var ev = e || window.event;
		var pos = findPos(this);
		diffx = ev.clientX - pos.x;
		diffy = ev.clientY - pos.y+32;
		emotic();
	};

function emotic ()
{
	if (diffy >0 && diffy<=48 ) {
	
		if (diffx >0 && diffx<=38) {
			document.getElementById("message").value+= "☹️";
		}
		if (diffx >38 && diffx<=76) {
			document.getElementById("message").value+= "😑";
		}
		if (diffx >76 && diffx<=114) {
			document.getElementById("message").value+= "😊";
		}
		if (diffx >114 && diffx<=160) {
			document.getElementById("message").value+= "😀";
		}
	}
	if (diffy >48 && diffy<=86 ) {
	
		if (diffx >0 && diffx<=38) {
			document.getElementById("message").value+= "😆";
		}
		if (diffx >38 && diffx<=76) {
			document.getElementById("message").value+= "😖";
		}
		if (diffx >76 && diffx<=114) {
			document.getElementById("message").value+= "😋";
		}
		if (diffx >114 && diffx<=160) {
			document.getElementById("message").value+= "😅";
		}
	}
	if (diffy >86 && diffy<=124 ) {
	
		if (diffx >0 && diffx<=38) {
			document.getElementById("message").value+= "😪";
		}
		if (diffx >38 && diffx<=76) {
			document.getElementById("message").value+= "😁";
		}
		if (diffx >76 && diffx<=114) {
			document.getElementById("message").value+= "😴";
		}
		if (diffx >114 && diffx<=160) {
			document.getElementById("message").value+= "🤐";
		}
	}
	if (diffy >124 && diffy<=170 ) {
		if (diffx >0 && diffx<=38) {
			document.getElementById("message").value+= "😐";
		}
		if (diffx >38 && diffx<=76) {
			document.getElementById("message").value+= "☹️";
		}
		if (diffx >76 && diffx<=114) {
			document.getElementById("message").value+= "😝";
		}
		if (diffx >114 && diffx<=160) {
			document.getElementById("message").value+= "🥴";
		}
	}
	
}



//Fonction pour initialiser le tableau qui contient les images
function initArray(tab)
{
	var i;
	for(i=0; i<tab.length; i++)
	{
		tab[i] = new Array(6); // Deuxieme dimension
	}	
	return tab;
}

//Fonction pour faire une pause dans le programme
function sleep(miliseconds) {
	var currentTime = new Date().getTime();
 
	while (currentTime + miliseconds >= new Date().getTime()) {
	}
 }

 //Foction qui traite le resultat obtenu par message.php
 function traitementXhrMessage(response)
 {
	if(response!=null)
	{
		console.log(response);
		var bigdiv= document.getElementById("allMessage");
		var msgs=response.getElementsByTagName("message");
		for (let i = 0; i < msgs.length; i++) {
			/////Recuperation des infos
			var auteur = msgs[i].children[0].firstChild.nodeValue;
			var message = msgs[i].children[1].firstChild.nodeValue;
			var date = msgs[i].children[2].firstChild.nodeValue;
			var type = msgs[i].children[3].firstChild.nodeValue;
			var intonation;
			switch(type)
			{
				case "0": intonation=" \"say\" ";
				break;
				case "1": intonation=" \"whisper\" ";
				break;
				case "2": intonation=" \"hell\" ";
				break;
			}
			//////Affichage des infos
			if(auteur==username)//Si le msg est de l'utilisateur en cours
			{auteur="You ";}
			// Creation de nouveau elements
			var balA = document.createElement("a");
			var balDiv = document.createElement("div");
			var balAuteur = document.createElement("h6");
			var balDate = document.createElement("small");
			var balMessage = document.createElement("small");
			// Ajout des class et des texte pour ces elements
			balA.classList.add("list-group-item");
			balA.classList.add("list-group-item-action");
			balDiv.classList.add("d-flex");
			balDiv.classList.add("w-100");
			balDiv.classList.add("justify-content-between");
			balAuteur.classList.add("mb-1");
			var contenuForBalAuteur= document.createTextNode(auteur+intonation);
			var contenuForBalDate= document.createTextNode("at "+date);
			var contenuForBalMessage= document.createTextNode(message);
			//Inserer les elements
			balAuteur.appendChild(contenuForBalAuteur);
			balDate.appendChild(contenuForBalDate);
			balMessage.appendChild(contenuForBalMessage);
			balDiv.appendChild(balAuteur);
			balDiv.appendChild(balDate);
			balA.appendChild(balDiv);
			balA.appendChild(balMessage);
			var lastMessage= bigdiv.children[0];
			bigdiv.insertBefore(balA,lastMessage);
		}
	}

 }

 //Fonction pour le setInterval
 function myTimer() {
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange= function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var response = xhr.responseXML;
					traitementXhrMessage(response);
				}
			}
		};
		xhr.open("GET","message.php");
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send();
}

function checkSizeOfScreen(){
	var x = window.matchMedia("(max-width: 990px)");
	if (x.matches) { // If media query matches
		document.getElementById("gamescreen").style.display="none";
		document.getElementById("errone").style.display="block";
	  }
	  else
	  {
		document.getElementById("gamescreen").style.display="flex";
		document.getElementById("errone").style.display="none";
	  }
}

//Fonction qui dessine le canva
 function drawCanva(tableauCaseDevant)
{
	var canva=document.getElementById('canvagamescreen');
	var ctx=canva.getContext('2d');
	ctx.drawImage(fontImage,0,0,1155,665);
	
	// On affiche de A à C
	for (var i = 0; i < 5; i++) {
		if(tableauCaseDevant[indexOfCase(i)]!=0)
		{
			ctx.drawImage(tab[i][tableauCaseDevant[indexOfCase(i)]-1],0,0,1155,665);
		}
		
	}
	// On affiche de G à E et en dernier D
	for (var i = 10; i >= 5; i--) {
		if(tableauCaseDevant[indexOfCase(i)]!=0)
		{
			ctx.drawImage(tab[i][tableauCaseDevant[indexOfCase(i)]-1],0,0,1155,665);
		}
				
	}
	// On affiche de H à I
	for (var i = 11; i < 14; i++) {
		if(tableauCaseDevant[indexOfCase(i)]!=0)
		{
			ctx.drawImage(tab[i][tableauCaseDevant[indexOfCase(i)]-1],0,0,1155,665);
		}
				
	}
	// On affiche de L à K et en dernier J
	for (var i = 17; i >= 14; i--) {
		if(tableauCaseDevant[indexOfCase(i)]!=0)
		{
			ctx.drawImage(tab[i][tableauCaseDevant[indexOfCase(i)]-1],0,0,1155,665);
		}
				
	}
	// On affiche de M puis O puis N
	for (var i = 18; i < 20; i++) {
		if(tableauCaseDevant[indexOfCase(i)]!=0)
		{
			ctx.drawImage(tab[i][tableauCaseDevant[indexOfCase(i)]-1],0,0,1155,665);
		}
				
	}
	for (var i = 22; i >= 20; i--) {
		if(tableauCaseDevant[indexOfCase(i)]!=0)
		{
			ctx.drawImage(tab[i][tableauCaseDevant[indexOfCase(i)]-1],0,0,1155,665);
		}
				
	}
	// On affiche P et Q
	if(tableauCaseDevant[indexOfCase(23)]!=0)
		{
			ctx.drawImage(tab[23][tableauCaseDevant[indexOfCase(23)]-1],0,0,1155,665);
		}
	if(tableauCaseDevant[indexOfCase(24)]!=0)
		{
			ctx.drawImage(tab[24][tableauCaseDevant[indexOfCase(24)]-1],0,0,1155,665);
		}
		
}

//Fonction qui retourne la lettre correspondant a l'index recu en parametre
function indexOfCase(num)
{
	switch(num)
	{
		case 0: return 0;
		break;
		case 1: case 2: return 1;
		break;
		case 3: case 4: return 2;
		break;
		case 5: return 3;
		break;
		case 6: case 7: return 4;
		break;
		case 8: case 9: return 5;
		break;
		case 10: return 6;
		break;
		case 11: return 7;
		break;
		case 12: case 13: return 8;
		break;
		case 14: return 9;
		break;
		case 15: case 16: return 10;
		break;
		case 17: return 11;
		break;
		case 18: case 19: return 12;
		break;
		case 20: return 13;
		break;
		case 21: case 22: return 14;
		break;
		case 23: return 15;
		break;
		case 24: return 16;
		break;
	}
}

//Fonction qui switch vers l'enregistrement
function switchToRegister()
{
	var screenGame=document.getElementById("gamescreen");
	var login=document.getElementById("login");
	var register=document.getElementById("register");
	screenGame.style.display='none';
	login.style.display='none';
	register.style.display='block';
}

//Fonction qui traite les reponse recu par moving.php
function responseTraitement(xmlResponse)
{
	//Recuperer les elements de l'objet XML
	var positionX= xmlResponse.getElementsByTagName("PositionX")[0].firstChild.nodeValue;
	var positionY= xmlResponse.getElementsByTagName("PositionY")[0].firstChild.nodeValue;
	var orientation= xmlResponse.getElementsByTagName("Orientation")[0].firstChild.nodeValue;
	var NouvelleEtage= xmlResponse.getElementsByTagName("NouvelleEtage")[0].firstChild.nodeValue;
	var TableauDeVue= xmlResponse.getElementsByTagName("TableauDeVue")[0].firstChild.nodeValue;

	// Traitement des ces donnees
	var position=document.getElementById("spanPosition");
	position.innerHTML="("+ positionX+ ";"+positionY+")";
	var direction =document.getElementById("imgBoussole");
	switch(orientation){
		case "1": direction.src="Images/compass-S.png";
		break;
		case "2": direction.src="Images/compass-N.png";
		break;
		case "3": direction.src="Images/compass-W.png";
		break;
		case "4": direction.src="Images/compass-E.png";
		break;
	}
	
	if(NouvelleEtage=="NOTCHANGE")
	{
		if(TableauDeVue!="ERROR")
		{
			var tabRecuParMovingPhp= TableauDeVue.split(" ");
			drawCanva(tabRecuParMovingPhp);
		}
	}
	else{
		tabRecuEnGlobal=TableauDeVue.split(" ");
		loadInProgress=false;
		loadImage(NouvelleEtage);
	}
	
}

//Fonction pour faire une requete XHR a moving.php
function XhrRequestToMovingPhp(valeur)
{
	var param="valeur="+encodeURIComponent(valeur);
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange= function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					responseXHR = xhr.responseXML;
					console.log(responseXHR);	
					// Traitement de la reponse	
					responseTraitement(responseXHR);		
				}
			}
		};
		xhr.open("GET","moving.php?"+param,true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send();
}

//Fonction qui switch vers le login
function switchToLogin()
{
	var acceuil=document.getElementById("accueil");
	var screenGame=document.getElementById("gamescreen");
	var login=document.getElementById("login");
	acceuil.style.display='none';
	login.style.display='block';
	screenGame.style.display='none';	
}

//Fonction pour traiter la requete d'un mouvement demander
function RequeteXhrForMoving()
{
	var valeur;
	if(loadInProgress)  // deplacement possible seulement si on ne charge pas les images
	{
		switch(this)
		{
			case document.getElementById("imgDevant"): valeur=0;
			break; 
			case document.getElementById("imgArriere"): valeur=1;
			break; 
			case document.getElementById("imgGauche"): valeur=2;
			break; 
			case document.getElementById("imgDroite"): valeur=3;
			break; 
			case document.getElementById("imgTournerGauche"): valeur=4;
			break; 
			case document.getElementById("imgTournerDroite"): valeur=5;
			break; 
			default: valeur=-1;
		}
		XhrRequestToMovingPhp(valeur);
	}	
	
}

//Fonction pour envoyer un message a la database
function RequeteXhrForMessage()
{
	var message= document.getElementById("message").value;
	var typeMessage= document.getElementById("selectionTypeMessage").value;
	if(message.length>=4)
	{
		var param="message="+encodeURIComponent(message)+"&typeMessage="+encodeURIComponent(typeMessage);
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange= function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					document.getElementById("liveToast").classList.replace("bg-danger", "bg-success");
					document.getElementById("liveToast").innerHTML='Message envoyer <i class="fas fa-check"></i>';
					$('.toast').toast('show');
					document.getElementById("message").value="";
				}
			}
		};
		xhr.open("POST","message.php?");
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(param);
	}
	else{
		document.getElementById("liveToast").classList.replace("bg-success", "bg-danger");
		document.getElementById("liveToast").innerHTML="Un minimum de 5 caracteres est requis";
		$('.toast').toast('show');
	}
	
}

////Fonction qui traite les reponse recu par login.php
function responseTraitementAuthentication(xmlResponse)
{
	//Recuperer les elements de l'objet XML
	var codeRecu= xmlResponse.getElementsByTagName("codeErreur")[0].firstChild.nodeValue;
	var message= xmlResponse.getElementsByTagName("message")[0].firstChild.nodeValue;

	var screenGame=document.getElementById("gamescreen");
	var login=document.getElementById("login");
	var register=document.getElementById("register");

	// Traitement des ces donnees
	if(codeRecu=="2000")
	{
		register.style.display='none';
        login.style.display='block'; 
	}
	else if(codeRecu=="2001") //Connexion reussie
	{
		startScript=false;
		username=message;
		login.style.display='none';
		register.style.display='none';
		XhrRequestToMovingPhp("-1"); 
		//Faire patientez l'utilisateur pour afficher l'ecran de jeu
		document.getElementById('staticBackdropLabel').innerHTML+=username;
		var couverture =  document.getElementById('couverture');
		couverture.style.display = "block";
		setTimeout(function(){ document.getElementById('temps').innerHTML="4 secondes"; }, 1000);
		setTimeout(function(){ document.getElementById('temps').innerHTML="3 secondes"; }, 2000);
		setTimeout(function(){ document.getElementById('temps').innerHTML="2 secondes"; }, 3000);
		setTimeout(function(){ document.getElementById('temps').innerHTML="1 seconde"; }, 4000);
		setTimeout(function(){ document.getElementById('temps').innerHTML="0 seconde"; }, 5000);
		document.getElementById('btn-display-popup').click();
		setTimeout(function(){ document.getElementById('Understood').click();
		document.getElementById('temps').innerHTML="5 secondes";
		document.getElementById('staticBackdropLabel').innerHTML="Bienvenue à toi ";
		couverture.style.display = "none"; }, 5000);

		//Check si l'ecran est assez grand ou pas
		checkSizeOfScreen();
		//Rendre clickable le bouton de deconexion
		document.getElementById("disconnect").style.display="block";
		document.getElementById("disconnect").onclick=disconnect;
	}
	else if(codeRecu=="2002")
	{
		document.getElementById("registermail").innerHTML=message;
	}
	else if(codeRecu=="2003")
	{
		document.getElementById("registerusername").innerHTML=message;
	}
	else if(codeRecu=="2004")
	{
		document.getElementById("logusername").innerHTML=message;
	}
	else if(codeRecu=="2005")
	{
		document.getElementById("logpass").innerHTML=message;
	}
	
}

//Fonction qui switch vers l'ecran de jeu
function switchToScreenGame()
{
	window.addEventListener("resize", checkSizeOfScreen);
	
	// Rendre clickable les images de mouvement
	var imagesDeMouvement= document.getElementsByTagName("img");
	for (var i = 0; i < imagesDeMouvement.length; i++) {
		imagesDeMouvement[i].onclick=RequeteXhrForMoving;
	}

	//Rendre clickable le boutton d'envoie de message pour le chat
	document.getElementById("btn-send-message").onclick=RequeteXhrForMessage;

	//Faire disparaitre les messages d'erreurs
	var todosSpan= document.getElementsByClassName("messageError");
	for (let index = 0; index < todosSpan.length; index++) {
		todosSpan[index].innerHTML="";	
	}
	//Demarer la synchro du chat
	var tmr = setInterval(myTimer, 3000);

	//Verifier les infos saisies par l'utilisateur
	let reg = /^([A-z&1-9]{5})\w+/;
	let regpassword = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/;

	var username = document.getElementById('Username').value;
    var password = document.getElementById('password').value;

	if (!regpassword.test(password)){
		document.getElementById("logpass").innerHTML="Mot de passe incorrecte";
    }
    if(!reg.test(username)){
		document.getElementById("logusername").innerHTML="Pseudo incorrecte";
    }

    if(reg.test(username) && regpassword.test(password)){
    			var xhr = new XMLHttpRequest();

            	var param = "pseudo="+encodeURIComponent(username)+"&password="+encodeURIComponent(password);
            	xhr.onreadystatechange = function() {
                	if (xhr.readyState == 4 && xhr.status == 200) {   
                		ech = xhr.responseXML;
                		responseTraitementAuthentication(ech);            		
               		 }
            	}
	            xhr.open("POST","login.php");
	            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
	            xhr.send(param);	
    }

}

//Fonction pour charger les images d'un theme recu en parametre
function loadImage(nom)
{
	var barreDeCharment=document.getElementById("barreChargement");
	var barre=document.getElementById("processLoading");
	var paraForLoadBarre=document.getElementById("paraForLoadBarre");
	barreDeCharment.style.display="block";
	cptForbarreChargement=1;
	var pourcentageImageCharge=100/151; 
	var i,j;
	var caseLetter;
	var type;
	for(i=0; i<tab.length; i++)
	{
		
		switch(i)
				{
					case 0:caseLetter='A';
					break;
					case 1:caseLetter='B';
					break;
					case 3:caseLetter='C';
					break;
					case 5:caseLetter='D';
					break;
					case 6:caseLetter='E';
					break;
					case 8:caseLetter='F';
					break;
					case 10:caseLetter='G';
					break;
					case 11:caseLetter='H';
					break;
					case 12:caseLetter='I';
					break;
					case 14:caseLetter='J';
					break;
					case 15:caseLetter='K';
					break;
					case 17:caseLetter='L';
					break;
					case 18:caseLetter='M';
					break;
					case 20:caseLetter='N';
					break;
					case 21:caseLetter='O';
					break;
					case 23:caseLetter='P';
					break;
					case 24:caseLetter='Q';
					break;
					default: return null;

				}
		// 1.1 Si c'est une images qui peut avoir une images de face ou qui uniquement une image de face (D,J,N)
		if(caseLetter!='A' && caseLetter!='H' && caseLetter!='P' && caseLetter!='G' && caseLetter!='L' && caseLetter!='Q')
		{
			for(j=0; j<tab[i].length; j++)
			{
				tab[i][j]=new Image();
				tab[i][j].onload= function() 
				{
					barre.style.width=(pourcentageImageCharge*cptForbarreChargement)+"%";
					paraForLoadBarre.innerHTML=Math.round((pourcentageImageCharge*cptForbarreChargement))+"%";
					cptForbarreChargement++;
				};
				tab[i][j].src="Images/"+nom+"."+caseLetter+"F"+j+".png";
			}
		}
		//1.2 Si c'est une images hors du champ de vision
		else
		{
			for(j=0; j<tab[i].length; j++)
			{
				tab[i][j]=new Image();
				tab[i][j].onload= function() 
				{
					barre.style.width=(pourcentageImageCharge*cptForbarreChargement)+"%";
					paraForLoadBarre.innerHTML=Math.round((pourcentageImageCharge*cptForbarreChargement))+"%";
					cptForbarreChargement++;
				};
				tab[i][j].src="Images/"+nom+"."+caseLetter+"S"+j+".png";
			}
		}
		//1.3 CASE QUI PEUT ETRE DE FACE OU DE COTE (On leur rajoute l'image de cote car images de face deja ajouter au point 1.1)
		if (caseLetter=='B' || caseLetter=='C' || caseLetter=='I' || caseLetter=='M' || caseLetter=='E' || caseLetter=='F' || 
			caseLetter=='K' || caseLetter=='O') 
		{
			++i;
			for(var l=0; l<tab[i].length; l++)
				{
					tab[i][l]=new Image();
					tab[i][l].onload= function() 
					{
						barre.style.width=(pourcentageImageCharge*cptForbarreChargement)+"%";
						paraForLoadBarre.innerHTML=Math.round((pourcentageImageCharge*cptForbarreChargement))+"%";
						cptForbarreChargement++;						
					};
					tab[i][l].src="Images/"+nom+"."+caseLetter+"S"+l+".png";
				}	
		}			
	}
	fontImage=new Image();		
	fontImage.onload= function() 
	{
		barre.style.width=(pourcentageImageCharge*cptForbarreChargement)+"%";
		paraForLoadBarre.innerHTML=Math.round((pourcentageImageCharge*cptForbarreChargement))+"%";
		barre.style.width="0";
		barreDeCharment.style.display="none";
		if(startScript==false){
			drawCanva(tabRecuEnGlobal);
			loadInProgress=true;
			//Changer la couleur du body en fonction du theme
			if(nom=="GREEN")
			{
				var body = document.getElementsByTagName("body");
				body[0].style.backgroundImage = 'linear-gradient(90deg, rgba(21,70,35,1) 0%, rgba(159,224,54,1) 100%)';
			}
			if(nom=="BLUE")
			{
				var body = document.getElementsByTagName("body");
				body[0].style.backgroundImage = 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(40,40,138,1) 0%, rgba(0,212,255,1) 100%)';
			}
			if(nom=="BRICK")
			{
				var body = document.getElementsByTagName("body");
				body[0].style.backgroundImage = 'linear-gradient(90deg, rgba(121,9,47,1) 35%, rgba(255,0,24,1) 100%)';
			}

		}				
		barre.style.width="0";
		barreDeCharment.style.display="none";
				
	};
	fontImage.src="Images/"+nom+".BACK.png";
}


//Fonction pour ajouter un membre a la base de donnees
function registreMember()
{
	//Faire disparaitre les messages d'erreurs
	var todosSpan= document.getElementsByClassName("messageError");
	for (let index = 0; index < todosSpan.length; index++) {
		todosSpan[index].innerHTML="";	
	}

	let reg = /^([A-z&1-9]{5})\w+/;
	let regpassword = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/;
	let regEmail = /^([A-Za-z0-9-.])+@([A-Za-z0-9-.])+.([A-Za-z]{2,4})$/;

	var username = document.getElementById('UsernameR').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('passwordR').value;
    var Comfirm_psw = document.getElementById('Comfirm_psw').value;

	if(!reg.test(username)){

        document.getElementById("registerusername").innerHTML="Pseudo invalide";
    }
    if (!regpassword.test(password)){
        document.getElementById("registerpass").innerHTML="Mot de passe invalide. (Min 8 lettres avec majuscules,caractere speciaux et chiffres)";
    }
    if (!regEmail.test(email)){
        document.getElementById("registermail").innerHTML="Mail invalide";
    }   
    if(password!=Comfirm_psw){
        document.getElementById("registerpassconfirm").innerHTML="Les mot de passe ne corresponde pas";
    }

    if(reg.test(username) && regpassword.test(password) && regEmail.test(email)){
    		var xhr = new XMLHttpRequest();
            var param = "pseudo="+encodeURIComponent(username)+"&password="+encodeURIComponent(password)+"&email="+encodeURIComponent(email);
            xhr.onreadystatechange = function() {
            	if (xhr.readyState == 4 && xhr.status == 200) {    
               		ech = xhr.responseXML;
               		responseTraitementAuthentication(ech);
            	}
            }
	        xhr.open("POST","login.php");
	        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	        xhr.send(param);
    }
	
}


function init()
{
	// Chargement images (MURS)
	loadImage(theme);	

	var elt=document.getElementById("btnScreenGame");
	elt.onclick=switchToScreenGame;

	var elt2=document.getElementById("btnRegister");
	elt2.onclick=switchToRegister;

	var elt3=document.getElementById("btnLogin");
	elt3.onclick=switchToLogin;	

	var confirme=document.getElementById("confirme");//register
	confirme.onclick=registreMember;

}
window.onload=init;