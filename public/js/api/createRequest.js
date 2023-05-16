const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    try {
        xhr.open(options.method, options.url);
        xhr.send(options.data);
    } catch (e) {
        console.log(e);
    }
    xhr.addEventListener('load', () => options.callback(null, xhr.response));
};
