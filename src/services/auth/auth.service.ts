import { supabase } from "@/lib/supabase/client";

export interface LoginCredentials {
   
    email: string;
    password: string;
}

export interface RegisterCredentials {
    displayName: string;
    username: string;
    email: string;
    password: string;
}

interface AuthRegisterCredentials {
    email: string;
    password: string;
}

class AuthService {
    async login(credentials: LoginCredentials) {
    const response = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
    });

    console.log(response);

    return response;
}

    async register(credentials: AuthRegisterCredentials) {
        return await supabase.auth.signUp({
            email: credentials.email,
            password: credentials.password,
        });
    }

   
   async forgotPassword(email: string) {
    return await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
            "premium-portfolio-builder-seven.vercel.app/auth/callback",
    });
}
// async exchangeRecoveryCode(code: string) {
//     return await supabase.auth.exchangeCodeForSession(code);
// }

async resetPassword(password: string) {

    return await supabase.auth.updateUser({
        password,
    });

}
 async logout() {
        return await supabase.auth.signOut();
    }
}


export const authService = new AuthService();