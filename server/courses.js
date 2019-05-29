const fs = require('fs');
const coursesPath = './server/data/courses.json';
const studentsPath = './server/data/students.json';
const professorsPath = './server/data/professors.json';
const coursesActions = {
    getActiveCourses: function (username, professor) {
        let res = fs.readFileSync(coursesPath);
        try {
            return JSON.parse(res)
                .map((elem) => {
                    if (professor) {
                        if (elem.professor === username)
                            return elem;
                        if (elem.professor === username + '?') {
                            elem.taken = true;
                            elem.name = elem.name + '?';
                            return elem
                        }
                    }
                    else {
                        if (elem.users.find(el => el === username))
                            return elem;
                        if (elem.users.find(el => el === username + '?')) {
                            elem.taken = true;
                            elem.name = elem.name + '?';
                            return elem
                        }
                    }
                    return false
                })
                .filter(elem => elem)
        }
        catch (err) {
            return null;
        }
    },
    getCourseOfferings: function (registrar) {
        let res = fs.readFileSync(coursesPath);
        try {
            return JSON.parse(res)
                .filter((elem) => {
                    if (registrar)
                        return elem
                    return isRegistrationOpen(elem);
                })
        }
        catch (err) {
            return null;
        }
    },
    createWithOfferings: function (courses, username, professor) {
        let res = fs.readFileSync(coursesPath);
        try {
            const newCourses = JSON.parse(res)
                .map((elem) => {
                    if (courses.find(el => el === elem.name)) {
                        if (professor) {
                            elem.professor = username + '?';
                        }
                        else {
                            elem.users.push(username + '?');
                        }
                    }
                    return elem
                })
            if (professor)
                Professor.addSchedule(courses, username);
            else
                Student.addSchedule(courses, username);
            fs.writeFileSync(coursesPath, JSON.stringify(newCourses))
        }
        catch (err) {
            return null;
        }
    },
    submitSchedule: function (username, professor) {
        let res = fs.readFileSync(coursesPath);
        try {
            const newCourses = JSON.parse(res)
                .map((elem) => {
                    if (professor) {
                        if (!Professor.isSelected(elem, username) && elem.professor == username + '?' && stillOpen(elem)) {
                            Professor.assignProfessor(elem)
                        }
                    }
                    else {
                        const index = elem.users.indexOf(username + '?');
                        if (!Student.isSelected(elem, username) && index != -1 && stillOpen(elem)) {
                            Student.markAsEnrolledIn(elem, index)
                        }
                    }
                    return elem
                })
            if (professor) {
                Professor.save_course(username, true)
            }
            else {
                Student.save_course(username, true)
            }
            fs.writeFileSync(coursesPath, JSON.stringify(newCourses))
        }
        catch (err) {
            return null;
        }
    },
    deleteSchedule: function (username, professor) {
        let res = fs.readFileSync(coursesPath);
        try {
            const newCourses = JSON.parse(res)
                .map((elem) => {
                    if (professor) {
                        elem.professor = '';
                    }
                    else {
                        elem.users = elem.users.filter((user) => {
                            return !(user === username || user === username + '?')
                        })
                    }
                    return elem
                })
            if (professor) {
                Professor.save_course(username, false)
            }
            else {
                Student.save_course(username, false)
            }
            fs.writeFileSync(coursesPath, JSON.stringify(newCourses))
        }
        catch (err) {
            return null;
        }
    },
    updateWithNewSelections: function (courses, username, professor) {
        this.deleteSchedule(username, professor);
        this.createWithOfferings(courses, username, professor);
    },
    getCourseStudents: function (course) {
        let res = fs.readFileSync(studentsPath);
        try {
            return JSON.parse(res)
                .filter(student => student.courses.find(el => el === course))
        }
        catch (err) {
            return null;
        }
    },
    markStudent: function (mark, student) {
        let res = fs.readFileSync(studentsPath);
        try {
            newStudents = JSON.parse(res)
                .map(user => {
                    if (user.username === student) {
                        user.marks[0] = mark;
                    }
                    return user;
                })
            fs.writeFileSync(studentsPath, JSON.stringify(newStudents))
        }
        catch (err) {
            return null;
        }
    },
    changeOpen: function (courses) {
        let res = fs.readFileSync(coursesPath);
        try {
            const newCourses = JSON.parse(res)
                .map((elem) => {
                    if (courses.find(el => el === elem.name)) {
                        elem.open = true;
                    }
                    else {
                        elem.open = false;
                    }
                    return elem
                })
            fs.writeFileSync(coursesPath, JSON.stringify(newCourses))
        }
        catch (err) {
            return null;
        }
    }
};

const Student =
{
    addSchedule: function (courses, username) {
        let students = JSON.parse(fs.readFileSync(studentsPath));
        students.map(user => {
            if (user.username === username) {
                user.courses = courses;
            }
            return user;
        })
        fs.writeFileSync(studentsPath, JSON.stringify(students))

    },
    isSelected: function (elem, username) {
        return elem.users.find(el => el === username)
    },
    markAsEnrolledIn: function (elem, index) {
        elem.users[index] = elem.users[index].slice(0, -1);
        elem.taken = false;
    },
    save_course: function (username, save) {
        let students = JSON.parse(fs.readFileSync(studentsPath));
        students.map(user => {
            if (user.username === username) {
                user.saved = save;
            }
            return user;
        })
        fs.writeFileSync(studentsPath, JSON.stringify(students))
    }
};

const Professor =
{
    addSchedule: function (courses, username) {
        let professors = JSON.parse(fs.readFileSync(professorsPath));
        professors.map(user => {
            if (user.username === username) {
                user.courses = courses;
            }
            return user;
        })
        fs.writeFileSync(professorsPath, JSON.stringify(professors))

    },
    isSelected: function (elem, username) {
        return elem.professor == username
    },
    assignProfessor: function (elem) {
        elem.professor = elem.professor.slice(0, -1);
        elem.taken = false;
    },
    save_course: function (username, save) {
        let professors = JSON.parse(fs.readFileSync(professorsPath));
        professors.map(user => {
            if (user.username === username) {
                user.saved = save;
            }
            return user;
        })
        fs.writeFileSync(professorsPath, JSON.stringify(professors))
    }
};
function isRegistrationOpen(course) {
    return course.open;
}
function stillOpen(course) {
    return course.open;
}

module.exports = coursesActions;