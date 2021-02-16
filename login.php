<?php
 session_start();

 	//On met le joueur a la position initial (1,1)
	$_SESSION['positionX']=1;
	$_SESSION['positionY']=1;
	//Sud = 1; nord = 2; Ouest = 3; Est = 4
	$_SESSION['orientation']=1;
    //Etage par defaut
    $_SESSION['Etage']=0;
 	//Recuperer les infos du formulaire de connexion

	//On testera ici si le login est correct
	echo "1";
?>