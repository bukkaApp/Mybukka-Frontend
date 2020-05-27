import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import removeFromCart from 'Redux/removeFromCart';
import { connect } from 'react-redux';
import { useModalContext } from '../../context/ModalContext';
import Modal from '../modal/Modal';
import './ViewOrdersOnMobile.scss';

const ViewOrdersOnMobile = ({
  orderItems,
  // orderQuantity,
  removeFromCartAction,
  totalCost,
}) => {
  const businessName = orderItems.length ? orderItems[0].bukka.split('-').slice(0, -1).join(' ') : '';
  const wrapperRef = React.createRef();
  const { push } = useHistory();
  const { viewMoreOrderOnMobile, setViewMoreOrderOnMobile, setModal } = useModalContext();

  const handleClick = () => {
    setModal(false);
    setViewMoreOrderOnMobile(false);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setModal(false);
      setViewMoreOrderOnMobile(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  return (
    <Modal bodyClassName="modal-overflow-none" ref={wrapperRef} show={viewMoreOrderOnMobile} useFullWidth>
      <div className="View-Orders">
        <div className="View-Orders-Wrapper">
          <div className="View-Orders-Header">
            <div className="View-Orders-Header-Content">
              <div aria-pressed="false" tabIndex="0" role="button" onClick={handleClick} className="View-Orders-Header-Content-Item">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <defs><path id="icon-close_svg__a" d="M0 1.5L1.5 0 8 6.5 14.5 0 16 1.5 9.5 8l6.5 6.5-1.5 1.5L8 9.5 1.5 16 0 14.5 6.5 8z" /></defs>
                  <use xlinkHref="#icon-close_svg__a" transform="translate(4 4)" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <div className="View-Orders-Header-Title">
              <div className="View-Orders-Header-Title-Context">
                <h2 className="View-Orders-Header-Title-Text"><span>Order from {businessName}&apos;s</span></h2>
              </div>
            </div>
            <div className="">
              <div className="View-Orders-Content">
                {
                  orderItems.map(({ quantity, title, submenus, price, slug }, index) => (
                    <div key={slug} className="View-Orders-Content-Section">
                      <div className="View-Orders-Content-Item">
                        <div className="View-Orders-Content-Item-Qty">{quantity}</div>
                        <div className="View-Orders-Content-Item-Details">
                          <div className="View-Orders-Content-Item-Product">{title}</div>
                          <div className="View-Orders-Content-Item-Product-Addon">
                            {
                              submenus.reduce((val, item) => ` ${item.title} ${item.options.reduce((va, itm) => (
                                `${va} ${itm.name},`), '')}${val}`, '').trim()
                            }
                          </div>
                        </div>
                        <div className="View-Orders-Content-Item-Product-Price">
                          <span>₦{submenus.length < 1 ? price
                            : submenus.reduce((val, item) => val + item.options.reduce((va, itm) => (va + itm.price), 0), 0) + price
                          }</span>
                        </div>
                      </div>
                      <svg onClick={() => removeFromCartAction(slug, index)} width="12" height="12" viewBox="0 0 12 12" className="View-Orders-Product-Remove-icon">
                        <path d="M0 1.125L1.125 0 6 4.875 10.875 0 12 1.125 7.125 6 12 10.875 10.875 12 6 7.125 1.125 12 0 10.875 4.875 6z" fill="#8F95A3" fillRule="evenodd" />
                      </svg>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="View-Orders-Content-Subtotal-Section">
              <p className="View-Orders-Content-Subtotal-Text"><span>Subtotal</span></p>
              <p className="View-Orders-Content-Subtotal-Price"><span>₦{totalCost}</span></p>
            </div>
            <button
              onClick={() => {
                handleClick();
                const timeout = setTimeout(() => {
                  push(`/merchant/${orderItems[0].bukka}/checkout`);
                  clearTimeout(timeout);
                }, 100);
              }}
              className="View-Orders-Content-Checkout"
            >
              <span className="View-Orders-Content-Checkout-Text">
                <span>Checkout</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({
  cartReducer: { items, totalCost },
}) => ({
  orderQuantity: items.length,
  orderItems: items,
  totalCost,
});

export default connect(
  mapStateToProps,
  { removeFromCartAction: removeFromCart }
)(ViewOrdersOnMobile);

