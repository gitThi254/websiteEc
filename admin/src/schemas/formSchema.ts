import * as Yup from 'yup';
export const loginSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Invalid Email ?'),
  password: Yup.string().required('Password is required'),
});

export const categorySchema = Yup.object({
  category_name: Yup.string().required('Category name is required'),

  parent_category_id: Yup.string(),
});

export const variationSchema = Yup.object({
  name: Yup.string().required('name is required'),
  category_id: Yup.string().required('category is required'),
});

export const variationOptionSchema = Yup.object({
  value: Yup.string().required('value is required'),
  variation_id: Yup.string().required('variation is required'),
});

export const productSchema = Yup.object({
  name: Yup.string().required('name is required'),
  description: Yup.string().required('description is required'),
  product_image: Yup.array().required('images is required'),
  category_id: Yup.string().required('category is required'),
});

export const productItemSchema = Yup.object({
  product_id: Yup.string().required('Product is required'),
  SKU: Yup.string(),
  qty_in_stock: Yup.number()
    .required('qty_in_stock is required')
    .min(1, 'qty_in_stock > 1'),
  product_image: Yup.array().required('images is required'),
  price: Yup.number().required('price is required').min(1, 'Price > 1'),
  variation_option_id: Yup.array().required('variation option required'),
});

export const PromotionSchema = Yup.object({
  name: Yup.string().required('name is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.array(),
  discount_rate: Yup.number()
    .required('Discount rate is required')
    .min(0, 'discount rating > 0')
    .max(100, 'discount rating < 100')
    .typeError('Discount rate is required'),
  start_date: Yup.date()
    .required('Start Date is required')
    .typeError('Invalid Date'),
  end_date: Yup.date()
    .required('end date is required')
    .typeError('End Date id required'),
});

export const blogSchema = Yup.object({
  title: Yup.string().required('title is required'),
  description: Yup.string().required('description is required'),
  images: Yup.array().required('images is required'),
  category_id: Yup.string().required('category is required'),
});
