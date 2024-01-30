type SignIn = {
  email: string;
  password: string;
};

type CategoryForm = {
  category_name: string;

  parent_category_id?: string;
};

type VariationForm = {
  name: string;
  category_id: string;
};

type VariationOptionForm = {
  value: string;
  variation_id: string;
};

type ProductForm = {
  category_id: string;
  name: string;
  description: string;
  product_image: any;
};

type Image = {
  url: string;
  asset_id: string;
  public_id: string;
};

type ProductItemForm = {
  product_id: string;
  SKU?: string;
  qty_in_stock: number;
  product_image: any;
  price: number;
  variation_option_id: Array;
};

type PromotionForm = {
  name: string;
  description: string;
  discount_rate: number;
  start_date: Date;
  end_date: Date;
  category?: Array;
};

type BlogForm = {
  category_id: string;
  title: string;
  description: string;
  images: any;
};

type UpdateOrder = {
  status: string;
};
