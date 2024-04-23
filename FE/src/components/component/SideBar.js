import styles from './scss/SideBar.module.scss';
import classNames from 'classnames/bind';
import images from '../../assets/logo/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { Wrapper as PopperWrapper } from './popper/index';
import ProductItem from './ProductItem';
import Button from './button/Button';
import Cart from './cart/Cart';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SideBar() {
  const [searchResult, setSearchResults] = useState([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSearchResults([1, 2, 3]);
    }, 0);
  }, []);

  return (
    <div className={cx('side-bar')}>
      <div className={cx('content')}>
        <Link to={'/'} className={cx('logo')}>
          <img src={images.logo} alt="Nha Dep"></img>
        </Link>
        <div className={cx('action')}>
          {/* PRODUCT BY ROOM */}
          <Button>
            <span>Living Room</span>
          </Button>
          <Button to={'/'}>
            <span>Dining Room</span>
          </Button>
          <Button>
            <span>Bed Room</span>
          </Button>
        </div>
        <Tippy
          interactive
          // visible={searchResult.length > 0}
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>Products</h4>
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx('search')}>
            <input placeholder="Tìm sản phẩm" spellCheck={false} />
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}
            <button className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Tippy>
        {/* CART */}
        <Button onClick={() => setOpen(!isOpen)}>
          <FontAwesomeIcon icon={faCartShopping} />
          <span>Cart</span>
        </Button>
      </div>
      {isOpen === false ? <Fragment /> : <Cart onClick={() => setOpen(!isOpen)} />}
    </div>
  );
}

export default SideBar;
