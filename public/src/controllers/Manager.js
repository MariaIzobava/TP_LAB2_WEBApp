const Manager = (function () {
    return {
        getCourseOfferings: function () {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/registration/all', false);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send();
            let res = JSON.parse(xhr.response);
            if (res)
                return res;
        },
        register: function (courses) {
            let xhr = new XMLHttpRequest();
            let body = JSON.stringify({
                courses
            });
            xhr.open('POST', '/api/registration/change', false);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(body);
        }
    }
})();