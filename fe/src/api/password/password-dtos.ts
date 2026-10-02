export interface PasswordRequestDto {
    email: string;
}

export interface PasswordRestoreDto {
    password: string;
    reqId: string;
}