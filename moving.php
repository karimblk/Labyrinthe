<?php
session_start();

$laby = array(
# Etage 0
  array(
    array(1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2),
    array(2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1),
    array(1,0,1,2,1,1,2,1,2,2,1,2,0,1,0,2),
    array(2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1),
    array(1,0,1,2,1,0,1,1,2,2,0,2,1,2,0,2),
    array(2,0,0,0,0,0,2,0,0,0,0,1,0,0,0,1),
    array(1,1,2,1,2,0,1,2,2,1,0,1,0,1,2,2),
    array(2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1),
    array(1,0,2,1,1,2,2,1,0,1,1,1,2,2,0,2),
    array(2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1),
    array(1,1,0,1,2,1,2,0,2,2,2,1,1,1,2,2),
    array(2,0,0,1,0,0,2,0,0,0,0,0,0,0,0,1),
    array(1,0,0,2,2,0,1,0,0,0,0,0,0,0,0,2),
    array(2,0,0,0,0,0,1,1,2,1,2,2,0,2,1,1),
    array(1,0,0,1,0,0,0,0,0,0,0,0,0,0,4,2),
    array(2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1)
  )
# Etage 1
 ,array(
    array(1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2),
    array(2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1),
    array(1,0,1,0,0,0,2,1,2,2,1,2,0,1,1,2),
    array(2,0,2,0,0,0,0,0,0,0,0,1,0,0,0,1),
    array(1,0,1,2,1,0,1,1,2,2,0,6,1,2,0,2),
    array(2,0,0,0,0,0,2,4,0,0,0,1,0,0,0,1),
    array(1,1,2,1,2,0,1,2,2,1,0,1,0,1,2,2),
    array(2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1),
    array(1,0,2,1,1,2,2,1,0,1,1,1,0,2,0,2),
    array(2,0,0,1,0,0,0,0,0,0,0,0,0,2,0,1),
    array(1,1,0,1,2,1,2,0,2,2,2,1,1,1,0,2),
    array(2,0,0,0,0,0,2,0,1,0,0,1,0,0,0,1),
    array(1,2,0,2,2,0,1,0,0,0,2,1,0,2,0,2),
    array(2,0,0,0,2,1,1,1,2,1,6,2,0,2,1,1),
    array(1,0,1,0,0,0,0,0,0,0,0,0,0,0,5,2),
    array(2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1)
  )
# Etage 2
 ,array(
    array(1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2),
    array(2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1),
    array(1,0,1,0,1,1,0,2,2,2,2,2,2,2,1,2),
    array(2,0,2,0,2,0,0,2,0,0,0,0,0,0,0,1),
    array(1,0,1,0,2,0,2,1,0,1,2,1,2,2,0,2),
    array(2,0,2,0,1,0,2,5,0,0,0,0,1,1,0,1),
    array(1,0,1,0,1,0,1,1,0,1,1,0,0,2,0,2),
    array(2,0,0,0,2,0,0,1,0,0,2,0,2,1,0,1),
    array(1,0,1,1,2,1,0,2,1,0,1,0,0,2,0,2),
    array(2,0,0,2,0,2,0,0,0,0,1,2,0,1,0,1),
    array(1,1,0,0,0,1,2,1,2,2,1,0,0,2,0,2),
    array(2,0,0,1,2,1,2,1,2,2,2,1,2,1,0,1),
    array(1,0,2,2,1,1,2,0,1,2,1,2,0,0,0,2),
    array(2,0,0,1,0,0,0,0,0,0,0,0,0,2,0,1),
    array(1,2,0,0,0,1,1,0,1,1,2,2,0,1,0,2),
    array(2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1)
  )
);

// Etape 1: On recupere le parametre recu pour determiner sur quel bouton on a appuye 
$btnAppuye = $_GET["valeur"];
$chaineARetouner="";
$x = $_SESSION['positionX'];
$y = $_SESSION['positionY'];
$z = $_SESSION['Etage'];

