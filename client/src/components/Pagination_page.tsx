import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

const Pagination_page = ({
  itemsPerPage,
  items,
}: {
  itemsPerPage: any;
  items: any;
}) => {
  const [search, setSearch] = useSearchParams();
  const status = search.get("status");

  const pageCount = Math.ceil(items / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    setSearch({ status: status ? status : "", page: event.selected + 1 });
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        containerClassName="relative z-0 inline-flex shadow-sm"
        nextClassName="pagination-link text-primary-600 hover:border hover:border-primary-600 hover:bg-primary-600 hover:text-white"
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
        pageClassName="pagination-link text-primary-600 hover:border hover:border-primary-600 hover:bg-primary-600 hover:text-white"
        previousClassName="pagination-link text-primary-600 hover:border hover:border-primary-600 hover:bg-primary-600 hover:text-white"
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
        activeClassName="active"
        breakClassName="pagination-link text-primary-600 hover:border hover:border-primary-600 hover:bg-primary-600 hover:text-white"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination_page;
