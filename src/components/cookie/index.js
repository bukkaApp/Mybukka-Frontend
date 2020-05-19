import React from 'react';
import Navlink from '../navlink/Navlink';
import { useCookieContext } from '../../context/UseCookie';

const styles = {
  wrapper: {
    zIndex: 500,
    fontSize: '13px',
    visibility: 'visible',
    backgroundColor: 'rgb(251, 251, 251)',
    padding: '20px 50px 20px 20px',
    color: 'rgb(17, 17, 17)',
    bottom: '0px',
    position: 'fixed',
    right: '0px',
    left: '0px',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0px 3px, rgba(0, 0, 0, 0.24) 0px 0px 2px; z-index: 900'
  },
  close: {
    lineHeight: '30px',
    width: '30px',
    height: '30px',
    fontSize: '30px',
    marginTop: '-15px',
    right: '10px',
    top: '50%',
    textAlign: 'center',
    position: 'absolute',
    transform: 'rotate(45deg)',
    cursor: 'pointer',
    fontFamily: '-webkit-pictograph'
  },
  content: { display: 'inline' },
  footer: { color: 'rgb(17, 17, 17)' }
};
// We use cookies to make sure you can have the best experience on our website
const Cookie = () => {
  const { displayCookie, cookie } = useCookieContext();

  return (
    <div id="cookie-disclaimer" style={{ ...styles.wrapper, visibility: cookie ? 'hidden' : 'visible' }}>
      <div id="cookie-disclaimer-close" tabIndex="0" role="button" aria-pressed="false" onClick={() => displayCookie(true)} style={styles.close}>+</div>
      <div id="cookie-disclaimer-text">
        This platform stores cookies on your computer. These cookies are used to collect information about how you interact with our website and allow us to remember you. We use this information in order to improve and customize your browsing experience
        {/* and for analytics and metrics about our visitors both */} on this website {/* and other media */}. To find out more about the cookies we use
        , see our <Navlink href="/legal/privacy" styles={styles.footer}>Privacy Policy</Navlink>.
        {/* <div id="cookie-policy" style={styles.content}>
          By continuing to use the service, you agree to our
          <a id="cookie-policy-link" href="/cookie-policy" style={styles.footer}> Cookie Policy</a>
        </div> */}
      </div>
    </div>
  );
};

export default Cookie;
