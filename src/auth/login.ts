'use client'

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { FirebaseError } from "firebase/app";

export interface Login {
    email: string;
    password: string;
}

export async function login(email: string, password: string) {
    try {
        const useCred = await signInWithEmailAndPassword(auth, email, password);
        return {user: useCred.user, error: null}
    } catch (e) {
        if (e instanceof FirebaseError) {
            switch (e.code) {
                case 'auth/user-not-found':
                return { user: null, error: "Пользователь с таким email не найден" };
            case 'auth/wrong-password':
                return { user: null, error: "Неверный пароль. Попробуйте ещё раз" };
            case 'auth/invalid-email':
                return { user: null, error: "Некорректный формат email адреса" };
            case 'auth/user-disabled':
                return { user: null, error: "Этот аккаунт был заблокирован" };
            case 'auth/too-many-requests':
                return { user: null, error: "Слишком много попыток входа. Попробуйте позже" };
            case 'auth/network-request-failed':
                return { user: null, error: "Проблемы с подключением к интернету" };
            case 'auth/invalid-credential':
                return { user: null, error: "Неверные данные для входа" };
            default:
                return { user: null, error: "Ошибка входа. Попробуйте позже" };
            }
        }
        return { user: null, error: "Произошла неизвестная ошибка" };
    }
}