module.exports = function(req, res, next) {

    // User is allowed, proceed to the next policy, 
    // or if this is the last policy, the controller
    if (req.isAuthenticated()) {
        if (req.user.rol == 'admin') {
            //console.log("politica - accesoPolitica", req.user)
            return next();
        }

    }

    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.redirect('/')
};