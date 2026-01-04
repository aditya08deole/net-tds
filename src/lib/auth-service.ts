import { supabase } from './supabase'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthError {
  message: string
}

export class AuthService {
  static async signIn(credentials: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      throw new Error(this.getErrorMessage(error.message))
    }

    return data
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  }

  static async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }

  static onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user ?? null)
    })
  }

  private static getErrorMessage(error: string): string {
    switch (error) {
      case 'Invalid login credentials':
        return 'Invalid email or password. Please check your credentials and try again.'
      case 'Email not confirmed':
        return 'Please check your email and click the confirmation link before signing in.'
      case 'Too many requests':
        return 'Too many login attempts. Please wait a few minutes before trying again.'
      default:
        return 'An error occurred during sign in. Please try again.'
    }
  }
}