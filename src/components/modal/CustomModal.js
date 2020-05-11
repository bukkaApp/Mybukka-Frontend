import React, { useState } from 'react';

import './CustomModal.scss';

const ModalDrop = () => {
  const [state, setState] = useState({ show: false });
  const wrapperRef = React.createRef();

  const showModal = () => {
    setState({ show: true });
  };

  const hideModal = () => {
    setState({ show: false });
  };

  return (
    <div>
      <div className="Modal-Wrapper edf5mpm1">
        <div className="Modal-Wrapper-Body edf5mpm0">
          <form className="Modal-InnerForm e17i4t1w0">
            <div className="Modal-InnerContent e17i4t1w1">
              <div id="" className="Modal-Left-Section e1qfcze90">
                <div>
                  <img alt="raster" src="https://raster-static.postmates.com/?url=https%3A%2F%2Fitems-static.postmates.com%2Fuploads%2Fmedia%2Ff7eebd8a-97ae-5ffd-bbda-28f7c4aaff21%2Ff7eebd8a-97ae-5ffd-bbda-28f7c4aaff21.jpg%3Fv%3D63756201977&amp;quality=85&amp;w=0&amp;h=128&amp;mode=auto&amp;format=webp&amp;v=4" className="Modal-Invisible-Image e1qfcze93" />
                  <img alt="raster" src="https://raster-static.postmates.com/?url=https%3A%2F%2Fitems-static.postmates.com%2Fuploads%2Fmedia%2Ff7eebd8a-97ae-5ffd-bbda-28f7c4aaff21%2Ff7eebd8a-97ae-5ffd-bbda-28f7c4aaff21.jpg%3Fv%3D63756201977&amp;quality=85&amp;w=0&amp;h=640&amp;mode=auto&amp;format=webp&amp;v=4" className="Modal-Invisible-Image e1qfcze94" />
                  <div title="" className="Modal-Visible-Image-Filter" style={{ backgroundImage: 'url(https://raster-static.postmates.com/?url=https%3A%2F%2Fitems-static.postmates.com%2Fuploads%2Fmedia%2Ff7eebd8a-97ae-5ffd-bbda-28f7c4aaff21%2Ff7eebd8a-97ae-5ffd-bbda-28f7c4aaff21.jpg%3Fv%3D63756201977&amp;quality=85&amp;w=0&amp;h=128&amp;mode=auto&amp;format=webp&amp;v=4)', opacity: 1 }} />
                  <div title="" className="Modal-Visible-Image" style={{ backgroundImage: 'url(https://raster-static.postmates.com/?url=https%3A%2F%2Fitems-static.postmates.com%2Fuploads%2Fmedia%2Ff7eebd8a-97ae-5ffd-bbda-28f7c4aaff21%2Ff7eebd8a-97ae-5ffd-bbda-28f7c4aaff21.jpg%3Fv%3D63756201977&amp;quality=85&amp;w=0&amp;h=640&amp;mode=auto&amp;format=webp&amp;v=4)', opacity: 1 }} />
                </div>
                <div className="Modal-Image-Resize e1qfcze92" />
                <div className="Modal-Left-Icon e17i4t1w11">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <defs><path id="icon-close_svg__a" d="M0 1.5L1.5 0 8 6.5 14.5 0 16 1.5 9.5 8l6.5 6.5-1.5 1.5L8 9.5 1.5 16 0 14.5 6.5 8z" /></defs>
                    <use xlinkHref="#icon-close_svg__a" transform="translate(4 4)" /></svg>
                </div>
              </div>
              <div className="Modal-Right-Section e17i4t1w3">
                <div className="Modal-Right-Section-Top e17i4t1w4">
                  <div className="Modal-Right-Icon e17i4t1w10">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <defs><path id="icon-close_svg__a" d="M0 1.5L1.5 0 8 6.5 14.5 0 16 1.5 9.5 8l6.5 6.5-1.5 1.5L8 9.5 1.5 16 0 14.5 6.5 8z" />
                      </defs><use xlinkHref="#icon-close_svg__a" transform="translate(4 4)" />
                    </svg>
                  </div>
                  <div className="Modal-Right-Section-Header e17i4t1w5">
                    <h1 className="Modal-Right-Section-Head">Big Breakfast</h1>
                    <p className="Modal-Right-Section-Head-Transparent e17i4t1w7" />
                    <span className="Modal-Right-Section-Head-Hint e3dzlyh0">
                      <span>750 cal</span>
                    </span>
                  </div>
                  <div className="Modal-Right-Section-Body e17i4t1w8">
                    <div className="Modal-Wrapper-Body-Content e7c2yy62">
                      <div className="Modal-Wrapper-Body-Content-Title e7c2yy63">
                        <span className="Modal-Wrapper-Body-Content-Title-Text e7c2yy64">
                          <span>Remove from Big Breakfast (Up to 3)</span>
                        </span>
                      </div>
                      <ul className="Modal-Wrapper-Body-Content-Body e7c2yy60">
                        <li className="Modal-Wrapper-Body-Content-Body-Item e7c2yy61">
                          <div className="Modal-Wrapper-Body-Content-Body-Item_Content e7c2yy69">
                            <input id="f2933891-a0c7-59cc-b48f-f73ee3bec6c5" type="checkbox" className="Modal-Wrapper-Body-Content-Body-Item_Checkbox e7c2yy67" value="f2933891-a0c7-59cc-b48f-f73ee3bec6c5" />
                            <label htmlFor="f2933891-a0c7-59cc-b48f-f73ee3bec6c5">No Scrambled Eggs<span className="label-hint e3dzlyh0"><span>140 cal</span></span></label>
                          </div>
                        </li>
                        <li className="Modal-Wrapper-Body-Content-Body-Item e7c2yy61">
                          <div className="Modal-Wrapper-Body-Content-Body-Item_Content e7c2yy69">
                            <input id="f35342c8-f7ce-511e-b16b-9df30b011797" type="checkbox" className="Modal-Wrapper-Body-Content-Body-Item_Checkbox e7c2yy67" value="f35342c8-f7ce-511e-b16b-9df30b011797" />
                            <label htmlFor="f35342c8-f7ce-511e-b16b-9df30b011797">No Sausage<span className="label-hint e3dzlyh0"><span>190 cal</span></span></label>
                          </div>
                        </li>
                        <li className="Modal-Wrapper-Body-Content-Body-Item e7c2yy61">
                          <div className="Modal-Wrapper-Body-Content-Body-Item_Content e7c2yy69">
                            <input id="04ed632b-b9b7-57f6-8895-6aaed8826df3" type="checkbox" className="Modal-Wrapper-Body-Content-Body-Item_Checkbox e7c2yy67" value="04ed632b-b9b7-57f6-8895-6aaed8826df3" />
                            <label htmlFor="04ed632b-b9b7-57f6-8895-6aaed8826df3">No Biscuit<span className="label-hint e3dzlyh0"><span>270 cal</span></span></label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="Modal-Wrapper-Body-Content e7c2yy62">
                      <div className="Modal-Wrapper-Body-Content-Title e7c2yy63">
                        <span className="Modal-Wrapper-Body-Content-Title-Text e7c2yy64">
                          <span>Extra for Big Breakfast (Up to 3)</span>
                        </span>
                      </div>
                      <ul className="Modal-Wrapper-Body-Content-Body e7c2yy60">
                        <li className="Modal-Wrapper-Body-Content-Body-Item e7c2yy61">
                          <div className="Modal-Wrapper-Body-Content-Body-Item_Content e7c2yy69">
                            <input id="0fbf9e0a-338e-5da4-8aa4-e66305e4dfe7" type="checkbox" className="Modal-Wrapper-Body-Content-Body-Item_Checkbox e7c2yy67" value="0fbf9e0a-338e-5da4-8aa4-e66305e4dfe7" />
                            <label htmlFor="0fbf9e0a-338e-5da4-8aa4-e66305e4dfe7">Extra Scrambled Eggs<span className="label-hint e3dzlyh0">
                              <span>140 cal</span></span></label>
                            <span className="label-price e7c2yy66">+<span>$2.39</span></span></div></li>
                        <li className="Modal-Wrapper-Body-Content-Body-Item e7c2yy61"><div className="Modal-Wrapper-Body-Content-Body-Item_Content e7c2yy69">
                          <input id="24e3fcfc-06ef-54b3-991b-8ad0e3587d01" type="checkbox" className="Modal-Wrapper-Body-Content-Body-Item_Checkbox e7c2yy67" value="24e3fcfc-06ef-54b3-991b-8ad0e3587d01" />
                          <label htmlFor="24e3fcfc-06ef-54b3-991b-8ad0e3587d01">Extra Sausage<span className="label-hint e3dzlyh0">
                            <span>190 cal</span></span></label>
                          <span className="label-price e7c2yy66">+<span>$2.39</span></span>
                        </div>
                        </li>
                        <li className="Modal-Wrapper-Body-Content-Body-Item e7c2yy61">
                          <div className="Modal-Wrapper-Body-Content-Body-Item_Content e7c2yy69">
                            <input id="1bc2a734-0fe7-5719-8110-1463e9a69cd2" type="checkbox" className="Modal-Wrapper-Body-Content-Body-Item_Checkbox e7c2yy67" value="1bc2a734-0fe7-5719-8110-1463e9a69cd2" />
                            <label htmlFor="1bc2a734-0fe7-5719-8110-1463e9a69cd2">Extra Biscuit<span className="label-hint e3dzlyh0">
                              <span>270 cal</span></span>
                            </label>
                            <span className="label-price e7c2yy66">+<span>$1.91</span></span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* small screen */}
                  <div className="Modal-Wrapper-Footer-SmallScreen">
                    <div className="Modal-Wrapper-Footer-SmallScreen-Minus">-</div>
                    <div className="Modal-Wrapper-Footer-SmallScreen-Value"><span>1</span></div>
                    <div className="Modal-Wrapper-Footer-SmallScreen-Plus">+</div>
                  </div>
                </div>
                {/* big screen- for responsiveness on 767 or 768 add class = Modal-Wrapper-Footer-BigScreen-Resp */}
                <div className="Modal-Wrapper-Footer-BigScreen">
                  <div className="Modal-Wrapper-Footer-BigScreen-Wrapper">
                    <div className="Modal-Wrapper-Footer-SmallScreen-Minus">-</div>
                    <div className="Modal-Wrapper-Footer-SmallScreen-Value "><span>1</span></div>
                    <div className="Modal-Wrapper-Footer-SmallScreen-Plus">+</div>
                  </div>
                  <button type="submit" data-add-to-cart="true" className="Modal-Wrapper-Footer-Button">
                    <span className="Modal-Wrapper-Footer-Button-Item1" />
                    <span className="Modal-Wrapper-Footer-Button-Item2"><span>Add to Cart</span></span>
                    <span className="Modal-Wrapper-Footer-Button-Item3"><span>$7.19</span></span>
                  </button>
                </div>
              </div>
            </div>
            {/* Modal-Wrapper-Footer-BigScreen to be display here on < medium screen */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalDrop;
// const Modal = ({ handleClose, show, children }) => {
//   const showHideClassName = show ? 'modal display-block' : 'modal display-none';

//   return (
//     <div className={showHideClassName}>
//       <section className="modal-main">
//         {children}
//         <button
//           onClick={handleClose}
//         >
//           Close
//         </button>
//       </section>
//     </div>
//   );
// };
