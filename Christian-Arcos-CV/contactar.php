<!doctype html>
<html lang="es">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="normalize_css/normalize.css">
    
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/css/flag-icon.min.css" rel="stylesheet">
    <link rel="stylesheet"  type="text/css" href="css/style.css">
    <style> .jumbotron{background-image: url(images/baner.jpg); 
      text-align: center;
      padding-top: 10rem;
      padding-bottom: 10rem;
      text-shadow: 2px 2px rgba(163, 161, 161, 0.719);}
      
      .lead {
      color: rgba(255, 255, 212, 0.192);
      font-weight: bold;} 

      .header {
        color: #36A0FF;
        padding: 10px; }

     </style>

  <title>Contact</title>

  </head>
  <body data-spy="scroll" data-target="#navbarScroll" data-offset="100">
    
    <!--baner o jumbotron-->

    <div class="jumbotron jumbotron-fluid bg-cover" id="jumbo" >
        <div class="container jumboHeaderImg">
          <h2 class="display-3"> <strong> CHRISTIAN ARCOS </strong> </h2>
          <p class="lead"><em> A veces la persona a la que nadie imagína capaz de nada es la que hace cosas que nadie imagína <br> "Alan Turing".</em></p>
        </div>
      </div>

   <!--Cuerpo del contact-->

   <div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="well well-sm">
                <form class="form-horizontal" method="post">
                    <fieldset>
                        <legend class="text-center header"><h1 class="Display-2">CONECTAR</h1></legend>
                        <legend class="text-center"><h2 class="Display-2"> ¿Buscas un consultor para tu proyecto de inteligencia artificial? </h2></legend>
                        <p class="text-center"> Me encantaría saber más al respecto, complete el siguiente formulario y me pondré en contacto contigo lo antes posible. Gracias de antemano! </p> <br><br>
                        
                        <p> Campos marcados con * son obligatorios</p>

                        <div class="form-group row">
                            <label for="name" class="col-sm-2 form-control-label">* Nombre</label>
                            <div class="col-md-10">
                            <input id="name" name="name" type="text" placeholder="Escriba su  Nombre" class="form-control">
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="lname" class="col-sm-2 form-control-label">* Asunto</label>
                          <div class="col-md-10">
                          <input id="lname" name="subject" type="text" placeholder="Escriba el asunto" class="form-control">
                        </div>
                      </div>
                        <div class="form-group row">
                          <label for="email" class="col-sm-2 form-control-label">* Correo Electronico </label>
                          <div class="col-sm-10">
                            <input id="email" name="email" type="email" placeholder="Example@example.com" class="form-control">
                            <small class="text-muted">No compartire tu email con nadie.</small>
                          </div>
                        </div>

                        <div class="form-group row">
                            <label for="phone" class="col-sm-2 form-control-label">Número de Teléfono</label>
                            <div class="col-md-10">
                                <input id="phone" name="phone" type="text" placeholder="Escriba su Número de Teléfono" class="form-control">
                            </div>
                        </div>

                        <div class="form-group row">
                          <label for="phone" class="col-sm-2 form-control-label">* Descripción</label>
                            <div class="col-md-10">
                                <textarea class="form-control" id="message" name="message" placeholder="Ingrese su masaje para mí aquí. Me pondré en contacto con usted lo antes posible." rows="7"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-12 text-center">
                                <button type="submit" name="submit" class="btn btn-primary btn-lg">Enviar</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</div>

  <!--FOOTER-->

  <div class="footer">
      <div class="container">
              <!--redes sociales-->
             
              <div class="footer_area_item text-center">
                <a href="https://github.com/TottiPuc"><img src="images/github.png" alt="github"> </a>
                <a href="https://www.linkedin.com/in/christian-dayan-arcos-gordillo/"><img src="images/linked.PNG" alt="linkeid"> </a>
                <a href="https://www.youtube.com/channel/UCRlazgx5-5_-1xtP8llRg-A"><img src="images/youtube.png" alt="youtube"> </a>
                <a href="#"><img src="images/blog.PNG" alt="proximamente"> </a>

        </div>  
                
            
      </div>
       
  </div>



    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <?php
    include("datos.php");
    ?>
  
  </body>
</html>