/* eslint-disable import/no-extraneous-dependencies,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import Link from '../../../components/Link/Link';
import SaveUser from '../mongo.graphql';
import databaseCreateUser from '../create.graphql';
import s from './Modal.css';
import {injectIntl} from "react-intl";

class Modal extends React.Component {
    constructor(props) {
        super(props)
    }


    async sendData() {
        const nameUser = this.refs.name.value;
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
        this.props.toggle(this.props.modalState);
    };

    render() {
        const {modalState, toggle , data} = this.props;
        console.log(this.props);
        return [
            <div
                key="modal"
                className={`${s.mdModal} ${s.mdEffect1} ${
                    modalState ? s.mdShow : s.mdHide
                    }`}
            >
                <h2>
                    {data.name}
                </h2>
                <div className={s.mdContent}>
                    <h3>Modal Dialog</h3>
                    <div>
                        <p>
                            This is a modal window. You can do the following things
                            with it:
                        </p>
                        <form action="#" className={s.alt} method="POST">
                            <div className={`${s.row} ${s.uniform}`}>
                                <div className={s.contactName}>
                                    <input
                                        ref="name"
                                        name="name"
                                        placeholder="Name"
                                        type="text"
                                    />
                                </div>
                                <div className={s.contactPhone}>
                                    <input
                                        ref="phone"
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                    />
                                </div>
                            </div>
                        </form>
                        <button onClick={this.sendData.bind(this)}>Close me!</button>
                    </div>
                </div>
            </div>,
            <div
                role="navigation"
                key="modalOverlayLayout"
                className={s.mdOverlay}
                onClick={() => toggle(modalState)}
            />,
        ];

    }
}

Modal.propTypes = {
    toggle: PropTypes.func.isRequired,
    modalState: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
};
export default injectIntl(withStyles(s)(Modal), {withRef: true});
