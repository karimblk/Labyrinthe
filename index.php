<?php
session_start();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<title>Index</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div id="accueil">
		<h1 id="bigTitle">Home page</h1>
		<div class="jumbotron container text-center">
  			<h1 class="display-4 blueTxt">Welcome to the labyrinth game!</h1>
  			<hr class="my-4">
  			<p>Press the button to connect.</p>
  			<a class="btn btn-primary btn-lg blueBtn" href="#" id="btnLogin" role="button">Login</a>
		</div>
	</div>
	<div id="register" class="login-box">
		<h2>Register</h2>
  		<form>
    		<div class="user-box">
      			<input type="text" name="" required="">
      			<label>Username</label>
    		</div>
    		<div class="user-box">
      			<input type="text" name="" required="">
      			<label>City</label>
    		</div>
    		<div class="user-box">
      			<input type="password" name="" required="">
      			<label>Password</label>
    		</div>
    		<a href="#">
      		<span></span>
      		<span></span>
      		<span></span>
      		<span></span>
      			Submit
    		</a>
  		</form>
	</div>
	<div id="login"  class="login-box">
		<h2>Sign in to play</h2>
  		<form>
    		<div class="user-box">
      			<input type="text" name="" required="">
      			<label>Username</label>
    		</div>
    		<div class="user-box">
      			<input type="password" name="" required="">
      			<label>Password</label>
    		</div>
    		<a href="#" id="btnScreenGame">Submit</a>
    		<a href="#" id="btnRegister">Register</a>
  		</form>
	</div>
	<div id="gamescreen" class="container">
    <div class="row" id="gameScreenAndChat">
      <div id="scrennGameWithButton" class="col-md-8 col-sm-8 col-xs-8 col-lg-8">
        <canvas id="canvagamescreen" height="400" width="640"></canvas>
        <br>
        <img src="ImgMove/movefwd.png" id="imgDevant" />
        <img src="ImgMove/moveback.png" id="imgArriere"/>
        <img src="ImgMove/moveleft.png" id="imgGauche"/>
        <img src="ImgMove/moveright.png" id="imgDroite"/>
        <img src="ImgMove/turnleft.png" id="imgTournerGauche"/>
        <img src="ImgMove/turnright.png" id="imgTournerDroite"/>
      </div> 
      <div id="divDuchat" class="col-md-4 col-sm-4 col-xs-4 col-lg-4">  
        <h3>LIVE CHAT</h3>   
      </div>   
    </div>
    
	</div>
	
	<script src="script.js" defer></script>
</body>
</html>