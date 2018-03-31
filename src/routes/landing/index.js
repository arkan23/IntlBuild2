/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Landing from './Landing';
import Layout from '../../components/Layout';

async function action({ client }) {

    return {
        title: 'React Landing Kit',
        component: (
            <Layout>
                <Landing graphql={client} />
            </Layout>
        ),
    };
}

export default action;
