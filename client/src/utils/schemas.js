import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(5, "Product name must be at least 5 characters")
    .max(100, "Product name must be less than 100 characters"),
  is_available: z.boolean("Product availability is required!"),
  brand: z
    .string("Product brand is required!")
    .min(5, "Product name must be at least 5 characters")
    .max(100, "Product name must be less than 100 characters"),
  price: z
    .string("Product price is required!")
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  quantity: z
    .string("Product quantity is required!")
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  weight: z
    .string("Product weight is required!")
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  dimensions: z
    .string("Product dimensions are required!")
    .max(50, "Product name must be less than 50 characters"),
  description: z
    .string("Product description is required!")
    .min(15, "Product name must be at least 15 characters")
    .max(100, "Product name must be less than 100 characters"),
  image: z
    .string("Product image is required!")
    .min(10, "Product name must be at least 10 characters")
    .max(255, "Product name must be less than 255 characters"),
  notes: z
    .string("Product notes are required!")
    .max(255, "Product name must be less than 255 characters"),
  tags: z.array(z.string(), "Product tags are required!"),
  warranty_info: z
    .string("Product warranty info is required!")
    .max(255, "Product name must be less than 255 characters"),
  category: z.string("Product category is required!"),
});
