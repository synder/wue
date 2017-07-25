/**
 *  If the value is missing outputs the placeholder text
 * 
 * '' => {placeholder}
 * 'foo' => 'foo'
 */



export default function placeholder (input, property) {
    return ( input === undefined || input === '' ) ? property : input;
}
