import { useEffect, useState } from 'react';
import ProductApi from '../../api/ProductApi';
import TypeApi from '../../api/TypeApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectProducts, selectPage, selectTotalSize, selectCategory } from '../../redux/selectors/ProductSelector';
import { selectType } from '../../redux/selectors/TypeSelector';
import { getListProductAction } from '../../redux/actions/ProductAction';
import { getTypeAction } from '../../redux/actions/TypeAction';
import image3 from '../../assets/img/photos/image3.jpg';
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
import Storage from '../../storage/Storage';

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
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [selectValue, setSelectValue] = useState('');
  const [selectSortValue, setSelectSortValue] = useState('id');
  const [selectSortTypeValue, setSelectTypeValue] = useState('asc');
  let location = useLocation();
  const navigate = useNavigate();

  const url = location.search;
  const parts = url.split('=');
  const searchData = decodeURIComponent(parts[1]) === 'undefined' ? '' : decodeURIComponent(parts[1]);

  const productData = props.products;

  const getListProduct = props.getListProductAction;

  const getType = props.getTypeAction;

  const typeData = props.types;

  const cartData = props.cartItems;

  // const categoryData = props.category;

  const isAuthenticated = () => {
    console.log(Storage.getToken());
    return Storage.getToken() !== null && Storage.getToken() !== undefined;
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

  const getAllProduct = async (page, type, sortField, sortType) => {
    try {
      const result = await ProductApi.getAllProduct(page, undefined, sortField, sortType, searchData, undefined, type);
      const products = result.content;
      setTotalPage(result.totalPages);
      total = result.totalPages;
      getListProduct(products);
      if (page > total) {
        setPage(1);
      }
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

  useEffect(() => {
    getAllProduct(page, selectValue, selectSortValue, selectSortTypeValue);
    getAllType();
    window.scrollTo(0, 0);
  }, [page, searchData]);

  return (
    <>
      <Container fluid className="p-0">
        <ToastContainer />
        <Row>
          <Col>
            {/* HEADER */}
            <CardHeader>
              <CardTitle tag="h5" className="mb-0">
                <div className="product-home-title" style={{ height: '450px' }}>
                  <img src={image3} alt="img" />
                  <p style={{ marginTop: '20px', marginLeft: '20px' }}>Searching for "{searchData}"</p>
                </div>
              </CardTitle>
              <div className="product-home-filter">
                <div className="product-home-type">
                  <select id="product-sort-select">
                    <option key="0" value="Mức độ phổ biến">
                      Mức độ phổ biến
                    </option>
                    <option key="1" value="Mức giá ↑">
                      Mức giá ↑
                    </option>
                    <option key="2" value="Mức giá ↓">
                      Mức giá ↓
                    </option>
                  </select>
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
                      const selectElement2 = document.getElementById('product-sort-select');
                      const selectedValue2 = selectElement2.value;
                      let sortField;
                      let sortType;
                      switch (selectedValue2) {
                        case 'Mức độ phổ biến':
                          sortField = 'id';
                          sortType = 'desc';
                          break;
                        case 'Mức giá ↑':
                          sortField = 'price';
                          sortType = 'asc';
                          break;
                        case 'Mức giá ↓':
                          sortField = 'price';
                          sortType = 'desc';
                          break;
                        default:
                          sortField = 'id';
                          sortType = 'asc';
                      }

                      setSelectSortValue(sortField);
                      setSelectTypeValue(sortType);
                      setSelectValue(selectedValue);
                      getAllProduct(1, selectedValue, sortField, sortType);
                      getAllProduct(1, selectedValue, sortField, sortType);
                      if (selectedValue != '') setPage(1);
                      if (selectedValue === '') setPage(1);
                      if (selectSortValue != 'id') setPage(1);
                      if (selectSortValue === 'id') setPage(1);
                      // console.log(selectedValue);
                    }}
                  >
                    Lọc
                  </button>
                </div>
              </div>
            </CardHeader>

            {/* BODY */}
            <CardBody>
              {productData === null || productData.length === 0 ? (
                <div style={{ textAlign: 'center' }}>
                  <p>Không có sản phẩm nào</p>
                </div>
              ) : (
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
                          onClick={() =>
                            !isAuthenticated() ? navigate('/sign-in') : handleAddProductToCart(product.id)
                          }
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
              )}

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
