import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OrderForm.css';
import {injectIntl} from "react-intl";

class OrderForm extends React.Component {
    constructor(props) {
        super(props)
    }


    async sendData() {
        // FIXME revert then its will be need
        const nameUser = this.refs.name.value;
        const phoneUser = this.refs.phone.value;

        /*const client = this.props.data;

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

        //this.props.toggle(this.props.modalState);

        fetch("/email",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: 'name=' + nameUser + '&phone=' + phoneUser
            })
            .then(function(res){ return res.json(); });
    };

    render() {
        // const {data} = this.props;
        // console.log(this.props);
        return <div
            key="modal"
            className={s.orderContainer}
        >
            <div className={s.orderContent}>
                <h2>Modal Dialog</h2>
                <p className={s.orderP}>
                    This is a modal window. You can do the following things
                    with it:
                </p>
                <form action="#" className={s.orderForm} method="POST">
                    <input
                        ref="name"
                        name="name"
                        placeholder="Имя"
                        type="text"
                        className={s.itemName}
                    />
                    <input
                        ref="phone"
                        name="email"
                        placeholder="Телефон/Email"
                        type="text"
                        className={s.itemPhone}
                    />
                    <button onClick={this.sendData.bind(this)} className={s.itemInput}>Заказать!</button>
                </form>
            </div>
        </div>
    }
}

OrderForm.propTypes = {
    /*    saveUserData: PropTypes.func.isRequired,
	toggle: PropTypes.func.isRequired,
	modalState: PropTypes.bool.isRequired,*/
    data: PropTypes.object.isRequired,
};
export default injectIntl(withStyles(s)(OrderForm), {withRef: true});
