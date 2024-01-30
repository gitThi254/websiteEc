import React from "react";

const Footer = () => {
  const InformShop = [
    { id: 1, title: "Công ty TNHH Dịch vụ và Thương mại An Thành." },
    {
      id: 2,
      title: "Số ĐKKD 0107861393, Sở KHĐT Tp. Hà Nội cấp ngày 04/10/2017",
    },
    {
      id: 3,
      title:
        "Địa chỉ: Lô 1+2, Ô quy hoạch E.2/NO7 đường Lâm Hạ phường Bồ Đề, quận Long Biên, Hà Nội",
    },
    { id: 4, title: "Chăm sóc khách hàng: 01234.567890" },
    { id: 5, title: "Mua hàng online: 01234.567890" },
    { id: 6, title: "Email: thinguyen01683@stripe-vn.com" },
  ];

  const columnTwo = [
    { id: 1, title: "Giới thiệu" },
    { id: 2, title: "Triết lý kinh doanh tại NEM" },
    { id: 3, title: "Fashion" },
    { id: 4, title: "NEM's Blog" },
    { id: 5, title: "Hệ thống showroom" },
    { id: 6, title: "Liên hệ" },
  ];

  const columnThree = [
    { id: 1, title: "Chính sách giao nhận - Vận chuyển" },
    { id: 2, title: "Hướng dẫn thanh toán" },
    { id: 3, title: "Tra cứu đơn hàng" },
    { id: 4, title: "Hướng dẫn chọn Size" },
    { id: 5, title: "Quy định đổi hàng" },
    { id: 6, title: "Quy định bảo hành và sửa chữa" },
    { id: 7, title: "Khách hàng thân thiết" },
  ];

  const columnFour = [
    { id: 1, title: "Hoả Tốc" },
    { id: 2, title: "Nhanh" },
    { id: 3, title: "Tiếp Kiệm" },
  ];
  return (
    <footer className="text-boxdark-2 body-font border-t-2">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-boxdark-2 p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">NEM FASHION</span>
          </a>
          {InformShop.map((item) => (
            <p className="mt-2 text-sm text-gray-500" key={item.id}>
              {item.title}
            </p>
          ))}
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              ABOUT US
            </h2>
            <nav className="list-none mb-10">
              {columnTwo.map((item) => (
                <li key={item.id} className="my-2">
                  <a className="text-gray-600 hover:text-gray-800">
                    {item.title}
                  </a>
                </li>
              ))}
            </nav>
          </div>
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              SHIPPING METHOD
            </h2>
            <nav className="list-none mb-10">
              {columnThree.map((item) => (
                <li key={item.id} className="my-2">
                  <a className="text-gray-600 hover:text-gray-800">
                    {item.title}
                  </a>
                </li>
              ))}
            </nav>
          </div>
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              PAYMENT METHOD
            </h2>
            <nav className="list-none mb-10">
              {columnFour.map((item) => (
                <li key={item.id} className="my-2">
                  <a className="text-gray-600 hover:text-gray-800">
                    {item.title}
                  </a>
                </li>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2023 Thi —
            <a
              href="https://twitter.com/knyttneve"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @thinguyen01683
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
