import { z } from "zod"; // Librería de validación de esquemas

export const registerSchema = z.object({
    username: z
        .string({
            required_error: "The username is required",
        })
        .min(5),
    email: z.string({
        required_error: "The email is required",
    }).email({ message: "The email is invalid" }),
    password: z
        .string({
            required_error: "The password is required",
        })
        .refine(
            (password) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password),
            {
                message:
                    "The password must contain at least one uppercase letter, one lowercase letter, and one number",
            }
        ),
});

export const loginSchema = z.object({
    email: z
        .string({
            required_error: "The email is required",
        })
        .email({ message: "The email is invalid" }),
    password: z
        .string({
            required_error: "The password is required",
        })
        .min(8, {
            message: "The password must be at least 8 characters long",
        }),
});

export const loginSchmea = z.object({
  email: z
    .string({
      required_error: "The email is required",
    })
    .email({ message: "The email is invalid" }), // El nombre de usuario debe tener al menos 5 caracteres y debe ser obligatorio
  password: z
    .string({
      required_error: "The password is required",
    })
    .min(8, {
      message: "The password must be at least 8 characters long",
    }),
});
