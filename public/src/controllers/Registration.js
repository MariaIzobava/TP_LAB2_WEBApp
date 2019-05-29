const Registration = (function () {
    return {
        getCurrentSchedule: function (username) {
            let body = JSON.stringify({
                username
            });
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/student/active', false);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(body);
            let res = JSON.parse(xhr.response);
            if (res)
                return res;
        },
        getCourseOfferings: function () {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/courses/all', false);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send();
            let res = JSON.parse(xhr.response);
            if (res)
                return res;
        },
        createScheduleWithOfferings: function (courses, username) {
            let xhr = new XMLHttpRequest();
            let body = JSON.stringify({
                courses,
                username
            });
            xhr.open('POST', '/api/courses/createSchedule', false);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(body);

            let res = JSON.parse(xhr.response);
            if (res)
                return res;
        },
        submitSchedule: function (username) {
            let xhr = new XMLHttpRequest();
            let body = JSON.stringify({
                username
            });
            xhr.open('POST', '/api/courses/submit', false);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(body);
            let res = JSON.parse(xhr.response);
            if (res)
                return res;
        },
        deleteCurrentSchedule: function (username) {
            let xhr = new XMLHttpRequest();
            let body = JSON.stringify({
                username
            });
            xhr.open('POST', '/api/courses/delete', false);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(body);
            let res = JSON.parse(xhr.response);
            if (res)
                return res;
        },
        updateScheduleWithNewSelections: function (courses, username) {
            let xhr = new XMLHttpRequest();
            let body = JSON.stringify({
                courses,
                username
            });
            xhr.open('POST', '/api/courses/update', false);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(body);
            let res = JSON.parse(xhr.response);
            if (res)
                return res;
        },
    }
})();