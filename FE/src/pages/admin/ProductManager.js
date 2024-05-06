import { useEffect, useState, Fragment } from 'react';
import ProductApi from '../../api/ProductApi';
import TypeApi from '../../api/TypeApi';
import CategoryApi from '../../api/CategoryApi';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectProducts } from '../../redux/selectors/ProductSelector';
import { selectType } from '../../redux/selectors/TypeSelector';
import { selectCategory } from '../../redux/selectors/CategorySelector';
import { getListProductAction } from '../../redux/actions/ProductAction';
import { getTypeAction } from '../../redux/actions/TypeAction';
import { getCategoryAction } from '../../redux/actions/CategoryAction';
import { Button, Card, CardBody, FormGroup, Container, CardHeader, CardTitle, ModalHeader, Label } from 'reactstrap';
import { FastField, Form, Formik, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { ReactstrapInput } from 'reactstrap-formik';
import 'react-toastify/dist/ReactToastify.css';
import FormatPrice from '../../components/checkprice/FormatPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';

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

function UserManager(props) {
  // const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [selectTypeValue, setSelectValue] = useState('');
  const [selectCategoryValue, setSelectCategory] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectSearchValue, setSearchValue] = useState('');
  const [isShow, setShow] = useState(false);
  const [indexCheck, setIdexCheck] = useState(undefined);

  const navigate = useNavigate();

  const productData = props.products;

  const getListProduct = props.getListProductAction;

  const getType = props.getTypeAction;

  const typeData = props.types;

  const categoryData = props.categories;

  const getCategory = props.getCategoryAction;

  const handleSelect = (id) => {
    setSelectedIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };
  const getAllProduct = async (page, search, category, type) => {
    try {
      const result = await ProductApi.getAllProduct(page, 5, undefined, undefined, search, category, type);
      const products = result.content;
      // setTotalPage(result.totalPages);
      total = result.totalPages;
      getListProduct(products);
      // console.log(products);
    } catch (error) {
      throw error;
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const getAllType = async () => {
    try {
      const result = await TypeApi.getAllType();
      getType(result.content);
    } catch (error) {
      throw error;
    }
  };
  const getAllCategory = async () => {
    try {
      const result = await CategoryApi.getAllCategory();
      getCategory(result.content);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteProduct = async (ids) => {
    try {
      const result = await ProductApi.deleteProduct(ids);
      getAllProduct(page, selectSearchValue, selectCategoryValue, selectTypeValue);
      handleShowSuccessNotification('Xóa sản phẩm thành công');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct(page, selectSearchValue, selectCategoryValue, selectTypeValue);
    getAllType();
    getAllCategory();
    console.log(categoryData);
  }, [page]);

  return (
    <>
      <Container fluid className="p-0">
        <ToastContainer />
        {/* HEADER */}
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">
            <p className="product-home-title" style={{ textAlign: 'center', fontSize: '75px' }}>
              PRODUCT MANAGER
            </p>
          </CardTitle>
          <div className="product-home-filter">
            <div className="product-home-type">
              <input
                className="product-home-search-inp"
                type="text"
                placeholder="Search"
                value={selectSearchValue}
                onChange={handleChange}
              />
              <select id="product-category-select">
                <option key="0" value="">
                  Category
                </option>
                {categoryData.map((item) => (
                  <option key={item.id} value={item.categoryName}>
                    {item.categoryName}
                  </option>
                ))}
              </select>
              <select id="product-type-select">
                <option key="0" value="">
                  Type
                </option>
                {typeData.map((item) => (
                  <option key={item.id} value={item.typeName}>
                    {item.typeName}
                  </option>
                ))}
              </select>
              <button
                className="manager-filter-btn"
                onClick={() => {
                  const selectElement = document.getElementById('product-type-select');
                  const selectedValue = selectElement.value;
                  setSelectValue(selectedValue);
                  const selectElement2 = document.getElementById('product-category-select');
                  const selectedValue2 = selectElement2.value;
                  setSelectCategory(selectedValue2);
                  getAllProduct(1, selectSearchValue, selectedValue2, selectedValue);
                  getAllProduct(1, selectSearchValue, selectedValue2, selectedValue);
                  if (selectedValue != '') setPage(1);
                  if (selectedValue2 != '') setPage(1);
                  if (selectedValue === '') setPage(1);
                  if (selectedValue2 === '') setPage(1);
                  setSelectedIds([]);
                  console.log(selectedValue);
                  console.log(selectedValue2);
                }}
              >
                Lọc
              </button>
            </div>
          </div>
        </CardHeader>

        {/* BODY */}
        <CardBody>
          <div className="product-manager-wrapper">
            <button
              className="manager-filter-btn product-manager-delete-btn"
              onClick={() => {
                if (selectedIds.length > 0) handleDeleteProduct(selectedIds);
                console.log(selectedIds);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button onClick={() => setShow(true)} className="manager-filter-btn product-manager-add-btn">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <table className="product-table">
              <thead>
                <tr>
                  <th>✓</th>
                  <th>id</th>
                  <th>name</th>
                  <th>collection</th>
                  <th>size</th>
                  <th>type</th>
                  <th>description</th>
                  <th>material</th>
                  <th>price</th>
                  <th>image</th>
                  <th>category</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((product, index) => (
                  <tr key={product.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(product.id)}
                        onChange={() => handleSelect(product.id)}
                      />
                    </td>
                    <td>{product.id}</td>
                    <td>
                      <Link to={`/products/productinfo/${product.id}`}>{product.name}</Link>
                    </td>
                    <td>{product.collection}</td>
                    <td>{product.size}</td>
                    <td>{product.type && product.type.typeName ? product.type.typeName : 'null'}</td>
                    <td>{product.description.substring(0, 30)}...</td>
                    <td>{product.material}</td>
                    <td>{FormatPrice(product.price)}</td>
                    <td>
                      <img src={product.image} alt="image" />
                    </td>
                    <td>
                      {product.category && product.category.categoryName ? product.category.categoryName : 'null'}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          console.log(product.id);
                          setIdexCheck(index);
                          setShow(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGE CHUYỂN TRANG */}
          <div className="product-home-pages">
            <button onClick={() => setPage(page == 1 ? page : page - 1)} className="white-btn product-home-page-btn">
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
                  <button onClick={() => setPage(pageNumber)} className="white-btn product-home-page-btn" key={index}>
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
                // console.log(categoryData);
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
      </Container>
      {isShow === false ? (
        <Fragment />
      ) : (
        <div className="product-manager-box-main">
          <div className="product-manager-box">
            <div className="text-center mt-4 product-manager-title-box">
              <h1 className="h2">{indexCheck === undefined ? 'Create product' : 'Update product'}</h1>
              {/* <p className="lead">Start update account.</p> */}
            </div>

            <Formik
              initialValues={{
                name: indexCheck === undefined ? '' : productData[indexCheck].name,
                collection: indexCheck === undefined ? '' : productData[indexCheck].collection,
                size: indexCheck === undefined ? '' : productData[indexCheck].size,
                description: indexCheck === undefined ? '' : productData[indexCheck].description,
                material: indexCheck === undefined ? '' : productData[indexCheck].material,
                price: indexCheck === undefined ? '' : productData[indexCheck].price,
                image: indexCheck === undefined ? '' : productData[indexCheck].image,
                type:
                  indexCheck === undefined
                    ? ''
                    : productData[indexCheck].type && productData[indexCheck].type.typeName
                    ? productData[indexCheck].type.typeName
                    : '',
                category:
                  indexCheck === undefined
                    ? ''
                    : productData[indexCheck].category && productData[indexCheck].category.categoryName
                    ? productData[indexCheck].category.categoryName
                    : '',
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
                collection: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
                size: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
                description: Yup.string().required('Required'),
                material: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
                price: Yup.number().required('Required'),
                image: Yup.string().required('Required'),
                type: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
                category: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
              })}
              onSubmit={async (values) => {
                try {
                  handleShowSuccessNotification('Thành công');
                  // call api
                  const productInfo = {
                    name: values.name,
                    collection: values.collection,
                    size: values.size,
                    description: values.description,
                    material: values.material,
                    price: values.price,
                    image: values.image,
                    type: values.type,
                    category: values.category,
                  };
                  indexCheck === undefined
                    ? await ProductApi.createProduct(productInfo)
                    : await ProductApi.updateProduct(productData[indexCheck].id, productInfo);
                  getAllProduct(page, selectSearchValue, selectCategoryValue, selectTypeValue);
                  // setUserInfo(result);
                  setShow(false);
                  setIdexCheck(undefined);
                  // console.log(productInfo);
                } catch (error) {
                  console.log(error);
                }
              }}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ isSubmitting }) => (
                <Card>
                  <CardBody>
                    <div className="m-sm-4">
                      <Form>
                        <div className="product-manager-box-content">
                          <FormGroup>
                            <FastField
                              label="Product name"
                              type="text"
                              bsSize="lg"
                              name="name"
                              placeholder="Enter product name"
                              component={ReactstrapInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <FastField
                              label="Collection"
                              type="text"
                              bsSize="lg"
                              name="collection"
                              placeholder="Enter collection"
                              component={ReactstrapInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <FastField
                              label="Size"
                              type="text"
                              bsSize="lg"
                              name="size"
                              placeholder="Enter size"
                              component={ReactstrapInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <FastField
                              label="Description"
                              type="text"
                              bsSize="lg"
                              name="description"
                              placeholder="Enter your description"
                              component={ReactstrapInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <FastField
                              label="Material"
                              type="text"
                              bsSize="lg"
                              name="material"
                              placeholder="Enter your material"
                              component={ReactstrapInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <FastField
                              label="Price"
                              type="number"
                              bsSize="lg"
                              name="price"
                              placeholder="Enter your price"
                              component={ReactstrapInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <FastField
                              label="Image url"
                              type="text"
                              bsSize="lg"
                              name="image"
                              placeholder="Enter your image link"
                              component={ReactstrapInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label for="type">Type </Label>
                            <Field as="select" id="type" name="type">
                              <option value="">Type</option>
                              {typeData.map((item) => (
                                <option key={item.id} value={item.typeName}>
                                  {item.typeName}
                                </option>
                              ))}
                            </Field>
                          </FormGroup>

                          <FormGroup>
                            <Label for="category">Category </Label>
                            <Field as="select" id="category" name="category">
                              <option value="">Category</option>
                              {categoryData.map((item) => (
                                <option key={item.id} value={item.categoryName}>
                                  {item.categoryName}
                                </option>
                              ))}
                            </Field>
                          </FormGroup>
                        </div>
                        <div className="text-center product-manager-btn">
                          <button
                            className="black-btn user-update-close-btn"
                            onClick={() => {
                              setShow(false);
                              setIdexCheck(undefined);
                            }}
                          >
                            Close
                          </button>
                          <Button
                            className="white-btn"
                            type="submit"
                            color="primary"
                            size="lg"
                            // disabled={isSubmitting}
                          >
                            {indexCheck === undefined ? 'Create' : 'Update'}
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
const mapGlobalStateToProps = (state) => {
  return {
    products: selectProducts(state),
    types: selectType(state),
    categories: selectCategory(state),
    // category: selectCategory(state),
    // page: selectPage(state),
    // totalSize: selectTotalSize(state),
    // category: selectCategory(state),
    // type: selectType(state),
    // size: selectSize(state),
    // selectedRows: selectSelectedRows(state),
  };
};

export default connect(mapGlobalStateToProps, { getListProductAction, getTypeAction, getCategoryAction })(UserManager);
