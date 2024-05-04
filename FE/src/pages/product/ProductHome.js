import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import ProductApi from '../../api/ProductApi';
import TypeApi from '../../api/TypeApi';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectProducts, selectPage, selectTotalSize, selectCategory } from '../../redux/selectors/ProductSelector';
import { selectType } from '../../redux/selectors/TypeSelector';
import { getListProductAction } from '../../redux/actions/ProductAction';
import { getTypeAction } from '../../redux/actions/TypeAction';
import {
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  // Button,
  // Card,
  // ListGroup,
  // ListGroupItem,
  // Modal,
  // ModalBody,
  // ModalFooter,
  // ModalHeader,
  Row,
} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import FormatPrice from '../../components/checkprice/FormatPrice';
import ShoppingCartApi from '../../api/ShoppingCartApi';
import { selectCartItems } from '../../redux/selectors/CartSelector';

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
let total = 1;

function ProductHome(props) {
  // const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [selectValue, setSelectValue] = useState('');
  const navigate = useNavigate();
  const productData = props.products;

  const getListProduct = props.getListProductAction;

  const getType = props.getTypeAction;

  const typeData = props.types;

  const categoryData = props.category;

  const cartData = props.cartItems;

  const getAllProduct = async (page, type) => {
    try {
      const result = await ProductApi.getAllProduct(page, undefined, undefined, undefined, undefined, undefined, type);
      const products = result.content;
      // setTotalPage(result.totalPages);
      total = result.totalPages;
      getListProduct(products);
      console.log(products);
    } catch (error) {
      throw error;
    }
  };

  const getAllType = async () => {
    try {
      const result = await TypeApi.getAllType();
      getType(result.content);
    } catch (error) {
      throw error;
    }
  };

  const handleAddProductToCart = async (productId) => {
    try {
      if (cartData === null) {
        ShoppingCartApi.createCart(productId);
      } else {
        const result = await ShoppingCartApi.getShoppingCartByDate();
        ShoppingCartApi.addProductToCart(result.id, productId);
      }
      handleShowSuccessNotification('Đã thêm vào giỏ hàng!');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct(page, selectValue);
    getAllType();
    console.log(typeData);
  }, [page]);

  return (
    <>
      <Container fluid className="p-0">
        <ToastContainer />
        <Row>
          <Col>
            {/* HEADER */}
            <CardHeader>
              <CardTitle tag="h5" className="mb-0">
                <p className="product-home-title" style={{ textAlign: 'center', fontSize: '75px' }}>
                  ALL PRODUCT
                </p>
              </CardTitle>
              <div className="product-home-filter">
                <div className="product-home-type">
                  <select id="product-type-select">
                    <option key="0" value="">
                      All
                    </option>
                    {typeData.map((item) => (
                      <option key={item.id} value={item.typeName}>
                        {item.typeName}
                      </option>
                    ))}
                  </select>
                  <button
                    className="product-home-filter-btn black-btn"
                    onClick={() => {
                      const selectElement = document.getElementById('product-type-select');
                      const selectedValue = selectElement.value;
                      setSelectValue(selectedValue);
                      getAllProduct(1, selectedValue);
                      getAllProduct(1, selectedValue);
                      if (selectedValue != '') setPage(1);
                      if (selectedValue === '') setPage(1);
                      console.log(selectedValue);
                    }}
                  >
                    Lọc
                  </button>
                </div>
              </div>
            </CardHeader>

            {/* BODY */}
            <CardBody>
              <div className="product-home-wrapper">
                {productData.map((product) => (
                  <div key={product.id} className="product-home-item">
                    <Link to={`/products/productinfo/${product.id}`}>
                      <img id="product-collection-image" src={product.image} alt={product.name} />
                    </Link>
                    <Link className="product-images" to={`/products/productinfo/${product.id}`}>
                      {product.name}
                    </Link>
                    <p>{FormatPrice(product.price)}</p>
                    <div className="product-home-moreinfo">
                      <button
                        // style={{ display: 'flex' }}
                        className="white-btn"
                        onClick={() => handleAddProductToCart(product.id)}
                      >
                        {'+'}
                        <FontAwesomeIcon icon={faCartShopping} />
                        {'Cart'}
                      </button>
                      <button
                        className="black-btn product-home-moreinfo-btn"
                        onClick={() => {
                          navigate(`/products/productinfo/${product.id}`);
                        }}
                      >
                        Xem thêm
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* PAGE CHUYỂN TRANG */}
              <div className="product-home-pages">
                <button
                  onClick={() => setPage(page == 1 ? page : page - 1)}
                  className="white-btn product-home-page-btn"
                >
                  {'<'}
                </button>
                {Array.from({ length: 7 }).map((_, index) => {
                  const pageNumber = index - 3 + page;
                  if (pageNumber > 0 && pageNumber <= total) {
                    return pageNumber === page ? (
                      <button className="black-btn product-home-page-btn" key={index}>
                        {pageNumber}
                      </button>
                    ) : (
                      <button
                        onClick={() => setPage(pageNumber)}
                        className="white-btn product-home-page-btn"
                        key={index}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                  return null;
                })}
                <button
                  onClick={() => setPage(page == total ? page : page + 1)}
                  className="white-btn product-home-page-btn"
                >
                  {'>'}
                </button>
              </div>
              <div className="product-home-input-div">
                <input className="product-home-input-page" type="number" />
                <button
                  onClick={() => {
                    console.log(categoryData);
                    const selectPageElement = document.getElementsByClassName('product-home-input-page')[0];
                    const selectedPageValue = selectPageElement.value ? parseInt(selectPageElement.value, 10) : null;

                    if (selectedPageValue !== null) {
                      if (selectedPageValue < 1) {
                        setPage(1);
                      } else if (selectedPageValue > total) {
                        setPage(total);
                      } else {
                        setPage(selectedPageValue);
                      }
                    }
                  }}
                  className="white-btn product-home-input-page-btn"
                >
                  Chuyển
                </button>
              </div>
            </CardBody>
          </Col>
        </Row>
      </Container>
    </>
  );
}
const mapGlobalStateToProps = (state) => {
  return {
    products: selectProducts(state),
    types: selectType(state),
    category: selectCategory(state),
    cartItems: selectCartItems(state),
    // page: selectPage(state),
    // totalSize: selectTotalSize(state),
    // category: selectCategory(state),
    // type: selectType(state),
    // size: selectSize(state),
    // selectedRows: selectSelectedRows(state),
  };
};

export default connect(mapGlobalStateToProps, { getListProductAction, getTypeAction })(ProductHome);
