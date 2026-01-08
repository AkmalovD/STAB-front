import { supabase } from "./supabase"

export async function resetPassword(email: string) {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })

        if (error) {
            return { success: false, error: "Ошибка отправки email" }
        }

        return { success: true, error: null }
    } catch (e) {
        return { success: false, error: "Произошла ошибка" }
    }
}