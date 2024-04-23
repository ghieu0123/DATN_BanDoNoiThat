import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  UncontrolledDropdown
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik, Form as FormikForm , Field} from 'formik';
import { ReactstrapInput } from "reactstrap-formik";
import avatar1 from "../../assets/img/avatars/avatar.jpg";
import UserApi from '../../api/UserApi';
import Storage from "../../storage/Storage";
import { useHistory } from 'react-router-dom';
import { MoreHorizontal } from "react-feather";
const Navigation = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Profile Settings
      </CardTitle>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem tag="a" href="#" action active>
        Account
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" action>
        Password
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" action>
        Privacy and safety
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" action>
        Email notifications
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" action>
        Web notifications
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" action>
        Widgets
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" action>
        Your data
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" action>
        Delete account{" "}
      </ListGroupItem>
    </ListGroup>
  </Card>
);

const PublicInfo = () => {

  const userStorageInfo = Storage.getUserInfo();

  const [userInfo, setUserInfo] = useState({firstName: userStorageInfo.firstName, lastName: userStorageInfo.lastName});

  const [isDisabledSaveButton, setDisabledSaveButton] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      try {

        const result = await UserApi.getProfile();
        console.log(result);
        setUserInfo(result);

      } catch (error) {
        console.log(error);
        // TODO notification
      }
    }

    getUserProfile();
  }, []);

  const avatarInputFileRef = useRef(null);

  const showSucessNotification = (title, message) => {
    toast.error(message, {
      toastId: title, // Đặt một toastId cụ thể
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleImageSave = async () => {
    try {
      setDisabledSaveButton(true);
      // upload avatar
      setDisabledSaveButton(false);
      showSucessNotification(
        "Change Profile",
        "Change Profile Successfully!"
      );
    } catch (error) {
      setDisabledSaveButton(false);
      console.log(error);
    }
  }

  const updateStorage = (async () => {
    try {
      const result = await UserApi.getProfile();
        const user = {
          "username": result.userName,
          "email": result.email,
          "firstName": result.firstName,
          "lastName": result.lastName,
          "address": result.address,
          "phone": result.phone,
          "role": result.role,
          "status": result.status
        }
      Storage.setUserInfo(user);
    } catch(error) {
      console.log(error);
    }
  })

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="card-actions float-right">
            <UncontrolledDropdown>
              <DropdownToggle tag="a">
                <MoreHorizontal />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <CardTitle tag="h5" className="mb-0">
            Public info
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md="8">
                <FormGroup>
                  <Label for="inputUsername">Username</Label>
                  <Input type="text" id="inputUsername" placeholder="Username" />
                </FormGroup>
                <FormGroup>
                  <Label for="inputBio">Biography</Label>
                  <Input
                    type="textarea"
                    rows="2"
                    id="inputBio"
                    placeholder="Tell something about yourself"
                  />
                </FormGroup>
              </Col>
              
            </Row>
          </Form>
        </CardBody>
      </Card>


      <Card>
        <CardHeader>
          <div className="card-actions float-right">
            <UncontrolledDropdown>
              <DropdownToggle tag="a">
                <MoreHorizontal />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <CardTitle tag="h5" className="mb-0">
            Private info
          </CardTitle>
        </CardHeader>

        <Formik
          initialValues={
            {
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              address: userInfo.address,
              phone: userInfo.phone
            }
          }
          validationSchema={
            Yup.object({
              firstName: Yup.string()
                .required('Required')
                .max(50, 'Must be between 2 to 50 characters')
                .min(2, 'Must be between 2 to 50 characters'),

              lastName: Yup.string()
                .required('Required')
                .max(50, 'Must be between 2 to 50 characters')
                .min(2, 'Must be between 2 to 50 characters'),
              address: Yup.string()
                .max(50, 'Must be less than 50 characters')
                .required('Required'),
              phone: Yup.number()
                .required('Required'),
            })
          }
          onSubmit={
            async (values) => {
              try {
                // call api
                const user = await UserApi.getByUsername(userInfo.username);
                await UserApi.updateUser(user.id, values.firstName, values.lastName, values.address, values.phone);
                // update Storage
                updateStorage();
                
                showSucessNotification(
                  "Update User",
                  "Update User Successfully!");
              } catch (error) {
                console.log(error);
              }
            }
          }
        >
          
          <CardBody>
            <FormikForm>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="firstName">First name</Label>
                    <Field
                      bsSize="lg"
                      type="text"
                      name="firstName"
                      placeholder="Enter First Name"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="lastName">Last name</Label>
                    <Field
                      bsSize="lg"
                      type="text"
                      name="lastName"
                      placeholder="Enter Last Name"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="1234 Main St"
                />
              </FormGroup>
              <FormGroup>
                <Label for="address2">Address 2</Label>
                <Input
                  type="text"
                  name="phone"
                  id="address2"
                  placeholder="Apartment, studio, or floor"
                />
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input type="text" name="city" id="city" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input type="select" name="state" id="state">
                      <option>Choose...</option>
                      <option>...</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="zipcode">Zip</Label>
                    <Input type="text" name="zip" id="zipcode" />
                  </FormGroup>
                </Col>
              </Row>
              <Button type="submit" color="primary" disabled={isDisabledSaveButton}>
                Save changes
              </Button>
            </FormikForm>
          </CardBody>
        </Formik>
      </Card>
    </div>
  )
};

const PrivateInfo = () => {
  // const history = useHistory();

  const handleRefreshPage = () => {
    // history.go(0); // Làm mới trang
  };

  return (
    <button onClick={handleRefreshPage}>Làm mới trang</button>
  );
};

const Settings = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Settings</h1>

    <Row>
      <Col md="3" xl="2">
        <Navigation />
      </Col>
      <Col md="9" xl="10">
        <PublicInfo />
        <PrivateInfo />
      </Col>
    </Row>
  </Container>
);

export default Settings;