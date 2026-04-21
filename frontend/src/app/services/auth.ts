import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  delivery_address?: string;
}

export interface TokenPairResponse {
  access: string;
  refresh: string;
}

export interface UserMeResponse {
  id: number;
  username: string;
  email: string;
  name: string;
  phone: string;
  addresses: Array<{ id: number; address: string; is_default: boolean }>;
  paymentMethods: Array<{ id: number; type: string; details: string; is_default: boolean }>;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  login(data: LoginRequest): Observable<TokenPairResponse> {
    return this.http.post<TokenPairResponse>(this.apiUrl + '/token/', data).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
      })
    );
  }

  register(data: RegisterRequest): Observable<UserMeResponse> {
    return this.http.post<UserMeResponse>(this.apiUrl + '/register/', data);
  }

  getMe(): Observable<UserMeResponse> {
    return this.http.get<UserMeResponse>(this.apiUrl + '/user/');
  }

  logout(callBackend = true): void {
    const refresh = this.getRefreshToken();
    if (callBackend && refresh) {
      this.http.post(this.apiUrl + '/logout/', { refresh }).subscribe();
    }
    this.clearSession();
  }

  private clearSession(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}