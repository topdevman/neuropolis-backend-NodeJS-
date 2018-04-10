const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const config = require("../config/database");

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.get({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            console.log("qsdqdq");
            console.log(user);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}