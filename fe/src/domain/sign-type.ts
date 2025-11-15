import {z} from "zod";

export const signTypeEnum = z.enum([
    "STANDARD_LEXICAL_SIGN",
    "NAME_SIGN",
    "SPECIFIC_SIGN",
    "INDIRECT_NAMING_UNIT",
    "CLASSIFICATOR"
]);

export type SignType = z.infer<typeof signTypeEnum>;

const SignTypeLabels = {
    STANDARD_LEXICAL_SIGN: "běžný znak",
    NAME_SIGN: "jmenný znak",
    SPECIFIC_SIGN: "specifický znak",
    INDIRECT_NAMING_UNIT: "nepřímé pojmenování",
    CLASSIFICATOR: "klasifikátor"
}

export const signTypeToCzech = (type: SignType) => SignTypeLabels[type];