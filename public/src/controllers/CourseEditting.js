const CourseEditting = (function () {
    return {
        getCurrentSchedule: function (username) {
            let body = JSON.stringify({
                username
            });
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/student/professorActive', false);
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
        createScheduleWithOfferings: function (courses, username, professor) {
            let xhr = new XMLHttpRequest();
            let body = JSON.stringify({
                courses,
                username
            });

            xhr.open('POST', '/api/courses/createProfessorSchedule', false);
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
            xhr.open('POST', '/api/courses/professorSubmit', false);
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
            xhr.open('POST', '/api/courses/professorDelete', false);
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
            xhr.open('POST', '/api/courses/professorUpdate', false);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(body);
            let res = JSON.parse(xhr.response);
            if (res)
                return res;
        },
        getCourseStudents: function (course) {
            let xhr = new XMLHttpRequest();
            let body = JSON.stringify({
                course,
            });
            xhr.open('POST', '/api/courses/getUsers', false);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(body);
            let res = JSON.parse(xhr.response);
            if (res)
                return res;
        },
        markStudent: function (mark, student) {
            let xhr = new XMLHttpRequest();
            let body = JSON.stringify({
                mark, student
            });
            xhr.open('POST', '/api/students/mark', false);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(body);
            let res = JSON.parse(xhr.response);
            if (res)
                return res;
        }
    }
})();