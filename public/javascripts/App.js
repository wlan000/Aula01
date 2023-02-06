(()=>{
    let App = {};

    App.init = ()=>{


        $('.submit-login').on('click', ()=>{
            $('.submit-login').text('Aguarde...')

            $.post('/auth', $('form').serialize(), (data)=>{
                    alert('LOGOU!')

                setTimeout(function(){
                    $('.submit-login').text('Entrar')
                }, 1000)
            }).fail((err)=>{


                alert(err.responseJSON.message);
                setTimeout(function(){
                    $('.submit-login').text('Entrar')
                }, 1000)                
            })

        });

    }


    jQuery(()=>{
        App.init()
    })
})()