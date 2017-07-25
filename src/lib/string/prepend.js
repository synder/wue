/**
 * Prepends characters to a string.
 *
 * {{ 'world' | prepend 'hello ' }} => 'hello world'
 */

export default function prepend(str, prefix) {
    if (!str && str !== 0) {
        str = '';
    } else {
        str = str.toString();
    }
    return prefix + str;
};