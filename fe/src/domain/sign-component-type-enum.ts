import { z } from "zod";

export const signComponentTypeEnum = z.enum([
    "HAND_SHAPE",
    "LOCATION",
    "MOVEMENT",
    "PALM_ORIENTATION",
    "FINGER_ORIENTATION",
    "CONTACT",
    "HAND_ARRANGEMENT",
]);

export type SignComponentTypeEnum = z.infer<typeof signComponentTypeEnum>;

const SignComponentTypeLabels = {
    HAND_SHAPE: "tvar ruky",
    LOCATION: "místo artikulace",
    MOVEMENT: "pohyb",
    PALM_ORIENTATION: "orientace dlaně",
    FINGER_ORIENTATION: "orientace prstů",
    CONTACT: "dotek",
    HAND_ARRANGEMENT: "vzájemná poloha rukou",
} as const satisfies Record<SignComponentTypeEnum, string>;

export const componentTypeToCzech = (type: SignComponentTypeEnum) => SignComponentTypeLabels[type];