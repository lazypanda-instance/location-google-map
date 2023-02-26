import { useCallback, useEffect, useRef } from "react";
import { isBrowser, loadGoogleMapScript } from "../utility/loadScript";

const useGoolePlacesAPI = (props: any) => {
    const {
        ref,
        onPlaceSelected,
        apiKey,
        libraries = 'places',
        inputAutocompleteValue = 'new-password',
        options: {
            types = [],
            componentRestrictions,
            fields = [
                'address_component',
                'geometry.location',
                'place_id',
                'formatted_address',
                'name'
            ],
            bounds,
            ...options
        },
        gooleMapScriptBaseUrl = 'https://maps.googleapis.com/maps/api/js',
        language
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const event = useRef<any>(null);
    const autocompleteRef = useRef<any>(null);

    const languageQueryParam = language ? `&language=${language}` : '';
    const googleMapsScriptUrl = `${gooleMapScriptBaseUrl}?libraries=${libraries}&key=${apiKey}${languageQueryParam}`;

    const initializeScript = useCallback(() => {
        return loadGoogleMapScript(gooleMapScriptBaseUrl, googleMapsScriptUrl);
    }, [googleMapsScriptUrl, gooleMapScriptBaseUrl]);

    useEffect(() => {
        const config = {
            ...options,
            fields,
            types,
            bounds
        }

        if (componentRestrictions) {
            config.componentRestrictions = componentRestrictions;
        }

        if (autocompleteRef.current || !inputRef.current || !isBrowser) return;

        if (ref && !ref.current) ref.current = inputRef.current;

        const handleAutoComplete = () => {
            if (typeof google === 'undefined') return console.error('Google Map has not initialized!');

            if (!google.maps.places) return console.error('Google map place API has not been initialized!');

            if (!(inputRef.current instanceof HTMLInputElement)) return console.error('Input ref must be an HTMLInputElement');

            autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, config);
            event.current = autocompleteRef.current.addListener('place_changed', () => {
                if (onPlaceSelected && autocompleteRef && autocompleteRef.current) {
                    onPlaceSelected(
                        autocompleteRef.current.getPlace(),
                        inputRef.current,
                        autocompleteRef.current
                    )
                }
            }) 
        }

        if (apiKey) {
            initializeScript().then(() => handleAutoComplete());
        }

        return () => (event.current ? event.current.remove() : undefined)
    }, []);

    return {
        ref: inputRef,
        autocompleteRef
    }

}

export default useGoolePlacesAPI;