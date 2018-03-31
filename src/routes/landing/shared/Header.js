import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../../components/Link/Link';
import s from './Header.css';
// flow

const Header = props => {
    const { modalState, toggle } = props;
    return (
        <section className={s.banner}>
            <div className={`${s.inner} ${s.split}`}>
                <section>
                    <h2>
                        Welcome to Prism, a free responsive site template by{' '}
                        <a href="http://templated.co">TEMPLATED</a>
                    </h2>
                </section>
                <section>
                    <p>
                        Lorem ipsum nisl sed cursus magna et amet veroeros.
                        Phasellus aliquam et tempus lorem dolor feugiat
                        adipiscing lorem.
                    </p>
                    <ul className={s.actions}>
                        <li>
                            <a
                                href="/"
                                className={`${s.button} ${s.special}`}
                                onClick={e => {
                                    e.preventDefault();
                                    toggle(modalState);
                                }}
                            >
                                Get started
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
        </section>
    );
};

Header.propTypes = {
    toggle: PropTypes.func.isRequired,
    modalState: PropTypes.bool.isRequired,
};
export default withStyles(s)(Header);
