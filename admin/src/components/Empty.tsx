import { Link } from 'react-router-dom';

const Empty = ({ title }: { title: string }) => {
  return (
    <>
      <div className="container min-h-[400px] flex justify-center items-center">
        <div className="flex flex-col gap-5 items-center">
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
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>

          <div className="R1_DmZ">{title}</div>
        </div>
      </div>
    </>
  );
};

export default Empty;
