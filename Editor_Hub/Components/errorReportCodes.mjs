export function errorCode(code)
{
    const errorList = [
        `File could not be written. Talk to Brian.` //1
    ];
    return alert(`Error ${code}\n\n${errorList[code]}`,'Editor Hub')
}