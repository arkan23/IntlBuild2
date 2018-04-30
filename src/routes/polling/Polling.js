/* eslint-disable import/no-extraneous-dependencies,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Polling.css';
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {saveData} from "../../actions/pollingActions";

import SaveUser from '../../core/queryGql/mongo.graphql';

class Polling extends React.Component {
    constructor(props) {
        super(props)
    }


    async sendData() {
        // FIXME revert then its will be need
        /*const nameUser = this.refs.name.value;
        const phoneUser = this.refs.phone.value;

        const client = this.props.data;

        const mutate = await client.mutate({
            mutation: databaseCreateUser,
            variables: {name: nameUser, phone: phoneUser},
        });
        const data = await client.query({
            query: SaveUser,
                options: () => {
                    return {
                        pollInterval: 500,
                    }
                }
        });
        this.props.saveUserData(data);
        fetch("/email",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: 'name=' + nameUser + '&phone=' + phoneUser
            })
            .then(function(res){ return res.json(); });*/

        this.props.toggle(this.props.modalState);
    };

    async render() {
        // const {modalState, toggle , data} = this.props;
        const client = this.props.client;
        const c = await client.query({
            query: SaveUser,
            options: () => {
                return {
                    pollInterval: 500,
                }
            }
        });
        console.log(data);

        // console.log(this.props);
        return <div
                key="modal"
                className={}
            >
            </div>

    }
}

const mapState = state => ({
    pollState: state.pagePolling.pollingState,
});

const mapDispatch = {
    saveData: saveData,
};

Polling.propTypes = {
/*    saveUserData: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    modalState: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,*/
    client: PropTypes.object.isRequired,
};
export default injectIntl(connect(mapState, mapDispatch)(withStyles(s)(Polling)), {withRef: true});
