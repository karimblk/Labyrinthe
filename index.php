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
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <script src="https://kit.fontawesome.com/9ccaea11f1.js" crossorigin="anonymous"></script>
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
            <input type="text" name="" required="Champ obligatoire" id="UsernameR" />
            <label>Username</label>
        </div>
        <span class="messageError" id="registerusername"></span>
        <div class="user-box">
            <input type="text" name="" required="Champ obligatoire"  id="email" />
            <label>Email</label>
        </div>
        <span class="messageError" id="registermail"></span>
        <div class="user-box">
            <input type="password" name="" required="Champ obligatoire" id="passwordR" />
            <label>Password</label>
        </div>
        <span class="messageError" id="registerpass"></span>
        <div class="user-box">
            <input type="password" name="" required="Champ obligatoire" id="Comfirm_psw" />
            <label>Comfirm password</label>
        </div>
        <span class="messageError" id="registerpassconfirm"></span>
        <a href="#" id="confirme">
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
            <input type="text" name="" required="" id="Username" />
            <label>Username</label>
        </div>
        <span class="messageError" id="logusername"></span>
        <div class="user-box">
            <input type="password" name="" required="" id ="password" />
            <label>Password</label>
        </div>
        <span class="messageError" id="logpass"></span>
        <a href="#" id="btnScreenGame">Submit</a>
        <a href="#" id="btnRegister">Register</a>
      </form>
  </div>
	<div id="gamescreen" class="container">
      <div id="scrennGameWithButton">
        <canvas id="canvagamescreen" height="400" width="640"></canvas>
        <br>
        <div id="barreChargement">
			<div id="processLoading">
				<p id="paraForLoadBarre"></p>
			</div>
		</div>
		<div class="ligne">
			<div id="infoPlayer">
				<h6>Info of player</h6>
				<span id="spanPosition"></span>
			</div>
			<div id="divContainsButtonOfMovement" >
				<img src="ImgMove/movefwd.png" id="imgDevant" class="ImgMove" />
				<img src="ImgMove/moveback.png" id="imgArriere" class="ImgMove"/><br>
				<img src="ImgMove/moveleft.png" id="imgGauche" class="ImgMove"/>
				<img src="ImgMove/moveright.png" id="imgDroite" class="ImgMove"/><br>
				<img src="ImgMove/turnleft.png" id="imgTournerGauche" class="ImgMove"/>
				<img src="ImgMove/turnright.png" id="imgTournerDroite" class="ImgMove"/>
			</div>
			<div id="divForBoussole">
				<img id="imgBoussole" src="ImgMove/compass-S.png"/>
	  		</div>
		</div>
      </div> 
	  
      <div id="divDuchat">  
        <h3>LIVE CHAT</h3> 
        <div id="allMessage">
        </div>
        
        <div id="formulaire">
            <input type="text" placeholder="Enter your message here" id="message" />
            <select id="selectionTypeMessage">
              <option value="0">SAY</option>
              <option value="1">WHISPER</option>
              <option value="2">HELL</option>
            </select>
            <button id="btn-send-message">Envoyer</button>            
        </div>
        <!-- TOAST -->
        <div id="liveToast" class="toast hide text-white badge rounded-pill bg-success border-0" data-autohide="true" role="alert" aria-live="assertive" aria-atomic="true" data-delay="4000">
                <div class="toast-body">
                  Message envoyer
                  <i class="fas fa-check"></i>
                </div>
        </div>
        <!---->
		</div>   
	</div>

  

	<!-- FOOTER -->
	  <!-- Site footer -->
	  <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-12 center" >
            <h6>About</h6>
            <p>This app was developed by : </p>
			<ul class="footer-links">
              <li><a href="ImgMove/karim.PNG">Karim Ben-Loukar</a></li>
              <li><a href="https://media.discordapp.net/attachments/778278174454579254/808599662969880576/image0.jpg?width=1176&height=882">Taj Eddine Temsamani</a></li>
			  <li><a href="ImgMove/souly.PNG">Soulyman El Kadaoui</a></li>
            </ul>
          </div>
        </div>
        <hr>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2021 All Rights Reserved by 
         <a href="#">The Three Man Band (3MB)</a>.
            </p>
          </div>

        </div>
      </div>
	</footer>
	
	<script src="script.js" defer></script>
</body>
</html>