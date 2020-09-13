import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DismissModal from '../modal/DismissModal';
import Modal from '../modal/Modal';
import Field from '../input/Field';
import NoResult from '../not-found/NoResult';

import { useSearchContext } from '../../context/SearchContext';
import { useBusinessContext } from '../../context/BusinessContext';
import { useModalContext } from '../../context/ModalContext';

import './CatelogsPopupOnSmallScreen.scss';

const CatelogsPopupOnSmallScreen = () => {
  const [state, setState] = useSearchContext();
  const { catelogs, business } = useBusinessContext();
  const { location, push } = useHistory();
  const { pathname } = location;
  const {
    setModal,
    setCatelogsOnSmallScreenPopup,
    catelogsOnSmallScreenPopup,
  } = useModalContext();
  const [uniqueCatelogs, setUniqueCatelogs] = useState([]);

  const isInSearch = (catelog) => {
    if (catelog) {
      return catelog.title.toLowerCase().includes(state.toLowerCase());
    }
    return false;
  };

  const hasNoResult = () =>
    catelogs && catelogs.filter((menu) => isInSearch(menu)).length === 0;

  useEffect(() => {
    if (catelogs) {
      const categories = [
        ...new Set(catelogs.map((catelog) => catelog.category)),
      ];
      setUniqueCatelogs(categories);
    }
    return () => setState('');
  }, [catelogs]);

  const onKeyDown = (e, closed) => {
    if (e.keyCode === 13 || closed) {
      setModal(false);
      setCatelogsOnSmallScreenPopup(false);
    }
  };

  const onClick = (e, hashPath) => {
    e.preventDefault();
    setModal(false);
    setCatelogsOnSmallScreenPopup(false);
    const timeout = setTimeout(() => {
      push(hashPath);
      clearTimeout(timeout);
    }, 1000);
  };

  const resolveValidId = (title) =>
    title.replace(/ /g, '-').replace(/'/g, '-').replace(/₦/g, '-');

  const hashPath = (catelog) =>
    `${pathname}#catelog-${resolveValidId(catelog._id)}`;

  const _uniquePath = (catelog) => `${pathname}#${resolveValidId(catelog)}`;

  const hasNoCatelog = () =>
    (business && `${business.title} has no catelog`) || null;

  return (
    <Modal
      show={catelogsOnSmallScreenPopup}
      bodyClassName="select-delivery-pickup"
    >
      <div className="small-search-container">
        <div className="bukka-nav-small-category-border pb-2">
          <div className="mx-4 row align-items-center">
            <div
              aria-pressed="true"
              role="button"
              tabIndex="0"
              onClick={(e) => onKeyDown(e, true)}
              className="col-2 px-0"
            >
              <DismissModal classNames="pl-0" />
            </div>
            <div className="col-10">
              <Field.Input
                placeholderText={state || 'Search'}
                value={state}
                name="welcome"
                onKeyDown={(e) => onKeyDown(e)}
                handleChange={(e) => setState(e.target.value)}
                classNames="bukka-nav-search-input"
              />
            </div>
          </div>
        </div>
        <div className="small-search-wrapper">
          <div className="dropdown-suggestion">
            <Fragment>
              <div className="mx-4">
                {!state &&
                  catelogs &&
                  uniqueCatelogs.map((eachUniqueCatelog) => (
                    <Link
                      onClick={(e) =>
                        onClick(e, _uniquePath(eachUniqueCatelog))
                      }
                      className="Catelog-Popup-Link"
                      to={_uniquePath(eachUniqueCatelog)}
                      key={eachUniqueCatelog}
                    >
                      <div className="bukka-nav-small-category">
                        {eachUniqueCatelog}
                      </div>
                    </Link>
                  ))}

                {state &&
                  catelogs &&
                  catelogs.map(
                    (catelog) =>
                      isInSearch(catelog) && (
                        <Link
                          onClick={(e) => onClick(e, hashPath(catelog))}
                          className="Catelog-Popup-Link"
                          to={hashPath(catelog)}
                          key={catelog._id}
                        >
                          <div className="bukka-nav-small-category">
                            {catelog.title}
                          </div>
                        </Link>
                      )
                  )}

                {hasNoResult() && (
                  <NoResult
                    details={!catelogs ? hasNoCatelog() : null}
                    withPadding
                    text={state}
                  />
                )}
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CatelogsPopupOnSmallScreen;
