export const asset = (path: string) => {
    const url = new URL(path, import.meta.url).href;
    console.log(url);
    return url;
};

export function mouseEnterLeave(options: {
    element: HTMLElement;
    hoverTime?: number;
    callback?: () => void;
}) {
    const opts = {
        callback: () => {},
        hoverTime: 0,
        ...options,
    };
    let hovering: boolean;
    let hoverTimeout: number;

    opts.element.addEventListener('mouseenter', (event) => {
        event.preventDefault();

        hovering = false;

        hoverTimeout = setTimeout(() => {
            opts.callback();
            hovering = true;
        }, opts.hoverTime);
    });

    opts.element.addEventListener('mouseleave', (event) => {
        event.preventDefault();
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
        }

        if (hovering) {
            opts.callback();
        }
    });
}

export function exists<T>(value: T | undefined | null) {
    if (value === undefined || value === null) {
        throw new Error('Value not set');
    }
    return value;
}

export function entries<T extends object>(object: T) {
    return Object.entries(object) as any as [keyof T, T[keyof T]][];
}
