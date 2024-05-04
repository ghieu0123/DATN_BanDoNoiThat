import Api from './Api';
const url = '/categories';
const getAllCategory = (page = 1, size = 20, sortField = 'id', sortType = 'desc') => {
  const parameters = {
    page,
    size,
    sort: `${sortField},${sortType}`,
  };

  return Api.get(`${url}`, { params: parameters });
};

// export
const api = {
  getAllCategory,
};
export default api;
