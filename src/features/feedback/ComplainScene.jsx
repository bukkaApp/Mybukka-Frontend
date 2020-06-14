import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from 'Components/footer/Footer';
import BannerSection from '../support/common/BannerSection';
import PersonalizedHeader from '../support/components/PersonalizedHeader';
import { RelatedComplainArticle } from './RelatedComplainArticle';
import exportComplains from '../support/inputData/exportComplains';
import ComplainForm from './ComplainForm';
import { useLoadingContext } from '../../context/LoadingContext';
import { validateAField, validateAllFields }
  from '../support/validation/validateField';
import './category.scss';
import '../support/components/supportmainsection.scss';
import { useUserContext } from '../../context/UserContext';
import useApi from '../../shared/api';


const ComplainScene = ({ location, }) => {
  const { loading } = useLoadingContext();
  const { API } = useApi();

  const { user } = useUserContext();
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputData, setInputData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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

  useEffect(() => {
    if (user) setInputData({ ...inputData, ...user });
  }, [user]);

  const handleContentDelivery = async () => {
    let defualtLoadedContent = { ...inputData, };
    exportComplains
      .filter((eachComplain) => {
        if (eachComplain.link === location.pathname) {
          defualtLoadedContent = {
            ...defualtLoadedContent,
            category: eachComplain.category,
            subCategory: eachComplain.text
          };
          return defualtLoadedContent;
        }
        return eachComplain;
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

    setErrorMessage('');
    const validation = validateAllFields(inputData, true);

    const { errors, passes } = validation;
    validateOnClick(errors);

    handleContentDelivery();
    if (!passes) return;
    loading(true);

    const sendReport = () => API.reportIssue.post(inputData)
      .then(() => {
        setIsSent(true);
        loading(false);
        setInputData({ ...inputData, content: '', });
      })
      .catch((err) => {
        loading(false);
        setIsSent(true);
        setErrorMessage(err.response ? err.response.data.message : err.message);
        setInputData({ ...inputData, content: '', });
      });

    sendReport();
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
            success={isSent}
            validationErrors={validationErrors}
          />
          <div className={`text-center text-uppercase text-${errorMessage ? 'danger' : 'success'}`}>
            {isSent && (errorMessage || 'message sent')}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ComplainScene;

ComplainScene.defaultProps = {};

ComplainScene.propTypes = {
  location: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string
    ])
  ).isRequired,
};
