import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../../components/Link/Link';
import s from './Navbar.css';
// // flow
// static propTypes = {
//   toggle: PropTypes.func.isRequired,
//   navState: PropTypes.bool.isRequired,
// };
const Navbar = props => {
    const { navState, toggle } = props;
    return (
        <nav>
            <div className={s.TopContent}>
                <div className={s.logo}>LOGO</div>
                <div className={s.TopContacts}>
                    <div className={s.Phone}>8-920-029-9031</div>
                    <div className={s.Label}>Ежедневно с 8:00 до 22:00</div>
                </div>
            </div>
            <button className={s.menuIcon} onClick={() => toggle(navState)}>
                <div className={s.container}>
                    <div
                        className={`${s.stick} ${s.stick1} ${
                            navState ? s.open : s.close
                        }`}
                    />
                    <div
                        className={`${s.stick} ${s.stick2} ${
                            navState ? s.open : s.close
                        }`}
                    />
                    <div
                        className={`${s.stick} ${s.stick3} ${
                            navState ? s.open : s.close
                        }`}
                    />
                </div>
            </button>

            <div className={s.menu}>
                <ul className={navState ? s.Showing : s.NoneShowing}>
                    <li>
                        <Link to="/" className={s.link} data-hover="Home">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className={s.link}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className={s.link}>
                            Product
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className={s.link}>
                            Contacts
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className={s.link}>
                            {navState ? 'true' : '123'}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    toggle: PropTypes.func.isRequired,
    navState: PropTypes.bool.isRequired,
};

export default withStyles(s)(Navbar);
