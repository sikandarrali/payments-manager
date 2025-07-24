import * as React from 'react';

const getOnLineStatus = () =>
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
        ? navigator.onLine
        : true;

export const useNetworkStatus = () => {
    const [status, setStatus] = React.useState(getOnLineStatus());
    const [hasInternetAccess, setHasInternetAccess] = React.useState(status);

    const checkInternetAccess = React.useCallback(async () => {
        if (status) {
            try {
                await fetch('https://www.google.com/', {
                    mode: 'no-cors',
                });
                setHasInternetAccess(true);
            } catch (error) {
                setHasInternetAccess(false);
            }
        } else {
            setHasInternetAccess(false);
        }
    }, [status]);

    const setOnline = React.useCallback(() => {
        setStatus(true);
        checkInternetAccess();
    }, [checkInternetAccess]);

    const setOffline = React.useCallback(() => {
        setStatus(false);
        setHasInternetAccess(false);
    }, []);

    React.useEffect(() => {
        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);

        // Initial check
        checkInternetAccess();

        return () => {
            window.removeEventListener('online', setOnline);
            window.removeEventListener('offline', setOffline);
        };
    }, [setOnline, setOffline, checkInternetAccess]);

    return hasInternetAccess;
};
