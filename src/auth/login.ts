'use client'

import { supabase } from "./supabase"

export interface Login {
    email: string
    password: string
}

export async function login(email: string, password: string, rememberMe: boolean = false) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            // Обработка ошибок Supabase
            switch (error.message) {
                case 'Invalid login credentials':
                    return { user: null, error: "Неверный email или пароль" }
                case 'Email not confirmed':
                    return { user: null, error: "Подтвердите email адрес" }
                default:
                    return { user: null, error: "Ошибка входа. Попробуйте позже" }
            }
        }

        return { user: data.user, error: null }
    } catch (e) {
        return { user: null, error: "Произошла неизвестная ошибка" }
    }
}