/* eslint-disable array-callback-return */
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import requireAuth from 'Components/hoc/requireAuth';
import authServices from 'Utilities/authServices';
import { connect } from 'react-redux';
import Footer from 'Components/footer/Footer';
import BannerSection from '../common/BannerSection';
import PersonalizedHeader from '../components/PersonalizedHeader';
import { RelatedComplainArticle } from './RelatedComplainArticle';
import exportComplains from '../inputData/exportComplains';
import ComplainForm from './ComplainForm';
import reportIssue from '../actionCreator/reportIssue';
import { validateAField, validateAllFields } from '../validation/validateField';
import './category.scss';
import '../components/supportmainsection.scss';


const ComplainScene = ({ location, sendIssue, success }) => {
  const [inputData, setInputData] = useState({
    firstName: authServices.getTokenData().firstName || '',
    lastName: authServices.getTokenData().lastName || '',
    email: authServices.getTokenData().email || '',
    name: 'new Comment',
    content: '',
    category: '',
    subCategory: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    name: '',
    content: '',
    category: '',
    subCategory: '',
  });

  const handleContentDelivery = async () => {
    let defualtLoadedContent = { ...inputData, };
    await exportComplains
      .filter((eachComplain) => {
        if (eachComplain.link === location.pathname) {
          defualtLoadedContent = {
            ...defualtLoadedContent,
            category: eachComplain.category,
            subCategory: eachComplain.text
          };
          return defualtLoadedContent;
        }
      });


    setValidationErrors({
      ...validationErrors,
      category: '',
      subCategory: ''
    });
    return setInputData({
      ...inputData,
      ...defualtLoadedContent,
    });
  };

  const validateOnClick = (newValidationError) => {
    setValidationErrors({
      ...validationErrors,
      ...newValidationError,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name);
    setInputData({
      ...inputData,
      ...newFieldData,
    });
    setValidationErrors({
      ...validationErrors,
      [name]: validation.message
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    const validation = validateAllFields(inputData, true);

    const { errors, passes } = validation;
    validateOnClick(errors);

    handleContentDelivery();
    if (passes) {
      sendIssue(inputData);
      setInputData({
        ...inputData,
        content: '',
      });
    }
  };

  const generateSomeContext = () => {
    const complainData = exportComplains
      .filter(eachComplain => eachComplain.link === location.pathname);

    return complainData.map(eachComplainData =>
      (<Fragment>
        <RelatedComplainArticle
          data={eachComplainData.helpYourself}
        />
        <div className="unselectable personalized-header">
          <div className="personalized-header-text text-capitalize">
            {eachComplainData.category}:
            <span className="text-capitalize"> {eachComplainData.text}</span>
          </div>
        </div>
      </Fragment>
      ));
  };

  useEffect(() => {
    handleContentDelivery();
  }, []);

  return (
    <div>
      <BannerSection />
      <div className="support-main-section-container">
        <div className="col-md-12">
          <PersonalizedHeader
            className="unselectable category_heading__text"
            title="Help yourself or report your issue."
          />
          {generateSomeContext()}
          <ComplainForm
            inputData={inputData}
            handleChange={handleChange}
            handleClick={handleClick}
            success={success}
            validationErrors={validationErrors}
          />
          <div className="text-center text-uppercase text-success">
            {success && 'message sent'}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ reportIssueReducer: { success } }) => ({
  success
});

export default connect(mapStateToProps, {
  sendIssue: reportIssue
})(requireAuth(ComplainScene));

ComplainScene.defaultProps = {};

ComplainScene.propTypes = {
  location: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string
    ])
  ).isRequired,
  sendIssue: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
};
