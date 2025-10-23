import {z} from "zod";

export const userRoleEnum = z.enum([
    "ADMIN",
    "TEACHER",
    "GRADUATE",
    "STUDENT"
])

export type UserRoleEnum = z.infer<typeof userRoleEnum>;

const UserRoleType = {
    ADMIN: "Administrátor",
    TEACHER: "Učitel",
    GRADUATE: "Absolvent",
    STUDENT: "Student",
} as const satisfies Record<UserRoleEnum, string>;

export const userRoleToCzech = (role: UserRoleEnum) => (UserRoleType[role])

