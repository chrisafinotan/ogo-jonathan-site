export const compareByDate = (a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
        return 1;
    }
    if (new Date(a.date) > new Date(b.date)) {
        return -1;
    }
    return 0;
};

export const compareByOrder = (a, b) => {
    if (a.order < b.order) {
        return -1;
    }
    if (a.order > b.order) {
        return 1;
    }
    return 0;
};

export const dateFormat = (date) => {
    let mm = date.toLocaleString("default", { month: "short" });
    let yy = date.getFullYear().toString();
    return `${mm}-${yy}`;
};

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
