/**********************
 * Declaration des variables globaux
 **********************/
var tab = new Array(25);
tab=initArray(tab);
var fontImage;
var cptForbarreChargement=1;
var responseXHR;
var loadInProgress=true; // Pour la barre de chargement qui sera utiliser au chagement de theme
var theme="BLUE";

/**********************
 * FONCTIONS
 **********************/

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
	var direction =document.getElementById("imgBoussole");
	switch(orientation){
		case 1: direction.src="ImgMove/compass-S.png";
		break;
		case 2: direction.src="ImgMove/compass-N.png";
		break;
		case 3: direction.src="ImgMove/compass-W.png";
		break;
		case 4: direction.src="ImgMove/compass-E.png";
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

//Fonction qui switch vers l'ecran de jeu
function switchToScreenGame()
{
	var screenGame=document.getElementById("gamescreen");
	var login=document.getElementById("login");
	var register=document.getElementById("register");

	// Rendre clickable les images de mouvement
	var imagesDeMouvement= document.getElementsByTagName("img");
	for (var i = 0; i < imagesDeMouvement.length; i++) {
		imagesDeMouvement[i].onclick=RequeteXhrForMoving;
	}

	// Requete xhr pour valider la connexion et donner une position au joueur
	var param="pseudo="+encodeURIComponent("karim")+"&password="+encodeURIComponent("blk");
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange= function() {
 		if (xhr.readyState == 4) {
   			if (xhr.status == 200) {
      			// traitementXhr(xhr.responseText);
      			console.log(xhr.responseText);
      			if(xhr.responseText!="1"){
					switchToLogin();
				}
				else{
					screenGame.style.display='flex';
					login.style.display='none';
					register.style.display='none';
					XhrRequestToMovingPhp("-1");
				}
    		}
  		}
	};
	xhr.open("POST","login.php",true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send();
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
					console.log(cptForbarreChargement);
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
					console.log(cptForbarreChargement);
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
						console.log(cptForbarreChargement);
						
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
			if(cptForbarreChargement==151)
			{
				console.log("cptForbarreChargement");
				barre.style.width="0";
				barreDeCharment.style.display="none";
				XhrRequestToMovingPhp(-1);
				loadInProgress=true;

			}	
		};
		fontImage.src="Images/"+nom+".BACK.png";	
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
}
window.onload=init;