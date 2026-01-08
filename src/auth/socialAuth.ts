'use client'

import { FirebaseError } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./supabase";


// Google
export async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return { user: result.user, error: null };
    } catch (e) {
        if (e instanceof FirebaseError) {
            switch (e.code) {
                case 'auth/popup-closed-by-user':
                    return { user: null, error: "Вход отменён пользователем" };
                case 'auth/popup-blocked':
                    return { user: null, error: "Попап заблокирован браузером" };
                case 'auth/cancelled-popup-request':
                    return { user: null, error: "Запрос отменён" };
                case 'auth/account-exists-with-different-credential':
                    return { user: null, error: "Аккаунт уже существует с другим методом входа" };
                case 'auth/network-request-failed':
                    return { user: null, error: "Проблемы с подключением к интернету" };
                default:
                    return { user: null, error: "Ошибка входа через Google" };
            }
        }
        return { user: null, error: "Произошла неизвестная ошибка" };
    }
}

// Facebook 
export async function signInWithFacebook() {
    try {
        const provider = new FacebookAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return { user: result.user, error: null };
    } catch (e) {
        if (e instanceof FirebaseError) {
            switch (e.code) {
                case 'auth/popup-closed-by-user':
                    return { user: null, error: "Вход отменён пользователем" };
                case 'auth/popup-blocked':
                    return { user: null, error: "Попап заблокирован браузером" };
                case 'auth/cancelled-popup-request':
                    return { user: null, error: "Запрос отменён" };
                case 'auth/account-exists-with-different-credential':
                    return { user: null, error: "Аккаунт уже существует с другим методом входа" };
                case 'auth/network-request-failed':
                    return { user: null, error: "Проблемы с подключением к интернету" };
                default:
                    return { user: null, error: "Ошибка входа через Facebook" };
            }
        }
        return { user: null, error: "Произошла неизвестная ошибка" };
    }
}