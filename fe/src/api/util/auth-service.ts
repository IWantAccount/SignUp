import {userRoleEnum, type UserRoleEnum} from "@/domain/user-role-enum.ts";
import {enqueueSnackbar} from "notistack";
//Návrh téhle třídy jsem výrazně konzultoval s ChatGPT (model 5.1, OpenAI)
export class AuthService {
    private static token: string | null = null;
    private static userName: string | null = null;
    private static userRole: UserRoleEnum | null = null;
    private static userId: string | null = null;
    private static jwtStorageKey: string = "suJWT";
    private static expiration: number | null = null;

    static login(token: string): void {
        this.token = token;
        localStorage.setItem(this.jwtStorageKey, token);

        try {
            const payload = this.decodeJWT(token);
            this.userId = payload.userId;
            this.userName = payload.name;
            this.userRole = payload.role;
            this.expiration = payload.exp;
        }
        catch (error) {
            enqueueSnackbar("Chyba při přihlášení", {variant: "error"});
            console.error("JWT decode failed. Error:\n" + error);
            this.logout();
        }
    }

    static initFromStorage(): void {

        const loadedToken = localStorage.getItem(this.jwtStorageKey);
        if (!loadedToken) {
            this.logout()
            return;
        }

        if(this.isExpired(5)) {
            this.logout();
        }

        try {
            const payload = this.decodeJWT(loadedToken);
            this.userId = payload.userId;
            this.userName = payload.name;
            this.userRole = payload.role;
            this.expiration = payload.exp;
            this.token = loadedToken;
        }
        catch (error) {
            this.logout();
        }
    }

    static getToken(): string | null {
        return this.token;
    }

    static logout(): void {
        this.token = null;
        this.userName = null;
        this.userRole = null;
        this.userId = null;
        localStorage.removeItem(this.jwtStorageKey);
    }

    static atLeastTeacher(): boolean {
        return this.isLoggedIn() && (this.userRole === userRoleEnum.enum.TEACHER || this.userRole === userRoleEnum.enum.ADMIN);
    }

    static atLeastAdmin(): boolean {
        return this.isLoggedIn() && this.userRole === userRoleEnum.enum.ADMIN;
    }

    static isLoggedIn(): boolean {
        return !(this.token === null);
    }

    static getUserName(): string {
        if(this.userName === null) {
            return "";
        }

        return this.userName;
    }

    static getUserRole(): UserRoleEnum | null {
        return this.userRole;
    }

    static getUserId(): string {
        if(this.userId === null) {
            return "";
        }

        return this.userId;
    }

    static isExpired(extraMinutes?: number): boolean {
        if(this.expiration === null) {
            return false;
        }

        const nowSeconds = Math.floor(Date.now() / 1000);
        return this.expiration <= (nowSeconds + (extraMinutes ?? 0) * 60);
    }

    private static decodeJWT(token: string) {
        const payload = token.split('.')[1];

        const payloadJson = atob(payload);
        return JSON.parse(payloadJson);
    }
}