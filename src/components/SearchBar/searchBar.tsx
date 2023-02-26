import useGoolePlacesAPI from "../../hooks/useGooglePlacesAPI";
import PropTypes from 'prop-types';
import { forwardRef } from "react";

const inputStyle = {
    input: {
        height: '3rem',
        fontSize: '24px'
    }
}

const SearchBar = (props: any) => {
    const {
        apiKey,
        onPlaceSelected,
        libraries,
        inputAutocompleteValue,
        options,
        googleMapScriptBaseUrl,
        refProp,
        language,
        ...rest
    } = props;

    const { ref } = useGoolePlacesAPI({
        ref: refProp,
        googleMapScriptBaseUrl,
        onPlaceSelected,
        apiKey,
        libraries,
        inputAutocompleteValue,
        options,
        language
    });

    return (
        <input
            id='autocomplete-text-box'
            style={inputStyle.input}
            placeholder="Search any location"
            ref={ref}
            {...rest} />
    );
}

SearchBar.propTypes = {
    apiKey: PropTypes.string,
    libraries: PropTypes.arrayOf(PropTypes.string),
    ref: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any })
    ]),
    googlemapScriptBaseUrl: PropTypes.string,
    onPlaceSelected: PropTypes.func,
    inputAutocompleteValue: PropTypes.string,
    options: PropTypes.shape({
        componentRestrictions: PropTypes.object,
        bounds: PropTypes.object,
        location: PropTypes.object,
        offset: PropTypes.number,
        origin: PropTypes.object,
        radius: PropTypes.number,
        sessionToken: PropTypes.object,
        types: PropTypes.arrayOf(PropTypes.string)
    }),
    language: PropTypes.string
}

export default forwardRef((props, ref) => (
    <SearchBar {...props} refProp={ref} />
));