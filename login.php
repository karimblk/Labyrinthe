<?php
 session_start();

 	//On met le joueur a la position initial (1,1)
	$_SESSION['positionX']=1;
	$_SESSION['positionY']=1;
	//Sud = 1; nord = 2; Ouest = 3; Est = 4
	$_SESSION['orientation']=1;
    //Etage par defaut
    $_SESSION['Etage']=0;


	// Génération du début du XML
	$chaineXML='<?xml version="1.0" encoding="UTF-8"?>';
	$chaineXML .= '<login>';

	// J'en profite ici pour mettre la fonction qui va generer le XML
	function genererXML($code,$mess)
	{
		global $chaineXML;

		$chaineXML .= '<codeErreur>';
		$chaineXML .= $code;
		$chaineXML .= '</codeErreur>';

		$chaineXML .= '<message>';
		$chaineXML .= $mess;
		$chaineXML .= '</message>';

		$chaineXML .= '</login>';
	}
	$error = 0;
    $reg = "/^([A-z&1-9]{5})\w+/";
    $regpassword = "/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/";
    $regEmail = "/^([A-Za-z0-9-.])+@([A-Za-z0-9-.])+.([A-Za-z]{2,4})$/";
    
    //pour s'enregister
	if(isset($_POST["email"])){
		$user = $_POST["pseudo"];
		$passw = $_POST["password"];
		$email =$_POST['email'];
		if(!preg_match($reg,$_POST['pseudo'])){
        	$error=1;
    	}

	    if(!preg_match($regpassword,$_POST['password'])){
	        $error=1;
	    }

	    if(!preg_match($regEmail,$_POST['email'])){
	        $error=1;
	    }

		$db=new PDO('pgsql:host=localhost;port=5433;dbname=ajax2033;user=ajax2033;password=deboi71koigrou');

	    if($error==0)
	    {
	    	$stmt = $db->prepare("SELECT * FROM players WHERE email=?");
			$stmt->execute([$email]); 
			$users = $stmt->fetch();
			if ($users) {
			    genererXML("2002","Email déjà utiliser");
			} 
			else {
			    $stmt = $db->prepare("SELECT * FROM players WHERE login =?");
				$stmt->execute([$user]); 
				$users = $stmt->fetch();
				if($users)
				{
					genererXML("2003","Pseudo déjà utiliser");
				}
				else
				{
					genererXML("2000","Ok");
					$stm=$db->prepare("INSERT INTO players (login,passwd,email) VALUES (?,?,?)");
	        		$stm->execute(array(
	           		$_POST["pseudo"],
	            	hash("sha256",$_POST["password"],false),
	            	$_POST['email']
	       			));
				}
			}   
		}
		header("Content-Type: text/xml");
		echo $chaineXML;
	}
	//pour se connecter
	else
	{
		$user = $_POST["pseudo"];
		$passw = $_POST["password"];
		if(!preg_match($reg,$_POST['pseudo'])){
        	$error=1;
    	}

	    if(!preg_match($regpassword,$_POST['password'])){
	        $error=1;
	    }
		$db=new PDO('pgsql:host=localhost;port=5433;dbname=ajax2033;user=ajax2033;password=deboi71koigrou');
	    if($error == 0)
	    {
			$stmt = $db->prepare("SELECT * FROM players WHERE login =?");
			$stmt->execute([$user]); 
			$users = $stmt->fetch();
			if ($users){

				$stmt = $db->prepare("SELECT * FROM players WHERE passwd='".hash("sha256",$_POST["password"],false)."'");
				$stmt->execute(); 
				$users = $stmt->fetch();
				if($users)
				{
					genererXML("2001", $user);
				}else {
					genererXML("2005","Mot de passe incorrect");
				}

			}else{
				genererXML("2004","Compte innexistant");
			}
	    }
	    header("Content-Type: text/xml");
		echo $chaineXML;
	}
?>