import styles from './scss/Header.module.scss';
import classNames from 'classnames/bind';
import Button from './button/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import storage from '../../storage/Storage';
import { Fragment } from 'react';
import UserApi from '../../api/UserApi';

const cx = classNames.bind(styles);

function Header() {
  const [isAuth, setAuth] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthen = storage.getToken() !== null && storage.getToken() !== undefined;
      setAuth(isAuthen);

      if (isAuthen) {
        try {
          const userProfile = await UserApi.getProfile();

          if (userProfile.role === 'USER') {
            setIsUser(true);
          } else {
            setIsUser(false);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = () => {
    storage.removeToken();
    storage.removeUserInfo();
    setAuth(false);
    setIsUser(true);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('action')}>
          {!isUser && isAuth ? (
            <>
              <button
                className={cx('buttons', 'admin-btn')}
                onClick={() => {
                  alert('Go to ADMIN page!!!');
                }}
              >
                Go to Administration
              </button>
            </>
          ) : (
            <Fragment></Fragment>
          )}
          {!isAuth ? (
            <>
              <button className={cx('buttons')}>
                <Link className={cx('btn-a')} to={'/sign-in'}>
                  Sign in
                </Link>
              </button>
              <button className={cx('buttons')}>
                <Link className={cx('btn-a')} to={'/sign-up'}>
                  Sign up
                </Link>
              </button>
            </>
          ) : (
            <button className={cx('buttons', 'sign-out-btn')} onClick={handleLogout}>
              Sign out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
