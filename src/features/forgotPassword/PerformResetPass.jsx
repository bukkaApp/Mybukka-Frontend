import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import Navbar from '../../components/navbar/index';
import Container from 'Components/container';
import AuthResetForm from './components/AuthResetForm';
import TokenErrorFeedback from './components/TokenErrorFeedback';

import useApi from '../../shared/api';
import { validateAField, validateAllFields } from './helper/validateFields';

import signUpDomStructure from './signUpDomStructure.json';
import useQuery from '../../hooks/useQuery';

import './PerformResetPass.scss';
import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/LoadingContext';

const PerformResetPass = () => {
  const query = useQuery();
  const { API } = useApi();
  const { setUser } = useUserContext();
  const { loading } = useLoadingContext();
  const { push } = useHistory();
  // tokenReq => token Requested, passReset => password reset requested feedback
  const [state, setState] = useState({ tokenReq: false, isError: false });
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    password: '',
    confirmPassword: ''
  });

  const [inputData, setInputData] = useState({
    password: '',
    confirmPassword: ''
  });

  const validateOnClick = (newValidationErrors) => {
    setValidationErrors({
      ...validationErrors,
      ...newValidationErrors
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name);
    setInputData({
      ...inputData,
      ...newFieldData
    });
    setValidationErrors({
      ...validationErrors,
      [name]: validation.message
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateAllFields(inputData);

    const { errors, passes } = validation;
    validateOnClick(errors);

    if (passes) {
      loading(false);
      return API.passwordReset.put({ data: inputData })
        .then(() => push('/login'))
        .catch((err) => {
          loading(false);
          setErrorMessage(err.response ? err.response.data.message : err.message);
        });
    }
  };

  useEffect(() => {
    const token = query.get('token');
    if (!token) return push('/');
    loading(true);

    setUser(null, token);

    const validateToken = () => {
      if (!state.tokenReq) {
        return API.validateToken.get()
          .then(() => {
            loading(false);
            setState({ ...state, tokenReq: true, isError: false });
          })
          .catch(() => {
            loading(false);
            setState({ ...state, tokenReq: true, isError: true });
          });
      }
    };

    validateToken();
  }, []);

  return (
    <React.Fragment>
      <Navbar push={push} />
      <div className="bg-color py-8">
        <Container classNames="relative modal-open Perform-Reset-Pass">
          <div
            className="d-flex flex-column flex-xl-row
              flex-lg-row flex-md-column justify-content-center"
          >
            <div
              className="col-xl-6 col-lg-6 px-0
                px-md-0 px-lg-3 col-md-12 col-12"
            >
              {state.tokenReq &&
              <div className="Imaginery-Card-Section mb-3">
                {!state.isError ? (
                  <AuthResetForm
                    push={push}
                    title="Reset Password"
                    errorMessage={errorMessage}
                    instruction="Type your new password"
                    handleChange={handleChange}
                    inputData={inputData}
                    validationErrors={validationErrors}
                    handleSubmit={handleSubmit}
                    domStructure={signUpDomStructure}
                    isFormCompleted
                  />
                ) : (
                  <TokenErrorFeedback push={push} />
                )}
              </div>
              }
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PerformResetPass;
