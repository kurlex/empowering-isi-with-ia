export interface IAuthorizationService {
  logout(): Promise<void>;
  login(email: string, urlToRedirectTo: string): Promise<boolean>;
  getSession(): Promise<any>;
}
