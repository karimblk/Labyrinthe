<?php
session_start();
// On met le joueur dans une position inatiniable pour qu'il soit pas a la porte des joueurs qui s'envoie des messages
$db=new PDO('pgsql:host=localhost;port=5433;dbname=ajax2033;user=ajax2033;password=deboi71koigrou');	

	$stm= $db->prepare ("UPDATE players SET x=?, y=?, z=? WHERE pid=?");	
	$stm->execute(array(
		100,
	    100,
	    100,
		$_SESSION["pid"]
	    ));	


session_destroy();
echo "1";

?>