import type { Page } from "./spring-boot-page";

export const springInfiniteBase = {
    initialPageParam: 0,
    getNextPageParam: (lastPage: Page<any>) => {
        const next = lastPage.number + 1;
        return next < lastPage.totalPages ? next : undefined;
    }
}