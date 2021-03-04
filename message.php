<?php
session_start();

$chaineXML='<?xml version="1.0" encoding="UTF-8"?>';
$chaineXML .= '<AllMessage>';
function genererXML($auteur,$message,$date,$type)
{
	global $chaineXML;

    $chaineXML .= '<message>';

	$chaineXML .= '<auteur>';
	$chaineXML .= $auteur;
	$chaineXML .= '</auteur>';

	$chaineXML .= '<text>';
	$chaineXML .= $message;
	$chaineXML .= '</text>';

    $chaineXML .= '<date>';
	$chaineXML .= $date;
	$chaineXML .= '</date>';

    $chaineXML .= '<type>';
	$chaineXML .= $type;
	$chaineXML .= '</type>';

    $chaineXML .= '</message>';

}
if(isset($_POST["message"]) && isset($_POST["typeMessage"]))
{
    //Determiner la distance de porter du message selon le type
    $pid=$_SESSION["pid"];
    $message=$_POST["message"];
    $type=$_POST["typeMessage"];
    $distance;
    switch($type)
    {
        case "1": $distance=1;
        break;
        case "0": $distance=3;
        break;
        case "2": $distance=5;
        break;
    }

    //Ajouter le message a la database
    $db=new PDO('pgsql:host=localhost;port=5433;dbname=ajax2033;user=ajax2033;password=deboi71koigrou');
    $stm=$db->prepare("INSERT INTO msg (msgfrom,msgtext,ts,msgtype) VALUES (?,?,?,?)");
	$stm->execute(array(
	    	$pid,
	        $message,
            time(),
	        $type
	));

    //On recupere l'id du message
    $stmt = $db->prepare("SELECT max(mid) FROM msg");
	$stmt->execute(); 
	$resultat= $stmt->fetch();	
	$idMessage=$resultat[0];

    //On regarde ici qui verra le message selon distance qui depend du type (crier, hurler, parler)
    $stm=$db->prepare("SELECT pid FROM players WHERE z = ? AND  x + y BETWEEN 0 AND ?");
	$stm->execute(array(
	    	$_SESSION['Etage'],
	        $distance
	));
    $resultat= $stm->fetchall();

    //On ajoute a la table msgto les users qui verront le message
    for ($i=0; $i < count($resultat) ; $i++) { 
        $stm=$db->prepare("INSERT INTO msgto (mid,msgto) VALUES (?,?)");
	    $stm->execute(array(
	    	$idMessage,
            $resultat[$i]
        ));
    }
    
}
else
{
    $db=new PDO('pgsql:host=localhost;port=5433;dbname=ajax2033;user=ajax2033;password=deboi71koigrou');  
    //On va faire une double requete
    //D'abord selectionner les mid qui concerne le joueur
    //$stm=$db->prepare("SELECT DISTINCT(pseudo),msgtext,ts,msgtype FROM msg INNER JOIN msgto ON msg.mid = msgto.mid INNER JOIN players ON msg.msgfrom = players.pid WHERE msgto = ?");	    $stm=$db->prepare("SELECT mid FROM msgto WHERE msgto=?");
    $stm->execute($_SESSION['pid']);
    $resultat= $stm->fetchall();
    //Mettre tout les mid dans une chaine de caractere pour avoir plus simple a la 2e requete sql
    $resultEnChaine="";
    $resultEnChaine.=$resultat[0];
    for ($i=1; $i < count($resultat); $i++) { 
        $resultEnChaine.=",";
        $resultEnChaine.=$resultat[$i];       
    }
    //Ensuite faire une jointure pour prendre les colonnes qui nous interesse
    $stm=$db->prepare("SELECT DISTINCT (pseudo,msgtext,ts,msgtype) FROM msg INNER JOIN players ON players.pid=msg.msgfrom WHERE mid in (".$resultEnChaine.")");
    $stm->execute();
    $resultat= $stm->fetchall();
    foreach ($resultat as $mess) {
        genererXML($mess['pseudo'],$mess['msgtext'],$mess['ts'],$mess['msgtype']);
    }
    $chaineXML .= '</AllMessage>';
    header("Content-Type: text/xml");
    echo $chaineXML;

}

?>