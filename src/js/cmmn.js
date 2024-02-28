/**
 * name, value, option에 맞는 쿠키를 생성하여 저장.
 *
 * @author jisu
 * @since 2024.02.26
 * @param name
 * @param value
 * @param options
 */
const setCookie = (name, value, options = {}) => {
    options = {
        path: '/',
        // 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    console.log("updatedCookie : ", updatedCookie);
    document.cookie = updatedCookie;
}

/**
 * 주어진 이름의 쿠키를 반환하는데, 조건에 맞는 쿠키가 없다면 undefined를 반환
 * @author jisu
 * @since 2024.02.26
 * @param name
 * @returns {string|undefined}
 */
const getCookie = (name) => {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * @author jisu
 * @since 2024.02.26
 * @param name
 */
function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

export {
    setCookie,
    getCookie,
    deleteCookie
}