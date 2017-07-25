
/**
 * Appends characters to a string.
 *
 * {{ 'sky' | append '.jpg' }} => 'sky.jpg'
 */

export default function append(str, postfix) {
    if (!str && str !== 0) {
        str = '';
    } else {
        str = str.toString();
    }
    return str + postfix;
}