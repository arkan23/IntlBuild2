import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../../components/Link/Link';
import s from './Footer__.css';

const Footer = () => (
  <div className={s.footer}>
    <div className={s.firstFooter}>
      <div className="col-md-2">
        <ul>
          <li>
            <h4>Contact</h4>
          </li>
          <li>
            <Link to="/">About us</Link>
          </li>
          <li>
            <Link to="/">Donates</Link>
          </li>
          <li>
            <Link to="/">Video</Link>
          </li>
          <li>
            <Link to="/">Posts</Link>
          </li>
        </ul>
      </div>
      <div className="col-md-2">
        <ul>
          <li>
            <h4>Goods</h4>
          </li>
          <li>
            <Link to="/">Milo</Link>
          </li>
          <li>
            <Link to="/">Barber</Link>
          </li>
          <li>
            <Link to="/">Auto</Link>
          </li>
        </ul>
      </div>
      <div className="col-md-8">
        <h4>Lets get social shall we?</h4>
        <p className={s.socialP}>
          Lorem Ipsum - это текст-рыба, часто используемый в печати и
          вэб-дизайне. Lorem Ipsum является стандартной для текстов на латинице
          с начала XVI века. В то время некий безымянный печатник создал большую
        </p>
        <div className="row">
          <div className={s.socialItem}>
            <Link to="/" className={s.socialSpan}>
              <i className="fab fa-vk" />Follow us on Vk
            </Link>
          </div>
          <div className={s.socialItem}>
            <Link to="/" className={s.socialSpan}>
              <i className="fab fa-instagram" />Follow us on inst
            </Link>
          </div>
          <div className={s.socialItem}>
            <Link to="/" className={s.socialSpan}>
              <i className="fab fa-twitter" />Follow us on twitter
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className={s.secondFooter}>
      <p className={s.firstP}>
        SolidShops was built for awesome people. If you are awesome, fear not.
        Otherwise, please read our rules of play.{' '}
      </p>
      <p className={s.secondP}>Terms of Use ~ Privacy Policy ~ Report Abuse</p>
      <p className={s.thirdP}>
        Copyright © 2009-2015 SolidShops. All Rights Reserved.
      </p>
    </div>
  </div>
);
export default withStyles(s)(Footer);
