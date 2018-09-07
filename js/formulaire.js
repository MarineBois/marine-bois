function envoiFormulaire() {
    $('.alert-danger').remove();
    var email = $('#inputEmail').val();
    var nom = $('#inputname').val();
    var message = $('#exampleFormControlTextarea1').val();
    var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

    if (email.trim().length <= 0) {
        $('<div class="alert alert-danger" role="alert">Merci de renseigner votre email</div>').insertBefore("form");
    }

    if (nom.trim().length <= 0) {
        $('<div class="alert alert-danger" role="alert">Merci de renseigner votre nom</div>').insertBefore("form");
    }

    if (message.trim().length <= 0 ) {
        $('<div class="alert alert-danger" role="alert">Merci de renseigner votre message</div>').insertBefore("form");
    }  

    if (!regEmail.test(String(email).toLowerCase())){
            $('<div class="alert alert-danger" role="alert">Attention Email erroné</div>').insertBefore("form");
    } 

    if (email.trim().length > 0 && nom.trim().length > 0 && message.trim().length > 0 && regEmail.test(String(email).toLowerCase())) {
        $.ajax({
            url:'php/envoi.php',
            type:'POST',
            data:{email:email,nom:nom,message:message},
            dataType:'json',
            success: function(data){
                if (data.result == true) {
                    $('.alert-danger').remove();
                    $('<div class="alert alert-success" role="alert">'+data.confirmationEnvoi+'</div>').insertBefore("form");             
                } else {
                    $('<div class="alert alert-danger" role="alert">'+data.message+'</div>').insertBefore("form");
                }
            }
        });
    }
}

