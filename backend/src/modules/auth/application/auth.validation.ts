import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({ required_error: "Nome é obrigatório." })
    .trim()
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .max(120, "O nome não pode passar de 120 caracteres.")
    .regex(/^[a-zA-ZÀ-ÿ\s\.]+$/, "O nome deve conter apenas letras e espaços."),
  email: z.string({ required_error: "E-mail é obrigatório." })
    .trim()
    .email("Insira um endereço de e-mail válido.")
    .max(255, "O e-mail não pode passar de 255 caracteres."),
  password: z.string({ required_error: "Senha é obrigatória." })
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .max(128, "A senha não pode passar de 128 caracteres.")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um caractere especial.")
});

export const loginSchema = z.object({
  email: z.string({ required_error: "E-mail é obrigatório." })
    .trim()
    .email("Insira um endereço de e-mail válido.")
    .max(255, "O e-mail não pode passar de 255 caracteres."),
  password: z.string({ required_error: "Senha é obrigatória." })
    .min(1, "Insira sua senha.")
    .max(128, "A senha não pode passar de 128 caracteres.")
});

export const forgotPasswordSchema = z.object({
  email: z.string({ required_error: "E-mail é obrigatório." })
    .trim()
    .email("Insira um endereço de e-mail válido.")
    .max(255, "O e-mail não pode passar de 255 caracteres.")
});

export const resetPasswordSchema = z.object({
  token: z.string().min(32, "Token de recuperação inválido.").max(256),
  password: z.string({ required_error: "Nova senha é obrigatória." })
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .max(128, "A senha não pode passar de 128 caracteres.")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um caractere especial.")
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
