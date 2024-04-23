import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import storage from '../../../storage/Storage';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Cart({ onClick }) {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return storage.getToken() !== null && storage.getToken() !== undefined;
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <h1>CART</h1>
        <div className={cx('list-product')}>
          <h2>Giuong 1m8 xin vcl</h2>
          <h2>Giuong 1m8 xin vcl</h2>
          <h2>Giuong 1m8 xin vcl</h2>
        </div>
        <div className={cx('action')}>
          <button className={cx('delete-btn')}>Xóa tất cả sản phẩm</button>
          <button
            className={cx('pay-btn')}
            onClick={() => {
              return !isAuthenticated() ? navigate('/sign-in') : alert('Pay!!!');
            }}
          >
            Thanh toán
          </button>
        </div>
      </div>
      <button onClick={onClick} className={cx('btn-close')}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>
    </div>
  );
}

export default Cart;
