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
  tags: z.any(),
  warranty_info: z
    .string("Product warranty info is required!")
    .min(10, "Warranty information must be at least 10 characters")
    .max(255, "Warranty information must be less than 255 characters")
    .default("No warranty information available."),

  category: z.string("Product category is required!"),
});
