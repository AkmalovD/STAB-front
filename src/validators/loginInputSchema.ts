import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email обязателен для заполнения')
        .email('Введите корректный email адрес'),

    password: z
        .string()
        .min(1, 'Пароль обязателен для заполнения')
        .min(6, 'Пароль должен содержать минимум 6 символов'),

    rememberMe: z.boolean().optional(),
})

const validateForm =(): boolean => {
    const result = loginSchema.safeParse({
        email,
        password,
        rememberMe
    })

    if (result.success) {
        setErrors({})
        return true
    }

    const fieldErrors = result.error.flatten().fieldErrors

    setErrors({
    email: fieldErrors.email?.[0],
    password: fieldErrors.password?.[0],
    });
  
  return false;
}

export type LoginFormData = z.infer<typeof loginSchema>