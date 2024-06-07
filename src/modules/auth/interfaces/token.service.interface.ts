export interface ITokenService {
  findByToken(token: string): Promise<any>;
}
