import ReactPaginate from 'react-paginate';

const Pagination_page = ({
  itemsPerPage,
  items,
  search,
  setSearch,
}: {
  itemsPerPage: any;
  items: any;
  search: any;
  setSearch: any;
}) => {
  const role = search.get('role');
  const page = search.get('page');
  const keyword = search.get('keyword');
  const query = {
    ...(role ? { role: role } : {}),
    ...(keyword ? { keyword: keyword } : {}),
    ...(page ? { page: page } : {}),
  };

  const pageCount = Math.ceil(items / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    setSearch({ ...query, page: event.selected + 1 });
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        containerClassName="isolate inline-flex -space-x-px rounded-md shadow-sm"
        nextClassName="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-primary hover:text-white focus:z-20 focus:outline-offset-0"
        nextLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        }
        pageCount={pageCount}
        pageClassName="relative inline-flex hover:bg-primary hover:text-white  items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        previousClassName="relative hover:bg-primary hover:text-white  inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        previousLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        }
        onPageChange={handlePageClick}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        activeClassName="bg-primary text-white "
        breakClassName=""
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination_page;