//Etape 2: On change la position du joueur (X;Y) OU si il vien d'arriver on le met a la position initial
if($btnAppuye!=-1)
{
	if($btnAppuye==0)// Button vert le haut
	{
		if($_SESSION['orientation']==1)  //SUD
		{
			if($laby[$z][$y+1][$x]==0)
			{
				$y++;
			}
			else{
				echo "-1";
				exit();
			}
		}
		if($_SESSION['orientation']==2) //NORD
		{
			if($laby[$z][$y-1][$x]==0)
			{
				$y--;
			}
			else{
				echo "-1";
				exit();
			}
		}
		if($_SESSION['orientation']==3) //OUEST
		{
			if($laby[$z][$y][$x-1]==0)
			{
				$x--;
			}
			else{
				echo "-1";
				exit();
			}
		}
		if($_SESSION['orientation']==4) //EST
		{
			if($laby[$z][$y][$x+1]==0)
			{
				$x++;
			}
			else{
				echo "-1";
				exit();
			}
		}
	}

	else if($btnAppuye==1) // Button vers le bas
	{
		if($_SESSION['orientation']==1)  //SUD
		{
			if($laby[$z][$y-1][$x] ==0)
			{
				$y--;
			}
			else
			{
				echo "-1";
				exit();
			}
		}
		if($_SESSION['orientation']==2) //NORD
		{
			if($laby[$z][$y+1][$x] ==0)
			{
				$y++;
			}
			else
			{
				echo "-1";
				exit();
			}
			
		}
		if($_SESSION['orientation']==3) //OUEST
		{
			if($laby[$z][$y][$x+1] ==0)
			{
				$x++;
			}
			else{
				echo "-1";
				exit();
			}
		}
		if($_SESSION['orientation']==4) //EST
		{
			if($laby[$z][$y][$x-1] ==0)
			{
				$x--;
			}else{
				echo "-1";
				exit();
			}
		}

	}else if($btnAppuye==2) // Button vers la gauche
	{
		if($_SESSION['orientation']==1)  //SUD
	    {
	        if($laby[$z][$y][$x+1] ==0)
			{
				$x++;
			}else{
				echo "-1";exit();
			}
	    }
	    if($_SESSION['orientation']==2) //NORD
	    {
	       if($laby[$z][$y][$x-1] ==0)
			{
				$x--;
			}else{
				echo "-1";exit();
			}
	    }
	    if($_SESSION['orientation']==3) //OUEST
	    {
	       if($laby[$z][$y+1][$x] ==0)
			{
				$y++;
			}else{
				echo "-1";exit();
			}
	    }
	    if($_SESSION['orientation']==4) //EST
	    {
	        if($laby[$z][$y-1][$x] ==0)
			{
				$y--;
			}else{
				echo "-1";exit();
			}
	    }

	}else if($btnAppuye==3) // Button vers la droite
	{
		if($_SESSION['orientation']==1)  //SUD
	    {
	        if($laby[$z][$y][$x-1] ==0)
			{
				$x--;
			}else{
				echo "-1";exit();
			}
	    }
	    if($_SESSION['orientation']==2) //NORD
	    {
	       if($laby[$z][$y][$x+1] ==0)
			{
				$x++;
			}else{
				echo "-1";exit();
			}
	    }
	    if($_SESSION['orientation']==3) //OUEST
	    {
	       if($laby[$z][$y-1][$x] ==0)
			{
				$y--;
			}else{
				echo "-1";exit();
			}
	    }
	    if($_SESSION['orientation']==4) //EST
	    {
	        if($laby[$z][$y+1][$x] ==0)
			{
				$y++;
			}else{
				echo "-1";exit();
			}
	    }

	}else if($btnAppuye==4) // Button pour tourner vers la gauche
	{
		switch ($_SESSION['orientation']) {
			case 1: $_SESSION['orientation']=4; //Sud = 1; nord = 2; Ouest = 3; Est = 4
				break;
			case 2: $_SESSION['orientation']=3;
				break;
			case 3: $_SESSION['orientation']=1;
				break;
			case 4: $_SESSION['orientation']=2;
				break;		
			default:
				exit();
				break;
		}
		

	}else if($btnAppuye==5) // Button pour tourner vers la droite
	{
		switch ($_SESSION['orientation']) {
			case 1: $_SESSION['orientation']=3;	//Sud = 1; nord = 2; Ouest = 3; Est = 4
				break;
			case 2: $_SESSION['orientation']=4;
				break;
			case 3: $_SESSION['orientation']=2;
				break;
			case 4: $_SESSION['orientation']=1;
				break;		
			default:
				exit();
				break;
		}
	}
}


