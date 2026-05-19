"use server";

import { auth } from "../src/pkg/auth/auth";

export const signIn = async () => {
    await auth.api.signInEmail({
        body: {
            email: "user@email.com",
            password: "password",
        }
    })
}

export const signUp = async () => {
    await auth.api.signUpEmail({
        body: {
            name: "User",
            email: "user@email.com",
            password: "password",
        }
    })
}