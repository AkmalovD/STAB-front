'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { login as supabaseLogin } from './login'
import { register as supabaseRegister } from './register'

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string, rememberMe?: boolean) => Promise<any>
    register: (name: string, email: string, password: string) => Promise<any>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Проверяем текущую сессию
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // Подписываемся на изменения аутентификации
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const register = (name: string, email: string, password: string) => {
        return supabaseRegister(name, email, password)
    }

    const login = (email: string, password: string, rememberMe: boolean = false) => {
        return supabaseLogin(email, password, rememberMe)
    }

    const logout = async () => {
        await supabase.auth.signOut()
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)