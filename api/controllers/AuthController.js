const passport = require('passport');
module.exports = {
    loguearse: function(req, res) {

        if (req.isAuthenticated()) {
            return res.redirect("/")
        }
        return res.view("login/login")
    },
    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                // return res.send({
                //     message: info.message,
                //     user
                // });
                // console.log("no logueado : ", info.message)

                return res.redirect("/");
            }

            req.logIn(user, function(err) {
                if (err) {
                    console.log(err)
                    return res.send(err);
                }
                // return res.send({
                //     message: info.message,
                //     user
                // });
                console.log("PREGUNTANDPO logueado")
                return res.redirect('/controlador/index')

            });
        })(req, res);
    },
    usuarios: function(req, res) {
        switch (req.user.rol) {
            case 'delegado':
                sails.log("DELEGADO ::", req.user)

                res.redirect("/recintoDelegado/principal");
                break;
            case 'admin':
                sails.log("ADMIN ::", req.user)

                res.redirect("/controlador/index");

                break;
            default:
                sails.log("OTRO ::", req.user)

                res.redirect("/");

                break;
        }

    },
    salir: function(req, res) {
        req.logout();
        res.redirect("/");
    },
    autentificacion: function(req, res) {
        var usuario = {
            usuario: req.user,
            autentificacion: req.isAuthenticated()
        }
        res.send(usuario)
    }

};