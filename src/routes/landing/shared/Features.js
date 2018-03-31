import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../../components/Link/Link';
import s from './Features.css';
// // flow
// static propTypes = {
//   toggle: PropTypes.func.isRequired,
//   navState: PropTypes.bool.isRequired,
// };
const Features = () => (
    <section id="one" className={s.wrapper}>
        <div className={`${s.inner} ${s.split}`}>
            <section>
                <h2>Magna feugiat adipiscing</h2>
                <p>
                    Lorem ipsum nisl sed cursus magna et amet veroeros. Sed
                    phasellus aliquam et tempus lorem feugiat adipiscing lorem.
                    Morbi pharetra vitae felis placerat pharetra. Nulla risus
                    orci, dapibus id malesuada et nec, malesuada quis orci.
                    Pellentesque eget consequat.
                </p>
                <ul className={s.actions}>
                    <li>
                        <a href="#" className={`${s.button} ${s.alt}`}>
                            Learn more
                        </a>
                    </li>
                </ul>
            </section>
            <section>
                <ul className={s.checklist}>
                    <li>
                        <i className={`fas fa-check ${s.faStyle}`} />Ipsum nisl
                        sed cursus magna
                    </li>
                    <li>
                        <i className={`fas fa-check ${s.faStyle}`} />Amet
                        veroeros sed aliquam consequat
                    </li>
                    <li>
                        <i className={`fas fa-check ${s.faStyle}`} />Tempus
                        lorem adipiscing et lorem
                    </li>
                    <li>
                        <i className={`fas fa-check ${s.faStyle}`} />Morbi
                        pharetra vitae felis placerat
                    </li>
                    <li>
                        <i className={`fas fa-check ${s.faStyle}`} />Pharetra
                        nulla risus orci dapibus
                    </li>
                </ul>
            </section>
        </div>
    </section>
);

export default withStyles(s)(Features);
