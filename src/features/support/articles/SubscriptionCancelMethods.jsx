import React from 'react';
import Navlink from 'Components/navlink/Navlink';

const style = { fontWeight: 400 };

const SubscriptionCancelMethods = () => (
  <div>
    <div className="articles-body">
      <div className="article-body-content">
        <p>
          Canceling from the Mybukka App (iOS, Android):
        </p>
        <ol>
          <li>
            <span style={style}>
                    &nbsp;Log into the app.
            </span>
          </li>
          <li>
            <span style={style}>
              &nbsp;Select your profile icon in the upper
              left-hand corner of the app.
            </span>
          </li>
          <li>
            <span style={style}>
                    &nbsp;Select Unlimited Membership in the menu.
            </span>
          </li>
          <li>
            <span style={style}>
                    &nbsp;Select {'"Manage Plan"'} in menu.
            </span>
          </li>
          <li>
            <span style={style}>
                    &nbsp;Select {'"Cancel Membership"'}
            </span>
          </li>
          <li>
            <span style={style}>
                    &nbsp;Confirm by selecting {'"Cancel Unlimited."'}
            </span>
          </li>
        </ol>
        <p className="p1">
          Canceling from
          <strong className="text-dark"> Mybukka website</strong>
          <span style={style}>:</span>
        </p>
        <ol>
          <li>
            <span style={style}>
                    &nbsp;Log into{' '}
            </span>
            <Navlink href="/">
              <span style={style}>
                https://mybukka.com
              </span>
            </Navlink>
          </li>
          <li>
            <span style={style}>
                &nbsp;Select {'"Account Settings" '}
              from your profile
              icon in the upper right-hand corner of the page.
            </span>
          </li>
          <li>
            <span style={style}>
                &nbsp;Under Bukka Unlimited, select
              {'"Cancel Automatic Renewal."'}
            </span>
          </li>
          <li>
            <span style={style}>
                    &nbsp;Confirm by selecting {'"I\'m sure."'}
            </span>
          </li>
        </ol>
        <p>&nbsp;</p>
      </div>
    </div>
  </div>
);

export default SubscriptionCancelMethods;
