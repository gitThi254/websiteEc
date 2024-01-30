import * as Yup from "yup";
export const loginSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid Email ?"),
  password: Yup.string().required("Password is required"),
});

export const addToCartSchema = Yup.object({
  cart_id: Yup.string().required("not"),
  product_item_id: Yup.string().required("You haven't selected a product"),
  qty: Yup.number()
    .min(1, "select product > 1")
    .required("You have not entered the product quantity")
    .typeError("You have not entered the product quantity"),
});
