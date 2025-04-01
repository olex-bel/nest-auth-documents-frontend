import { useState, useEffect } from "react";
import { useFetcher } from "react-router";

type UseModalFetcherProps = {
    ref: React.RefObject<HTMLDialogElement | null>;
};

export function useModalFetcher({ ref }: UseModalFetcherProps) {
    const fetcher = useFetcher();
    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (fetcher.state === "submitting") {
            setIsSubmitting(true);
        } else if (isSubmitting && fetcher.state === "idle") {
            if (fetcher.data?.errorMessage) {
                setErrorMessage(fetcher.data.errorMessage);
            } else {
                ref.current?.close();
            }
            setIsSubmitting(false);
        }
    }, [fetcher.state, fetcher.data, isSubmitting, ref]);

    const reset = () => {
        setErrorMessage(null);
    };

    return { fetcher, isSubmitting, errorMessage, reset };
}