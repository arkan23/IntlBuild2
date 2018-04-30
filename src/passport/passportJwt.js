import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {User, UserLogin, UserClaim, UserProfile} from '../data/models/index';
import config from '../config';

/*const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;*/
let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.auth.jwt;

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('PASPORT')
   return true;
}));

export default passport;
