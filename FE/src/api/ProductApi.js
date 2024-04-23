import Api from './Api';

const url = '/products';

const getAllProduct = (page = 1, size = 10, sortField = 'id', sortType = 'desc', search = '', category, type) => {
  const parameters = {
    page,
    size,
    sort: `${sortField},${sortType}`,
  };

  // search
  if (search) {
    parameters.search = search;
  }

  // category
  if (category) {
    parameters.category = category;
  }

  // filter
  if (type !== null && type !== undefined) {
    parameters.type = type;
  }

  return Api.get(`${url}`, { params: parameters });
};

const getProductById = (id) => {
  return Api.get(`${url}/${id}`);
};

const createProduct = (values) => {
  const body = {
    name: values.name,
    collection: values.collection,
    size: values.size,
    material: values.material,
    description: values.description,
    price: values.price,
    image: values.image,
    type: values.type,
    category: values.category,
  };
  return Api.post(`${url}`, body);
};

const updateProduct = (id, values) => {
  const body = {
    name: values.name,
    collection: values.collection,
    size: values.size,
    material: values.material,
    description: values.description,
    price: values.price,
    image: values.image,
    type: values.type,
    category: values.category,
  };
  return Api.put(`${url}/admin/${id}`, body);
};

// export
const api = { getAllProduct, createProduct, updateProduct, getProductById };
export default api;
