/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import LocalStrategy from 'passport-local'
import {User, UserLogin, UserClaim, UserProfile} from '../data/models/index';
import config from '../config';

/**
 * Sign in with Facebook.
 */

passport.use(
    new LocalStrategy(
        function(username, password, done) {
            const fooBar = async () => {
                User.findAll({attributes: ['id', 'email'],}, function (err, user) {
                    if (err) {
                        done(err);
                    }
                    if (!user) {
                        done(null, false);
                    }
                    // if (!user.verifyPassword(password)) { return done(null, false); }
                    done(null, user);
                });
            }
            fooBar().catch(done);
        }
    )
);

export default passport;