// Etape 3: Portionner le nouveau tableau

if($_SESSION['orientation']==1) /////////////////////////////////////// SUD
{
	//Ligne de A à G
	if($y+3<=15) 
	{
		$flagX = $x+3;
		for ($i=0; $i < 7 ; $i++) 
		{ 
			if($flagX>=0 && $flagX <= 15)
			{
				$chaineARetouner.= $laby[$z][$y+3][$flagX]." ";
			}
			else{
				$chaineARetouner.= "0 ";
			}			
			$flagX--;
		}
	}
	else{
		$chaineARetouner.="0 0 0 0 0 0 0 ";
	}
	//Ligne de H à L	
	if($y+2<=15)
	{
		$flagX = $x+2;
		for ($i=0; $i < 5 ; $i++) 
		{ 
			if($flagX>=0 && $flagX <= 15)
			{
				$chaineARetouner.= $laby[$z][$y+2][$flagX]." ";
			}
			else{
				$chaineARetouner.= "0 ";
			}			
			$flagX--;
		}
	}
	else{
		$chaineARetouner.="0 0 0 0 0 ";
	}
	//Ligne de M à O
	if($y+1<=15)
	{
		$flagX = $x+1;
		for ($i=0; $i < 3 ; $i++) 
		{ 
			if($flagX>=0 && $flagX <= 15)
			{
				$chaineARetouner.= $laby[$z][$y+1][$flagX]." ";
			}
			else{
				$chaineARetouner.= "0 ";
			}			
			$flagX--;
		}
	}
	else{
		$chaineARetouner.="0 0 0 ";
	}
	//Ligne P à Q
	$chaineARetouner.= $laby[$z][$y][$x+1]." ";
	$chaineARetouner.= $laby[$z][$y][$x-1];
}


if($_SESSION['orientation']==2) /////////////////////////////////////// NORD
{
	//Ligne de A à G
	if($y-3>=0) 
	{
		$flagX = $x-3;
		for ($i=0; $i < 7 ; $i++) 
		{ 
			if($flagX>=0 && $flagX <= 15)
			{
				$chaineARetouner.= $laby[$z][$y-3][$flagX]." ";
			}
			else{
				$chaineARetouner.= "0 ";
			}			
			$flagX++;
		}
	}
	else{
		$chaineARetouner.="0 0 0 0 0 0 0 ";
	}
	//Ligne de H à L	
	if($y-2>=0)
	{
		$flagX = $x-2;
		for ($i=0; $i < 5 ; $i++) 
		{ 
			if($flagX>=0 && $flagX <= 15)
			{
				$chaineARetouner.= $laby[$z][$y-2][$flagX]." ";
			}
			else{
				$chaineARetouner.= "0 ";
			}			
			$flagX++;
		}
	}
	else{
		$chaineARetouner.="0 0 0 0 0 ";
	}
	//Ligne de M à O
	if($y-1>=0)
	{
		$flagX = $x-1;
		for ($i=0; $i < 3 ; $i++) 
		{ 
			if($flagX>=0 && $flagX <= 15)
			{
				$chaineARetouner.= $laby[$z][$y-1][$flagX]." ";
			}
			else{
				$chaineARetouner.= "0 ";
			}			
			$flagX++;
		}
	}
	else{
		$chaineARetouner.="0 0 0 ";
	}
	//Ligne P à Q
	$chaineARetouner.= $laby[$z][$y][$x-1]." ";
	$chaineARetouner.= $laby[$z][$y][$x+1];
}


