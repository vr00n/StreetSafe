mainAppVm = new Vue ({
    el: '#app',
    data : {
        registerForm : {
            username : '',
            password : '',
        },
        loginForm : {
            username : '',
            password : '',
        },        
    },
    computed : {

    },
    methods: {
        postRegisterForm : function(event){
            event.preventDefault();
            $.post('/register', this.registerForm, function(data){
                console.log('data? ', data);
                if ( data.success ) {
                    // the server only knew that the registration succeeded. here, the client is deciding what to do with that information
                    window.location.href = '/mainApp.html';
                }
            });
        },
        postLoginForm : function(event){
            event.preventDefault();
            $.post('/login', this.loginForm, function(data){
                console.log('data? ', data);
                if ( data.success ) {
                    // the server only knew that the registration succeeded. here, the client is deciding what to do with that information
                    window.location.href = '/mainApp.html';
                }
            });
        },
    },
    created : {

    }
});