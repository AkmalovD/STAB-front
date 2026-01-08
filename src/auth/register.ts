import { supabase } from "./supabase"

export interface Register {
    name: string
    email: string
    password: string
}

export async function register(name: string, email: string, password: string) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: name, // Метаданные пользователя
                }
            }
        })

        if (error) {
            switch (error.message) {
                case 'User already registered':
                    return { user: null, error: "Этот email уже используется" }
                case 'Password should be at least 6 characters':
                    return { user: null, error: "Слишком слабый пароль. Минимум 6 символов" }
                default:
                    return { user: null, error: "Ошибка регистрации. Попробуйте позже" }
            }
        }

        return { user: data.user, error: null }
    } catch (e) {
        return { user: null, error: "Произошла неизвестная ошибка" }
    }
}