import React, { useState, Fragment } from 'react';

import PropTypes from 'prop-types';

import Field from '../../components/input/Field';
import ButtonPlain from '../button-plain/ButtonPlain';

import './PlainParagraph.scss';

const PlainParagraph = ({
  value,
  text,
  name,
  heading,
  withHeading,
  children,
  onClick,
  onDoubleClick,
  buttonText,
  withPrimaryButton,
  aligned,
  type,
  placeHolder,
  handleChange,
  errorMessage,
  withForm,
  noBorderOnMedium,
  title,
}) => {
  const inpRef = React.createRef();
  const [state, setState] = useState(false);
  const [seenError, setSeen] = useState(false);

  const emitOnClick = () => {
    if (inpRef.current && state) inpRef.current.focus();
    if (errorMessage) return setSeen(prev => !prev);
    if (state) onClick();
    setState(prev => !prev);
  };

  const decodeErrorWrapper = () => {
    if (errorMessage && !seenError) return 'Plain-Paragraph-Error-Wrapper';
    return '';
  };

  const decodeButtonText = () => {
    if (errorMessage && !seenError) return 'OK';
    if (state) return 'SAVE';
    return buttonText;
  };

  const hasErrorMessage = (errorMessage && !seenError);

  const plainParagraphErrorJsx = (
    (errorMessage && !seenError) &&
      <div className="form-group Plain-Paragraph-Content-Details">
        <p className="error-details text-danger">{errorMessage}</p>
      </div>
  );

  const plainParagraphOrInputJsx = (
    !(withForm || state) ?
      <p className="Plain-Paragraph--text">{text}</p> :
      (<Field.Input
        type={type}
        readOnly={!state}
        placeholderText={placeHolder}
        classNames="Plain-Paragraph--text"
        name={name}
        ref={inpRef}
        handleChange={handleChange}
        value={value}
      />)
  );

  const plainParagraphJsx = (
    <div className="form-group Plain-Paragraph-Content-Details">
      {children || plainParagraphOrInputJsx}
    </div>
  );

  if (withForm) {
    return (
      <Fragment>
        {withHeading && <h5 className="Plain-Paragraph-Header">{heading}</h5>}
        <div className={`${decodeErrorWrapper()} Plain-Paragraph-Wrapper`}>
          <form className={`Plain-Paragraph-Content Plain-Paragraph-Content--${aligned}`}>
            {hasErrorMessage ? plainParagraphErrorJsx : plainParagraphJsx}
            <ButtonPlain withPrimaryButton={state} onClick={emitOnClick} text={decodeButtonText()} />
          </form>
        </div>
      </Fragment>
    );
  }

  return (
    <div className={`Plain-Paragraph-Wrapper ${(noBorderOnMedium && 'Plain-Medium-Border--less') || ''}`}>
      <div title={title} onDoubleClick={onDoubleClick} className={`Plain-Paragraph-Content Plain-Paragraph-Content--${aligned}`}>
        {plainParagraphJsx}
        <ButtonPlain withPrimaryButton={withPrimaryButton} onClick={onClick} text={buttonText} />
      </div>
    </div>
  );
};

export default PlainParagraph;

PlainParagraph.defaultProps = {
  buttonText: 'EDIT',
  children: '',
  altText: '',
  onClick: () => {},
};

PlainParagraph.propTypes = {
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func
};
