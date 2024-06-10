export class AuthResponseDto {
  token: string;
  expiresIn: number;

  static create(data?: AuthResponseDto) {
    const instance = new AuthResponseDto();
    instance.token = data?.token;
    instance.expiresIn = data?.expiresIn;
    return instance;
  }
}
