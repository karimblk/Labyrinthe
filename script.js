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

function loadImage(nom)
{
	var i,j;
	var caseLetter;
	var type;
	fontImage=new Image();
	fontImage="Images/"+nom+".BACK.PNG";
	for(i=0; i<tab.length; i++)
	{
		switch(i)
				{
					case 0:caseLetter='A';
					break;
					case 1:caseLetter='B';
					break;
					case 2:caseLetter='C';
					break;
					case 3:caseLetter='D';
					break;
					case 4:caseLetter='E';
					break;
					case 5:caseLetter='F';
					break;
					case 6:caseLetter='G';
					break;
					case 7:caseLetter='H';
					break;
					case 8:caseLetter='I';
					break;
					case 9:caseLetter='J';
					break;
					case 10:caseLetter='K';
					break;
					case 11:caseLetter='L';
					break;
					case 12:caseLetter='M';
					break;
					case 13:caseLetter='N';
					break;
					case 14:caseLetter='O';
					break;
					case 15:caseLetter='P';
					break;
					case 16:caseLetter='Q';
					break;
					default: return null;

				}
		for(j=0; j<tab[i].length; j++)
		{
			if(caseLetter!='D' && caseLetter!='J' && caseLetter!='N')
			{
				tab[i][j]=new Image();
				tab[i][j].src="Images/"+nom+"."+caseLetter+"S"+j+".png";
			}
			else
			{
				tab[i][j]=new Image();
				tab[i][j].src="Images/"+nom+"."+caseLetter+"F"+j+".png";
			}
		}	

		// CASE QUI PEUT ETRE DE FACE OU DE COTE 
		if (caseLetter=='B' || caseLetter=='C' || caseLetter=='I' || caseLetter=='M' || caseLetter=='E' || caseLetter=='F' || 
			caseLetter=='K' || caseLetter=='O') 
		{
			i++;
			for(var k=i; k<tab.length; k++)
			{
				for(var l=0; l<tab[i].length; l++)
				{
					tab[k][l]=new Image();
					tab[k][l].src="Images/"+nom+"."+caseLetter+"S"+l+".png";
				}	
			}
		}		
	}
}

function drawCanva()
{
	var canva=document.getElementById('canvagamescreen');
	var ctx=canva.getContext('2d');
	ctx.drawImage(tab[0][0],0,0,320,200);
	ctx.drawImage(tab[1][0],20,0,320,200);
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
	drawCanva();
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