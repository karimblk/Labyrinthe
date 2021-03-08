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
	$chaineXML .= date('H:i:s', $date); // Ou 'd-m-Y H:i:s' si on voulais une date complete
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

    //Recuperer les coordonne du joueur qui envoie
    $stm=$db->prepare("SELECT x,y FROM players WHERE pid=?");
    $stm->execute([$pid]);
    $resultat= $stm->fetchall();
    foreach ($resultat as $res) {
        $posX=$res['x'];
        $posY=$res['y'];
    }

    //On regarde ici qui verra le message selon distance qui depend du type (crier, hurler, parler)
    $stm=$db->prepare("SELECT pid FROM players WHERE z = 0 AND (x-?) + (y - ?) BETWEEN 0 AND ?");
    $stm->execute(array(
            $posX,
            $posY,
            $distance
    ));
    $resultat= $stm->fetchall();

    //On ajoute a la table msgto les users qui verront le message
    foreach ($resultat as $res) {
        $stm=$db->prepare("INSERT INTO msgto (mid,msgto) VALUES (?,?)");
        $stm->execute(array(
            $idMessage,
            $res['pid']
        ));
    }
    
    
}
else
{
    $db=new PDO('pgsql:host=localhost;port=5433;dbname=ajax2033;user=ajax2033;password=deboi71koigrou');  
    //On va faire une double requete
    //D'abord selectionner les mid qui concerne le joueur
    $stm=$db->prepare("SELECT mid FROM msgto WHERE msgto=?");
    $stm->execute([$_SESSION['pid']]);
    $resultat= $stm->fetchall();
    //Mettre tout les mid dans une chaine de caractere pour avoir plus simple a la 2e requete sql
    if(count($resultat)!=0)
    {
        $arrayTest= array();
        $cpt=0;
        foreach ($resultat as $res) {
            $arrayTest[$cpt]=$res['mid'];  
            $cpt++;
        }
        //Ensuite faire une jointure pour prendre les colonnes qui nous interesse
        $sql= "SELECT pid,login,msgtext,ts,msgtype FROM msg INNER JOIN players ON players.pid=msg.msgfrom WHERE mid in (" . implode(',', $arrayTest) . ")";
        $stm=$db->prepare($sql);
        $stm->execute();
        $resultat= $stm->fetchall();
        foreach ($resultat as $mess) {
            if($mess["pid"]==$_SESSION['pid']){
                genererXML($mess['pid'],$mess['msgtext'],$mess['ts'],$mess['msgtype']);
            }
            else{
                genererXML($mess['login'],$mess['msgtext'],$mess['ts'],$mess['msgtype']);
            }
        }
        //On peut supprimer les messages qui concerne le joueur car plus besoin
        $stm=$db->prepare("DELETE FROM msgto WHERE msgto=?");
        $stm->execute([$_SESSION['pid']]);

        $chaineXML .= '</AllMessage>';
        header("Content-Type: text/xml");
        echo $chaineXML;
    }
    else
    {
        exit();
    }
    

}

?>