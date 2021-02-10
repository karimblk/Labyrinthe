//Tableau global

function initArray(tab)
{
	var i;
	for(i=0; i<tab.length; i++)
	{
		tab[i] = new Array(6); // Deuxieme dimension
	}	
	return tab;
}

var tab = new Array(25);
tab=initArray(tab);
var fontImage;

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

function loadImage(nom)
{
	var i,j;
	var caseLetter;
	var type;
	fontImage=new Image();
	fontImage.src="Images/"+nom+".BACK.png";
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
				tab[i][j].src="Images/"+nom+"."+caseLetter+"F"+j+".png";
			}
		}
		//1.2 Si c'est une images hors du champ de vision
		else
		{
			for(j=0; j<tab[i].length; j++)
			{
				tab[i][j]=new Image();
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
					tab[i][l].src="Images/"+nom+"."+caseLetter+"S"+l+".png";
				}	
		}		
	}
}

function drawCanva(tableauCaseDevant)
{
	var canva=document.getElementById('canvagamescreen');
	var ctx=canva.getContext('2d');
	ctx.drawImage(fontImage,0,0,1280,800);
	
	// On affiche de A à C
	for (var i = 0; i < 5; i++) {
		ctx.drawImage(tab[i][tableauCaseDevant[indexOfCase(i)]],0,0,1155,665);
	}
	// On affiche de G à E et en dernier D
	for (var i = 10; i >= 5; i--) {
				ctx.drawImage(tab[i][tableauCaseDevant[indexOfCase(i)]],0,0,1155,665);
	}
	// On affiche de H à I
	for (var i = 11; i < 14; i++) {
				ctx.drawImage(tab[i][tableauCaseDevant[indexOfCase(i)]],0,0,1155,665);
	}
	// On affiche de L à K et en dernier J
	for (var i = 17; i >= 14; i--) {
				ctx.drawImage(tab[i][tableauCaseDevant[indexOfCase(i)]],0,0,1155,665);
	}
	// On affiche de M puis O puis N
	for (var i = 18; i < 20; i++) {
				ctx.drawImage(tab[i][tableauCaseDevant[indexOfCase(i)]],0,0,1155,665);
	}
	for (var i = 22; i >= 20; i--) {
				ctx.drawImage(tab[i][tableauCaseDevant[indexOfCase(i)]],0,0,1155,665);
	}
	// On affiche P et Q
	ctx.drawImage(tab[23][tableauCaseDevant[indexOfCase(23)]],0,0,1155,665);
	ctx.drawImage(tab[24][tableauCaseDevant[indexOfCase(24)]],0,0,1155,665);
	
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


//Fonction qui switch vers le login
function switchToLogin()
{
	var acceuil=document.getElementById("accueil");
	acceuil.style.display='none';
	login.style.display='block';

	var tabTest = [0,0,0,0,0,0,0,0,2,2,0,2,2,2,2,2,0];
	drawCanva(tabTest);
}


//Fonction qui switch vers l'ecran de jeu
function switchToScreenGame()
{
	var screenGame=document.getElementById("gamescreen");
	var login=document.getElementById("login");
	var register=document.getElementById("register");
	screenGame.style.display='block';
	login.style.display='none';
	register.style.display='none';
}

function init()
{
	loadImage('BLUE');

	var elt=document.getElementById("btnScreenGame");
	elt.onclick=switchToScreenGame;

	var elt2=document.getElementById("btnRegister");
	elt2.onclick=switchToRegister;

	var elt3=document.getElementById("btnLogin");
	elt3.onclick=switchToLogin;
}


window.onload=init;