if($_SESSION['orientation']==3) /////////////////////////////////////// OUEST
{
	//Ligne de A à G
	if($x-3>=0) 
	{
		$flagY = $y+3;
		for ($i=0; $i < 7 ; $i++) 
		{ 
			if($flagY>=0 && $flagY <= 15)
			{
				$chaineARetouner.= $laby[$z][$flagY][$x-3]." ";
			}
			else{
				$chaineARetouner.= "0 ";
			}			
			$flagY--;
		}
	}
	else{
		$chaineARetouner.="0 0 0 0 0 0 0 ";
	}
	//Ligne de H à L	
	if($x-2>=0)
	{
		$flagY = $y+2;
		for ($i=0; $i < 5 ; $i++) 
		{ 
			if($flagY>=0 && $flagY <= 15)
			{
				$chaineARetouner.= $laby[$z][$flagY][$x-2]." ";
			}
			else{
				$chaineARetouner.= "0 ";
			}			
			$flagY--;
		}
	}
	else{
		$chaineARetouner.="0 0 0 0 0 ";
	}
	//Ligne de M à O
	if($x-1>=0)
	{
		$flagY = $y+1;
		for ($i=0; $i < 3 ; $i++) 
		{ 
			if($flagY>=0 && $flagY <= 15)
			{
				$chaineARetouner.= $laby[$z][$flagY][$x-1]." ";
			}
			else{
				$chaineARetouner.= "0 ";
			}			
			$flagY--;
		}
	}
	else{
		$chaineARetouner.="0 0 0 ";
	}
	//Ligne P à Q
	$chaineARetouner.= $laby[$z][$y+1][$x]." ";
	$chaineARetouner.= $laby[$z][$y-1][$x];
}

if($_SESSION['orientation']==4) /////////////////////////////////////// EST
{
	//Ligne de A à G
	if($x+3<=15) 
	{
		$flagY = $y-3;
		for ($i=0; $i < 7 ; $i++) 
		{ 
			if($flagY>=0 && $flagY <= 15)
			{
				$chaineARetouner.= $laby[$z][$flagY][$x+3]." ";
			}
			else{
				$chaineARetouner.= "0 ";
			}			
			$flagY++;
		}
	}
	else{
		$chaineARetouner.="0 0 0 0 0 0 0 ";
	}
	//Ligne de H à L	
	if($x+2<=15)
	{
		$flagY = $y-2;
		for ($i=0; $i < 5 ; $i++) 
		{ 
			if($flagY>=0 && $flagY <= 15)
			{
				$chaineARetouner.= $laby[$z][$flagY][$x+2]." ";
			}
			else{
				$chaineARetouner.= "0 ";
			}			
			$flagY++;
		}
	}
	else{
		$chaineARetouner.="0 0 0 0 0 ";
	}
	//Ligne de M à O
	if($x+1<=15)
	{
		$flagY = $y-1;
		for ($i=0; $i < 3 ; $i++) 
		{ 
			if($flagY>=0 && $flagY <= 15)
			{
				$chaineARetouner.= $laby[$z][$flagY][$x+1]." ";
			}
			else{
				$chaineARetouner.= "0 ";
			}			
			$flagY++;
		}
	}
	else{
		$chaineARetouner.="0 0 0 ";
	}
	//Ligne P à Q
	$chaineARetouner.= $laby[$z][$y-1][$x]." ";
	$chaineARetouner.= $laby[$z][$y+1][$x];
}



$_SESSION['positionX'] = $x;
$_SESSION['positionY'] = $y;
$_SESSION['Etage'] = $z;
echo $chaineARetouner;

?>