const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://product.hstatic.net/200000182297/product/ak065321612323140218p1399dt_q065421722323040274p899dt__10__b787195444df4563bbb0180177ca0fe5_1024x1024.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://product.hstatic.net/200000182297/product/11_c964d9e129224241a3f3cf74981f302d_1024x1024.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://product.hstatic.net/200000182297/product/4_312512d58e8440ae8ac0ecaa2dbb8aaf_1024x1024.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 4,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://product.hstatic.net/200000182297/product/6_d29f9167ef7f48828d32062a678a2b0e_1024x1024.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 5,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://product.hstatic.net/200000182297/product/4_f557e3d57fa44a36a58229d9b59cc89d_1024x1024.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 6,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://product.hstatic.net/200000182297/product/sm166221232383040401p899dt_z043121512332130274p599dt_6__8ede1d6d77fd48c19db58c66735628ce_1024x1024.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    promotion: "$40",
    color: "Black",
  },
  {
    id: 7,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://product.hstatic.net/200000182297/product/3_9f907c8afd6b409aac5a8cfcba158728_1024x1024.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 8,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://product.hstatic.net/200000182297/product/4_aa943f5b008c42ab8546deaa43c611fc_1024x1024.jpg    ",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

export default function Product() {
  return (
    <div className="bg-white container mx-auto">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col text-center w-full mb-4">
          <h2 className="text-2xl text-gray-700 text-opacity-80 tracking-widest font-bold title-font mb-1">
            SẢN PHẨM BÁN CHẠY
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-80 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                  <p className="text-sm font-meium text-red-500 line-through">
                    {product?.promotion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
