import styles from './scss/Footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Footer() {
  return (
    <div className={cx('footer-content')}>
      <p>@2024</p>
      <p>Đồ án tốt nghiệp do sinh viên Nguyễn Quang Hiếu thực hiện</p>
    </div>
  );
}

export default Footer;
