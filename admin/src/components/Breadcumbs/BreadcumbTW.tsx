import { Link, useLocation } from 'react-router-dom';

const BreadcumbTW = () => {
  let currentLink = '';
  const location = useLocation();
  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb: any, index: any, arr) => {
      currentLink += `/${crumb}`;
      if (index === arr.length - 1)
        return (
          <li aria-current="page" key={index}>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-xl font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                {crumb}
              </span>
            </div>
          </li>
        );

      return (
        <li key={index}>
          <div className="flex items-center">
            <svg
              className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <Link
              to={currentLink}
              className="ms-1 text-xl font-medium text-boxdark hover:text-meta-5 md:ms-2 dark:text-meta-5 dark:hover:text-white"
            >
              {crumb}
            </Link>
          </div>
        </li>
      );
    });
  return (
    <>
      <nav
        className="flex w-full p-8 border-b-body border-b-2"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-xl font-medium text-graydark hover:text-meta-5 dark:text-meta-5 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </Link>
          </li>
          {crumbs}
        </ol>
      </nav>
    </>
  );
};

export default BreadcumbTW;
