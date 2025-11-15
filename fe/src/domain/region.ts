import {z} from "zod";

export const regionEnum = z.enum([
    "CZECHIA",
    "BOHEMIA",
    "MORAVIA",
    "SILEASIA"
])

export type Region = z.infer<typeof regionEnum>;

const regionTypeLabels = {
    CZECHIA: "Celá ČR",
    BOHEMIA: "Čechy",
    MORAVIA: "Morava",
    SILEASIA: "Slezsko",
}

export const regionToCzech = (region: Region) => regionTypeLabels[region];