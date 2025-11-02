import type {AxiosError} from "axios";
//Převzato z ChatGPT (OpenAI, model 5)
type ProblemDetail = {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
};

function isAxiosError<T = unknown>(e: unknown): e is AxiosError<T> {
    return typeof e === "object" && e !== null && "isAxiosError" in (e as any);
}

const statusCz: Record<number, string> = {
    400: "Neplatný požadavek",
    401: "Nepřihlášen(á)",
    403: "Přístup odepřen",
    404: "Nenalezeno",
    409: "Konflikt",
    422: "Neplatná data",
    429: "Příliš mnoho požadavků",
    500: "Chyba serveru",
    502: "Chybná brána",
    503: "Služba nedostupná",
    504: "Vypršel časový limit",
};

export function formatError(err: unknown): string {
    if (!isAxiosError<ProblemDetail>(err)) {
        if (err instanceof Error) return `Chyba: ${err.message}`;
        return "Došlo k neznámé chybě.";
    }

    const {response, request, message} = err;

    if (!response) {
        if (request) return "Server nereaguje. Zkuste to prosím později.";
        return `Chyba požadavku: ${message}`;
    }

    const {status, data} = response;
    const title = statusCz[status] ?? data?.title ?? "Chyba";
    const detail = data?.detail;

    return detail ? `${title} (${status}): ${detail}` : `${title} (${status}).`;
}