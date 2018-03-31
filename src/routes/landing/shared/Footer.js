import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../../components/Link/Link';
import s from './Footer.css';

const Footer = () => (
    <div>
        <section id="contact" className={s.wrapper}>
            <div className={`${s.inner} ${s.split}`}>
                <section>
                    <h2>Orci malesuada</h2>
                    <p>
                        Morbi pharetra vitae felis placerat pharetra. Nulla
                        risus orci, dapibus id malesuada et nec, malesuada quis
                        pellentesque eget.
                    </p>
                    <form action="#" className={s.alt} method="POST">
                        <div className={`${s.row} ${s.uniform}`}>
                            <div className={s.contactName}>
                                <input
                                    name="name"
                                    placeholder="Name"
                                    type="text"
                                />
                            </div>
                            <div className={s.contactEmail}>
                                <input
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                />
                            </div>
                            <div className={s.contactText}>
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    rows="4"
                                />
                            </div>
                        </div>
                        <ul className={`${s.actions} ${s.buttonContact}`}>
                            <li>
                                <input
                                    className={s.alt}
                                    value="Send message"
                                    type="submit"
                                />
                            </li>
                        </ul>
                    </form>
                </section>
                <section>
                    <ul className={s.contact}>
                        <li className="fa-twitter">
                            <i className={`fab fa-twitter ${s.faStyle}`} />
                            <a href="#">twitter.com/untitled-tld</a>
                        </li>
                        <li className="fa-facebook">
                            <i className={`fab fa-facebook ${s.faStyle}`} />
                            <a href="#">facebook.com/untitled-tld</a>
                        </li>
                        <li className="fa-instagram">
                            <i className={`fab fa-instagram ${s.faStyle}`} />
                            <a href="#">instagram.com/untitled-tld</a>
                        </li>
                        <li className="fa-envelope">
                            <i className={`fas fa-envelope ${s.faStyle}`} />
                            <a href="#">information@untitled.tld</a>
                        </li>
                        <li className="fa-home">
                            <i className={`fas fa-home ${s.faStyle}`} />
                            1234 Somewhere Road Suite 9823<br />Nashville, TN
                            00000-0000
                        </li>
                    </ul>
                </section>
            </div>
        </section>

        <footer className={s.footer}>
            <div className={s.copyright}>
                &copy; Untitled. All rights reserved. Images:{' '}
                <a href="http://unsplash.com">Unsplash</a>. Design:{' '}
                <a href="http://templated.co">TEMPLATED</a>.
            </div>
        </footer>
    </div>
);
export default withStyles(s)(Footer);
