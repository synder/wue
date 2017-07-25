/**
 * Converts a string to UPPERCASE
 * 
 * 'abc' => 'ABC'
 */

export default function uppercase (value) {
    return (value || value === 0) ? value.toString().toUpperCase() : ''
}