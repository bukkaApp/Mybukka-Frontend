import React from 'react';

const SubscriptionCancelMethods = () => (
  <div>
    <div className="articles-body">
      <div className="article-body-content">
        <p>
            Canceling from the Mybukka App (iOS, Android):
        </p>
        <ol>
          <li>
            <span style={{ fontWeight: 400 }}>
                    &nbsp;Log into the app.
            </span>
          </li>
          <li>
            <span style={{ fontWeight: 400 }}>
                    &nbsp;Select your profile icon in the upper
                    left-hand corner of the app.
            </span>
          </li>
          <li>
            <span style={{ fontWeight: 400 }}>
                    &nbsp;Select Unlimited Membership in the menu.
            </span>
          </li>
          <li>
            <span style={{ fontWeight: 400 }}>
                    &nbsp;Select {'"Manage Plan"'} in menu.
            </span>
          </li>
          <li>
            <span style={{ fontWeight: 400 }}>
                    &nbsp;Select {'"Cancel Membership"'}
            </span>
          </li>
          <li>
            <span style={{ fontWeight: 400 }}>
                    &nbsp;Confirm by selecting {'"Cancel Unlimited."'}
            </span>
          </li>
        </ol>
        <p className="p1">
                Canceling from
          <strong className="text-dark"> Mybukka website</strong>
          <span style={{ fontWeight: 400 }}>:</span>
        </p>
        <ol>
          <li>
            <span style={{ fontWeight: 400 }}>
                    &nbsp;Log into{' '}
            </span>
            <a href="/">
              <span style={{ fontWeight: 400 }}>
                    https://mybukka.com
              </span>
            </a>
          </li>
          <li>
            <span style={{ fontWeight: 400 }}>
                &nbsp;Select {'"Account Settings" '}
                from your profile
                icon in the upper right-hand corner of the page.
            </span>
          </li>
          <li>
            <span style={{ fontWeight: 400 }}>
                &nbsp;Under Bukka Unlimited, select
              {'"Cancel Automatic Renewal."'}
            </span>
          </li>
          <li>
            <span style={{ fontWeight: 400 }}>
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
