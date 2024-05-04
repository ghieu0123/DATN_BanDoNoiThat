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

const getAllShopOrderByUser = (page = 1, size = 5, sortField = 'id', sortType = 'desc', filter) => {
  const parameters = {
    page,
    size,
    sort: `${sortField},${sortType}`,
  };
  if (filter) {
    parameters.filter = filter;
  }

  return Api.get(`${url}/user`, { params: parameters });
};

const createShopOrderByCart = (cartId, orderStatus) => {
  const body = {
    orderStatus,
  };

  return Api.post(`${url}/${cartId}`, body);
};

const createShopOrderByProduct = (quanity, productId, orderStatus) => {
  const body = {
    orderStatus,
  };

  return Api.post(`${url}/product/${productId}?quantity=${quanity}`, body);
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
