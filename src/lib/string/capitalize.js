/**
 *  Converts a string into Capitalize
 * 
 * 'abc' => 'Abc'
 */

export default function capitalize (value) {
    if (!value && value !== 0) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
}
