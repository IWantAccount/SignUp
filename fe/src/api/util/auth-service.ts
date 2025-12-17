import {userRoleEnum, type UserRoleEnum} from "@/domain/user-role-enum.ts";
import {enqueueSnackbar} from "notistack";
import { jwtDecode, type JwtPayload } from "jwt-decode";

type JwtCustomPayload = JwtPayload &{
    role: UserRoleEnum;
    name: string;
    userId: string;
};

//Návrh téhle třídy jsem výrazně konzultoval s ChatGPT (model 5.1, OpenAI)
export class AuthService {
    private static token: string | null = null;
    private static userName: string | null = null;
    private static userRole: UserRoleEnum | null = null;
    private static userId: string | null = null;
    private static jwtStorageKey: string = "suJWT";
    private static expiration: number | undefined = undefined;

    static login(token: string): void {
        this.token = token;
        localStorage.setItem(this.jwtStorageKey, token);

        try {
            const payload = jwtDecode<JwtCustomPayload>(token);
            this.userId = payload.userId;
            this.userName = payload.name;
            this.userRole = payload.role;
            this.expiration = payload.exp;
        }
        catch (error) {
            enqueueSnackbar("Chyba při přihlášení", {variant: "error"});
            this.logout();
        }
    }

    static initFromStorage(): void {

        const loadedToken = localStorage.getItem(this.jwtStorageKey);
        if (!loadedToken) {
            this.logout()
            return;
        }



        try {
            const payload = jwtDecode<JwtCustomPayload>(loadedToken);
            this.userId = payload.userId;
            this.userName = payload.name;
            this.userRole = payload.role;
            this.expiration = payload.exp;
            this.token = loadedToken;
            console.log("login succes. Token: " + this.token);

            if(this.isExpired(5)) {
                this.logout();
            }
        }
        catch (error) {
            console.error("JWT decode failed. Error:\n" + error);
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
        this.expiration = undefined
        localStorage.removeItem(this.jwtStorageKey);
    }

    static atLeastTeacher(): boolean {
        return this.isLoggedIn() && (this.userRole === userRoleEnum.enum.TEACHER || this.userRole === userRoleEnum.enum.ADMIN);
    }

    static isStudent(): boolean {
        return this.isLoggedIn() && (this.userRole === userRoleEnum.enum.STUDENT);
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
        if(!this.expiration) {
            return false;
        }

        const nowSeconds = Math.floor(Date.now() / 1000);
        if(this.expiration) {
            return this.expiration <= (nowSeconds + (extraMinutes ?? 0) * 60);
        }
        return false;

    }
}