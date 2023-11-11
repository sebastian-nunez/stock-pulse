import { z } from "zod";

export const productSchema = z.object({
  product_id: z.number().optional(),
  name: z
    .string()
    .min(5, "Product name must be at least 5 characters")
    .max(100, "Product name must be less than 100 characters"),
  is_available: z.boolean("Product availability is required!").default(true),
  brand: z
    .string("Product brand is required!")
    .min(2, "Product brand must be at least 2 characters")
    .max(100, "Product brand must be less than 100 characters"),
  price: z.coerce
    .number("Product price is required!")
    .min(0.01, "Product price must be at least $0.01"),
  quantity: z.coerce.number("Product quantity is required!"),
  weight: z.coerce.number("Product weight is required!"),
  dimensions: z
    .string("Product dimensions are required!")
    .max(50, "Product dimensions must be less than 50 characters")
    .refine(
      (value) => /^\d+\.?\d*\s*x\s*\d+\.?\d*\s*x\s*\d+\.?\d*$/.test(value),
      {
        message: "Dimensions format (in): Length x Width x Height",
      },
    ),
  description: z
    .string("Product description is required!")
    .min(15, "Product description must be at least 15 characters")
    .max(100, "Product description must be less than 100 characters"),
  image: z
    .string("Product image is required!")
    .url("Product image must be a valid URL")
    .min(10, "Product image must be at least 10 characters")
    .max(255, "Product image must be less than 255 characters"),
  notes: z
    .string("Product notes are required!")
    .min(5, "Product notes must be at least 5 characters")
    .max(255, "Product notes must be less than 255 characters")
    .default("No notes available."),
  warranty_info: z
    .string("Product warranty info is required!")
    .min(10, "Warranty information must be at least 10 characters")
    .max(255, "Warranty information must be less than 255 characters")
    .default("No warranty information available."),
  category: z
    .string("Product category is required!")
    .min(2, "Product category must be at least 2 characters")
    .max(25, "Product category must be less than 25 characters")
    .nullable(),
  tags: z.array(z.string()).default([]),
});

export const categorySchema = z.object({
  category_id: z.number().optional(),
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(25, "Category name must be less than 25 characters"),
  description: z
    .string()
    .min(10, "Category description must be at least 10 characters")
    .max(255, "Category description must be less than 255 characters"),
});

export const tagSchema = z.object({
  tag_id: z.number().optional(),
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(25, "Category name must be less than 25 characters"),
  description: z
    .string()
    .min(10, "Category description must be at least 10 characters")
    .max(255, "Category description must be less than 255 characters"),
});

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must be less than 32 characters")
  .refine((value) => {
    const regex = /(?=.*[A-Z])/;
    return regex.test(value);
  }, "Password must contain at least 1 uppercase letters")
  .refine((value) => {
    const regex = /(?=.*[!@#$&*])/;
    return regex.test(value);
  }, "Password must contain at least 1 special character (!@#$&*)")
  .refine((value) => {
    const regex = /(?=.*[0-9].*[0-9])/;
    return regex.test(value);
  }, "Password must contain at least 2 numbers")
  .refine((value) => {
    const regex = /(?=.*[a-z].*[a-z].*[a-z])/;
    return regex.test(value);
  }, "Password must contain at least 3 lowercase letters");

export const usernameSchema = z
  .string()
  .min(5, "Username must be at least 5 characters")
  .max(20, "Username must be less than 25 characters")
  .refine((value) => {
    const regex = /^[a-zA-Z0-9-]+$/;
    return regex.test(value);
  }, "Username must contain only letters, numbers or dashes (-)");

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    username: usernameSchema,
    email: z.string().email("Please enter a valid email address"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
