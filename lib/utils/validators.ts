import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["CUSTOMER", "VENDOR", "DISPATCHER"]),
});

export const productSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, { message: "Price must be at least 0.01" }),
  image: z.string().optional(),
  categoryId: z.string().min(1, { message: "Category is required" }),
  isAvailable: z.boolean().default(true),
  inventory: z.coerce.number().int().min(0),
});

export const restaurantSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().optional(),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  deliveryFee: z.coerce.number().min(0),
  minOrder: z.coerce.number().min(0),
  deliveryTime: z.coerce.number().int().min(1),
  deliveryRadius: z.coerce.number().min(0.1),
});

export const addressSchema = z.object({
  label: z.string().min(1, { message: "Label is required (e.g. Home, Office)" }),
  street: z.string().min(5, { message: "Street address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().optional(),
  zipCode: z.string().min(5, { message: "Zip code is required" }),
  isDefault: z.boolean().default(false),
});
