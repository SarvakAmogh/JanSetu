import { demoUsers } from '@/data/users';
import { personas } from '@/data/personas';
import type { DemoUser, Persona } from './types';

export interface AuthUser extends DemoUser {
  persona: Persona;
}

const AUTH_KEY = 'jansetu_user_id';

export function login(email: string, password: string): AuthUser | null {
  const user = demoUsers.find((u) => u.email === email && u.password === password);
  if (!user) return null;

  const persona = personas.find((p) => p.id === user.personaId);
  if (!persona) return null;

  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEY, user.id);
  }

  return { ...user, persona };
}

export function loginAsDemo(userId: string): AuthUser | null {
  const user = demoUsers.find((u) => u.id === userId);
  if (!user) return null;

  const persona = personas.find((p) => p.id === user.personaId);
  if (!persona) return null;

  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEY, user.id);
  }

  return { ...user, persona };
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;

  const userId = localStorage.getItem(AUTH_KEY);
  if (!userId) return null;

  const user = demoUsers.find((u) => u.id === userId);
  if (!user) {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }

  const persona = personas.find((p) => p.id === user.personaId);
  if (!persona) {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }

  return { ...user, persona };
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
