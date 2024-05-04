import { useEffect, useState } from 'react';
import Page404 from '../auth/Page404';
import UserApi from '../../api/UserApi';
import ProductApi from '../../api/ProductApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Storage from '../../storage/Storage';
import { TextInfor } from '../../custom_/Text';
import { Card, Modal, ModalBody, ModalFooter, ModalHeader, Button, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const handleShowSuccessNotification = (message) => {
  toast.success(message, {
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
function Home() {
  const [productList, setProductList] = useState([]);
  const [productID, setProductID] = useState(-1);

  useEffect(() => {});
  return (
    <div style={{ padding: '30px 20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '75px' }}>HOME PAGE</h1>
      <ul style={{ fontSize: '40px' }}>
        <li>
          <Link to="/"> Home</Link>
        </li>
        <li>
          <Link to="/Products/1">View product detail</Link>
        </li>
        <li>
          <Link to="/Sign-in">Sign In</Link>
        </li>
        <li>
          <Link to="/products">Product Home</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
