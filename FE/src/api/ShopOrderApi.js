import Api from './Api';

const url = '/shoporders';

const getAllShopOrders = (page = 1, size = 10, sortField = 'id', sortType = 'desc') => {
  const parameters = {
    page,
    size,
    sort: `${sortField},${sortType}`,
  };
  return Api.get(`${url}`, { params: parameters });
};

const getAllShopOrderByUser = (page = 1, size = 10, sortField = 'id', sortType = 'asc') => {
  const parameters = {
    page,
    size,
    sort: `${sortField},${sortType}`,
  };
  return Api.get(`${url}/user`, { params: parameters });
};

const createShopOrderByCart = (cartId, orderStatus) => {
  const body = {
    orderStatus,
  };

  return Api.post(`${url}/${cartId}`, body);
};

const createShopOrderByProduct = (productId, orderStatus) => {
  const body = {
    orderStatus,
  };

  return Api.post(`${url}/product/${productId}`, body);
};

const deleteByShopOrderId = (ShopOrderId) => {
  return Api.delete(`${url}/${ShopOrderId}`);
};

const api = {
  getAllShopOrders,
  getAllShopOrderByUser,
  createShopOrderByCart,
  createShopOrderByProduct,
  deleteByShopOrderId,
};
export default api;
