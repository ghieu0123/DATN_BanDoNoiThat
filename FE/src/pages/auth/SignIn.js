import React, { Fragment, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../../css/class.css';
import { Button, Card, CardBody, FormGroup, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ReactstrapInput } from 'reactstrap-formik';
import { FastField, Form, Formik, Field, ErrorMessage } from 'formik';
import { TextInput } from '../../custom_/Text';
import * as Yup from 'yup';
import LoginApi from '../../api/LoginApi';
import avatar from '../../assets/img/avatars/avatar-vip-pro.jpg';
import logo from '../../assets/logo/logo.jpg';
import Storage from '../../storage/Storage';
import UserApi from '../../api/UserApi';
import { render } from '@testing-library/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotifiBox4 from '../../components/component/box/NotifiBox4';

const handleShowErrorNotification = () => {
  toast.error('Login Fail! Wrong Username or Password!', {
    toastId: 'login-error', // Đặt một toastId cụ thể
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const handleShowSuccessotification = () => {
  toast.success('Login successfully!', {
    toastId: 'login-success', // Đặt một toastId cụ thể
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const SignIn = (pathname) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isDisableResendButton, setDisableResendButton] = useState(false);
  const [isRememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isShow, setShow] = useState(false);

  const handleButtonClick = () => {
    setOpenModal(false);
    Storage.removeToken();
    Storage.removeUserInfo();
  };

  const resendEmailToActiveAccount = async () => {
    setShow(true);
    setDisableResendButton(true);
    await UserApi.resendEmailToActiveAccount(email);
    Storage.setToken(null);
    setDisableResendButton(false);
    setShow(false);
  };

  // rememberMe
  const [checkedRememberMe, setCheckedRememberMe] = React.useState(Storage.isRememberMe());

  return (
    <React.Fragment>
      <div className="text-center mt-4">
        <h2>Welcome to STORE</h2>
        <p className="lead">PLEASE SIGN IN</p>
      </div>
      <ToastContainer />
      <Formik
        initialValues={{
          username: '',
          password: '',
          errorForm: '',
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required('Required')
            .max(50, 'Must be between 6 to 50 characters')
            .min(4, 'Must be between 4 to 50 characters'),

          password: Yup.string()
            .max(50, 'Must be between 6 to 50 characters')
            .min(6, 'Must be between 6 to 50 characters')
            .required('Required'),
        })}
        onSubmit={async (values, { setFieldError }) => {
          try {
            // call api
            const result = await LoginApi.login(values.username, values.password);

            // login successfully!
            // account not active
            if (result.status === 'NOT_ACTIVE') {
              // open model
              setOpenModal(true);
              setEmail(result.email);
            } else {
              // account actived
              // save remember me to storage
              Storage.setRememberMe(isRememberMe);
              // save token to storage
              Storage.setToken(result.token);
              // save user info to storage

              try {
                const userResult = await UserApi.getProfile();
                const user = {
                  firstName: userResult.firstName,
                  lastName: userResult.lastName,
                  username: userResult.username,
                  email: userResult.email,
                  address: userResult.address,
                  phone: userResult.phone,
                  role: userResult.role,
                  status: userResult.status,
                };

                if (userResult.status === 'NOT_ACTIVE') {
                  // open model
                  setOpenModal(true);
                  setEmail(userResult.email);
                } else {
                  handleShowSuccessotification();
                  Storage.setUserInfo(user);
                  navigate('/');
                }
              } catch (error) {
                if (error.status === 500) {
                  handleShowErrorNotification();
                } else {
                  setFieldError('errorForm', 'There is an error from the server');
                  console.log(error);
                }
              }
            }
          } catch (error) {
            if (error.status === 500) {
              handleShowErrorNotification();
            } else {
              setFieldError('errorForm', 'There is an error from the server');
              console.log(error);
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Card>
            <CardBody className="auth">
              <div className="m-sm-4">
                <div className="text-center">
                  <Link to={'/'}>
                    <img src={logo} alt="Chris Wood" className="img-fluid rounded-circle" width="132" height="132" />
                  </Link>
                </div>
                <Form>
                  {/* username */}
                  <FormGroup>
                    <FastField
                      label="Username"
                      bsSize="lg"
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  {/* password */}
                  <FormGroup>
                    <FastField
                      label="Password"
                      bsSize="lg"
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <ErrorMessage
                    name="errorForm"
                    component={'div'}
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  />

                  {/* remember me */}
                  <div>
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={isRememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe">Remember me next time</label>
                  </div>

                  {/* forgot password */}
                  <p>
                    <Link className="link-router" to="/reset-password">
                      Forgot password?{'   '}
                    </Link>
                    Or
                    <Link to="/sign-up"> Sign up</Link> here!{' '}
                  </p>

                  {/* submit */}
                  <div className="text-center mt-3">
                    <Button type="submit" className="white-btn" size="lg" disabled={isSubmitting}>
                      Sign in
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        )}
      </Formik>

      <Modal isOpen={isOpenModal}>
        {/* header */}
        <ModalHeader>You need to confirm your account</ModalHeader>

        {/* body */}
        <ModalBody className="m-3">
          <p>Your account is not active.</p>
          <p>
            Please check your email (<b>{email}</b>) to active account.
          </p>
        </ModalBody>

        {/* footer */}
        <ModalFooter>
          {/* resend */}
          <Button
            className="black-btn"
            onClick={resendEmailToActiveAccount}
            style={{ marginLeft: 10 }}
            disabled={isDisableResendButton}
          >
            Resend
          </Button>

          {/* close button */}
          <Button className="white-btn" onClick={() => handleButtonClick()}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      {isShow === true ? <NotifiBox4 /> : <Fragment />}
    </React.Fragment>
  );
};

export default SignIn;
