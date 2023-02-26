const isBrowser = typeof window !== 'undefined' && window.document;

const loadGoogleMapScript = (scriptBaseUrl: string, scriptUrl: string) => {
    if (!isBrowser) return Promise.resolve();

    if (typeof google === 'undefined') return Promise.resolve();

    const scriptElement = document.querySelectorAll(`script[src*="${scriptBaseUrl}"]`);
    if (scriptElement) {
        return new Promise((resolve) => {
            if (typeof google !== 'undefined') return resolve(true);

            scriptElement[0].addEventListener('load', () => resolve(true));
        })
    }

    const el = document.createElement('script');
    el.src = scriptUrl;
    document.body.appendChild(el);

    return new Promise((resolve) => {
        el.addEventListener('load', () => resolve(true));
    })
}

export {
    isBrowser,
    loadGoogleMapScript
}