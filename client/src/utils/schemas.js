import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(5, "Product name must be at least 5 characters")
    .max(100, "Product name must be less than 100 characters"),
  is_available: z.boolean("Product availability is required!").default(true),
  brand: z
    .string("Product brand is required!")
    .min(2, "Product brand must be at least 2 characters")
    .max(100, "Product brand must be less than 100 characters"),
  price: z.number("Product price is required!"),
  quantity: z.number("Product quantity is required!"),
  weight: z.number("Product weight is required!"),
  dimensions: z
    .string("Product dimensions are required!")
    .min(5, "Product dimensions must be at least 5 characters")
    .max(50, "Product dimensions must be less than 50 characters"),
  description: z
    .string("Product description is required!")
    .min(15, "Product description must be at least 15 characters")
    .max(100, "Product description must be less than 100 characters"),
  image: z
    .string("Product image is required!")
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
    .max(25, "Product category must be less than 25 characters"),
  tags: z.array(z.string()).default([]),
});
