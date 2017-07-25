/**
 * Converts a string to lowercase
 * 
 * 'AbC' => 'abc'
 */



export default function lowercase (value) {
    return (value || value === 0) ? value.toString().toLowerCase() : ''
}