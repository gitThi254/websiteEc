const SearchNotFound = () => {
  return (
    <div role="status" className="flex flex-col items-center justify-center">
      <img
        alt=""
        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/search/a60759ad1dabe909c46a817ecbf71878.png"
        className=""
      />
      <div className="text-xl">Không tìm thấy kết quả nào</div>
      <div className="text-xl">Hãy thử sử dụng các từ khóa chung chung hơn</div>
    </div>
  );
};

export default SearchNotFound;
