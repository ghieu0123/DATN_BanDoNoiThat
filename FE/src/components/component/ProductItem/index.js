import styles from './ProductItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function ProductItem() {
  return (
    <div className={cx('wrapper')}>
      <p className={cx('icon')}>
        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}></FontAwesomeIcon>
      </p>
      <span className={cx('productname')}>Giường ngủ 1,6m sieu dai </span>
    </div>
  );
}

export default ProductItem;
