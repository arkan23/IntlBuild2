import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../../components/Link/Link';
import s from './Catalog.css';

import pic1 from '../../../../public/images/pic01.jpg';
import pic2 from '../../../../public/images/pic02.jpg';
import pic3 from '../../../../public/images/pic03.jpg';

// // flow
// static propTypes = {
//   toggle: PropTypes.func.isRequired,
//   navState: PropTypes.bool.isRequired,
// };
const Catalog = () => (
  <section id="two" className={`${s.wrapper} ${s.style2} ${s.alt}`}>
    <div className={s.inner}>
      <div className={s.spotlight}>
        <div className={s.image}>
          <figure>
            <img src={pic1} alt="img04" />
            <figcaption>
              <h3>Settings</h3>
              <span>Jacob Cummings</span>
              <a href="http://dribbble.com/shots/1116685-Settings">
                Take a look
              </a>
            </figcaption>
          </figure>
        </div>
        <div className={s.content}>
          <h3>Ipsum pharetra tempus</h3>
          <p>
            Lorem ipsum nisl sed cursus magna et amet veroeros. Sed phasellus
            malesuada quis orci. Pellentesque eget consequat.
          </p>
          <ul className={s.actions}>
            <li>
              <a href="#" className={`${s.button} ${s.alt}`}>
                Details
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.spotlight}>
        <div className={s.image}>
          <figure>
            <img src={pic2} alt="img04" />
            <figcaption>
              <h3>Settings</h3>
              <span>Jacob Cummings</span>
              <a href="http://dribbble.com/shots/1116685-Settings">
                Take a look
              </a>
            </figcaption>
          </figure>
        </div>
        <div className={s.content}>
          <h3>Magna consequat felis</h3>
          <p>
            Lorem ipsum nisl sed cursus magna et amet veroeros. Sed phasellus
            malesuada quis orci. Pellentesque eget consequat.
          </p>
          <ul className={s.actions}>
            <li>
              <a href="#" className={`${s.button} ${s.alt}`}>
                Details
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.spotlight}>
        <div className={s.image}>
          <figure>
            <img src={pic1} alt="img04" />
            <figcaption>
              <h3>Settings</h3>
              <span>Jacob Cummings</span>
              <a href="http://dribbble.com/shots/1116685-Settings">
                Take a look
              </a>
            </figcaption>
          </figure>
        </div>
        <div className={`${s.content}`}>
          <h3>Vitae placerat adipiscing</h3>
          <p>
            Lorem ipsum nisl sed cursus magna et amet veroeros. Sed phasellus
            malesuada quis orci. Pellentesque eget consequat.
          </p>
          <ul className={s.actions}>
            <li>
              <a href="#" className={`${s.button} ${s.alt}`}>
                Details
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ul className={`${s.actions} ${s.special}`}>
        <li>
          <a href="#" className={`${s.button} ${s.alt}`}>
            Ipsum magna tempus
          </a>
        </li>
      </ul>
    </div>
  </section>
);

export default withStyles(s)(Catalog);
