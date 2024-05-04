import Api from './Api';
const url = '/types';
const getAllType = (page = 1, size = 20, sortField = 'id', sortType = 'desc') => {
  const parameters = {
    page,
    size,
    sort: `${sortField},${sortType}`,
  };

  return Api.get(`${url}`, { params: parameters });
};

// export
const api = {
  getAllType,
};
export default api;
