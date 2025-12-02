import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { FirebaseError } from "firebase/app";
import { error } from "console";

export interface Register {
    name: string
    email: string
    passwroed: string
}

export async function register(name: string, email: string, password: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(userCredential.user, {
            displayName: name
        })

        return { user: userCredential.user, error: null }
    } catch(e) {
        if (e instanceof FirebaseError) {
            switch (e.code) {
                case 'auth/email-already-in-use':
                    return { user: null, error: "Этот email уже используется" };
                case 'auth/invalid-email':
                    return { user: null, error: "Некорректный формат email адреса" };
                case 'auth/operation-not-allowed':
                    return { user: null, error: "Регистрация временно недоступна" };
                case 'auth/weak-password':
                    return { user: null, error: "Слишком слабый пароль. Используйте более надёжный" };
                case 'auth/network-request-failed':
                    return { user: null, error: "Проблемы с подключением к интернету" };
                default:
                    return { user: null, error: "Ошибка регистрации. Попробуйте позже" };
        }
        }
    }
    return { user: null, error: "Произошла неизвестная ошибка"}
}