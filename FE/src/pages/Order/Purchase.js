import { getPurchaseAction } from '../../redux/actions/PurchaseAction';
import { connect } from 'react-redux';
import { selectIsPurchase, selectPurchaseItem, selectIsProduct } from '../../redux/selectors/PurchaseSelector';
import FormatPrice from '../../components/checkprice/FormatPrice';
import { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartApi from '../../api/ShoppingCartApi';
import UserApi from '../../api/UserApi';
import ShopOrderApi from '../../api/ShopOrderApi';
import NotifiBox2 from '../../components/component/box/NotifiBox2';

function Purchase(props) {
  const isPurchase = props.isPurchase;
  const purchaseItem = props.purchaseItem;
  const getPurchase = props.getPurchaseAction;
  const isProduct = props.isProduct;
  const array = new Array(50).fill(0);
  const [quantity, setQuanity] = useState(array);
  const [itemCart, setItemCart] = useState(purchaseItem);
  const [userInfo, setUserInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('PAY');
  const [isShowBox, setShowBox] = useState(false);

  const navigate = useNavigate();

  const handleDecreasePrice = async (itemId, index, total) => {
    try {
      await ShoppingCartApi.decreaseItemInCart(isProduct, itemId);
      const newQuantity = [...quantity]; // Tạo bản sao mới của mảng quantity
      if (total !== 1) newQuantity[index] = newQuantity[index] - 1;
      setQuanity(newQuantity); // Cập nhật trạng thái mới cho redux
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncreasePrice = async (itemId, index) => {
    try {
      await ShoppingCartApi.increaseItemInCart(isProduct, itemId);
      const newQuantity = [...quantity]; // Tạo bản sao mới của mảng quantity
      newQuantity[index] = newQuantity[index] + 1;
      setQuanity(newQuantity); // Cập nhật trạng thái mới cho redux
    } catch (error) {
      console.log(error);
    }
  };

  const adddressPurchase = async () => {
    try {
      const result = await UserApi.getProfile();
      setUserInfo(result);
      // console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = purchaseItem.reduce((total, item, index) => {
    return total + item.product.price * (item.quantity + quantity[index]);
  }, 0);

  const handleOrder = async () => {
    try {
      if (isProduct === 0) {
        await ShopOrderApi.createShopOrderByProduct(
          quantity[0] + purchaseItem[0].quantity,
          purchaseItem[0].product.id,
          paymentMethod,
        );
      } else {
        await ShopOrderApi.createShopOrderByCart(isProduct, paymentMethod);
      }
      setShowBox(true);
    } catch (error) {
      alert('purchase fail');
    }
  };

  useEffect(() => {
    adddressPurchase();
    console.log(purchaseItem.length);
  }, []);
  return (
    <>
      <div className="purchase-wrapper">
        <button onClick={() => navigate('/products')} className="white-btn purchase-back-btn">
          {'<'}
        </button>
        <div className="purchase-header">
          <h1>CHECKOUT</h1>
        </div>
        <p className="purchase-title">{purchaseItem.length === 0 ? '' : 'Sản Phẩm'}</p>
        <div className="purchase-body">
          <div className="purchase-content">
            {purchaseItem.length === 0 ? (
              <div className="purchase-error">
                <p>OPPS!! SOMING WAS WRONG!</p>
                <button className="white-btn">
                  <Link to={'/'}>Go back to HomePage</Link>
                </button>
              </div>
            ) : (
              purchaseItem.map((item, index) => (
                <div key={item.product.id} className="purchase-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="purchase-info">
                    <p className="purchase-info-name">{item.product.name}</p>
                    <p className="purchase-info-collection">Collection: {item.product.collection}</p>
                    <p className="purchase-info-size">Size: {item.product.size}</p>
                    <div className="purchase-info-price">
                      <button
                        onClick={() => {
                          if (isProduct === 0) {
                            const newQuantity = [...quantity];
                            newQuantity[index] =
                              quantity[index] + item.quantity === 1 ? newQuantity[index] : newQuantity[index] - 1;
                            setQuanity(newQuantity);
                          } else {
                            handleDecreasePrice(item.product.id, index, quantity[index] + item.quantity);
                            console.log('product id:' + item.product.id + ', Cart id: ' + isProduct);
                          }
                        }}
                        className="purchase-info-price-decrease"
                      >
                        {'-'}
                      </button>
                      <p>{quantity[index] + item.quantity}</p>
                      <button
                        onClick={() => {
                          if (isProduct === 0) {
                            const newQuantity = [...quantity];
                            newQuantity[index] = newQuantity[index] + 1;
                            setQuanity(newQuantity);
                          } else {
                            handleIncreasePrice(item.product.id, index);
                            console.log('product id:' + item.product.id + ', Cart id: ' + isProduct);
                          }
                        }}
                        className="purchase-info-price-increase"
                      >
                        {'+'}
                      </button>

                      <p className="purchase-info-price-show">
                        {FormatPrice(item.product.price * (item.quantity + quantity[index]))}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="purchase-checkout">
            <div className="purchase-checkout-title">
              <p>Thông tin đơn hàng</p>
            </div>
            <div className="purchase-checkout-content">
              <div className="purchase-checkout-total-price">
                <p className="purchase-checkout-text">Thành tiền</p>
                <p className="purchase-checkout-price">{FormatPrice(totalPrice)}</p>
              </div>
              <div className="purchase-checkout-total-price">
                <p className="purchase-checkout-text">Địa chỉ giao hàng</p>
                <p className="purchase-checkout-price">{userInfo.address}</p>
              </div>
              <div className="purchase-checkout-total-price">
                <p className="purchase-checkout-text">Số điện thoại</p>
                <p className="purchase-checkout-price">{userInfo.phone}</p>
              </div>

              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Phương thức thanh toán</p>
              <div className="purchase-checkout-select-div">
                <select
                  style={{ marginBottom: '15px' }}
                  className="purchase-checkout-select"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option key="1" value={'PAY'}>
                    {'THANH TOÁN NGAY'}
                  </option>
                  <option key="2" value={'NOT_PAY'}>
                    {'THANH TOÁN KHI NHẬN HÀNG'}
                  </option>
                </select>
              </div>
              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Thông tin giao hàng</p>
              <p style={{ fontSize: '16px' }}>
                Đối với những sản phẩm có sẵn tại khu vực, Shop sẽ giao hàng trong vòng 2-7 ngày. Đối với những sản phẩm
                không có sẵn, thời gian giao hàng sẽ được nhân viên thông báo đến quý khách.
              </p>
              <div className="purchase-checkout-button">
                <button
                  className="black-btn purchase-checkout-paybtn"
                  onClick={() => {
                    handleOrder();
                  }}
                >
                  ĐẶT HÀNG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShowBox === false ? (
        <Fragment />
      ) : (
        <NotifiBox2
          content="Đặt hàng thành công!
        Chuyển hướng về trang chủ sau 5s hoặc"
          btnname="Xem thông tin đơn hàng"
          action={() => {
            navigate('/products/order');
          }}
        />
      )}
    </>
  );
}

const mapGlobalStateToProps = (state) => {
  return {
    isPurchase: selectIsPurchase(state),
    purchaseItem: selectPurchaseItem(state),
    isProduct: selectIsProduct(state),
  };
};

export default connect(mapGlobalStateToProps, { getPurchaseAction })(Purchase);
