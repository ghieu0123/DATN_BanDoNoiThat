import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, CardBody, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FastField, Form, Formik, Field, ErrorMessage } from 'formik';
import { TextInput } from '../../custom_/Text';
import * as Yup from 'yup';
import UserApi from '../../api/UserApi';
import { withRouter } from 'react-router-dom';
import Storage from '../../storage/Storage';
const UpdateUser = (props) => {
  const userResult = async () => {
    return await UserApi.getProfile();
  };

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

  return (
    <>
      <div className="text-center mt-4">
        <h1 className="h2">Update Your Account</h1>
        <p className="lead">Start update account.</p>
      </div>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          address: '',
          phone: '',
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),

          lastName: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),

          address: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
          phone: Yup.number().required('Required'),
        })}
        onSubmit={async (values) => {
          try {
            console.log(values);

            // call api
            await UserApi.getByUsername();
            await UserApi.updateUser(id, values.address, values.phone, values.firstName, values.lastName);
          } catch (error) {
            console.log(error);
            // redirect page error server
            props.history.push('/500');
          }
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Card>
            <CardBody>
              <div className="m-sm-4">
                <Form>
                  <FormGroup>
                    <FastField
                      label="FirstName"
                      type="text"
                      bsSize="lg"
                      name="firstName"
                      placeholder="Enter your first name"
                      component={TextInput}
                    />
                    <ErrorMessage name="firstName" />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="LastName"
                      type="text"
                      bsSize="lg"
                      name="lastName"
                      placeholder="Enter your last name"
                      component={TextInput}
                    />
                    <ErrorMessage name="lastName" />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Address"
                      type="text"
                      bsSize="lg"
                      name="address"
                      placeholder="Enter your address"
                      component={TextInput}
                    />
                    <ErrorMessage name="address" />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Phone"
                      type="number"
                      bsSize="lg"
                      name="phone"
                      placeholder="Enter your phone"
                      component={TextInput}
                    />
                    <ErrorMessage name="phone" />
                  </FormGroup>

                  <div className="text-center mt-3">
                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      // disabled={isSubmitting}
                    >
                      Update
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        )}
      </Formik>
    </>
  );
};

export default UpdateUser;
