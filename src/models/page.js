const Paging = {
  size: 0,
  total_page: 0,
  current_page: 0,
};

const Pageable = function (data, paging) {
  return {
    data: data,
    paging: paging,
  };
};
