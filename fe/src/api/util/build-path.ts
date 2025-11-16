import {baseURL} from "@/api/universal/axios.ts";

export function buildPath(components: string[], page?: number, pageSize?: number): string {
    let res = components.join("/");
    if (page || pageSize) {
        res = res + "?";
    }
    if (page) {
        res = res + "page=" + page;
    }
    if (pageSize) {
        const delim = page ? "&" : ""
        res = res + delim + "size=" + pageSize;
    }

    return res
}

export function buildFilePath(fileName: string): string {
    return baseURL + buildPath(["/file", "url-req", fileName]);
}
