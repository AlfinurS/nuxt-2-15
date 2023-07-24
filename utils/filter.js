

export function filterByPagination (data, params) {
  const firstIndex = params.page * params.page_size - params.page_size;
  let lastIndex = params.page * params.page_size;
  if (lastIndex > params.count) {
    lastIndex = params.count;
  }
  return data.slice(firstIndex, lastIndex);
}
