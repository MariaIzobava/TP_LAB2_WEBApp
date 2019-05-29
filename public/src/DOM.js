let mark;
function displayStudentCourses(courses, del) {
  document.querySelector('.student_courses').innerHTML = 'MY COURSES';
  courses.forEach((course) => {
      let newDiv = document.createElement("div");
      newDiv.className = 'list-group-item active_course';
      let courseName = course.name;
      if (course.name[course.name.length - 1] === '?')
        courseName = courseName.slice(0, -1);

      newDiv.innerHTML = `${courseName}    ${course.schedule}     ${course.professor}`;

      if (del) {
          newDiv.className = 'list-group-item active_course delete';
      }

      if (course.name[course.name.length - 1] === '?')
          newDiv.className += ' list-group-item-secondary';
      document.querySelector('.student_courses').appendChild(newDiv);
  })
}

function displayProfessorCourses(courses, del) {
  document.querySelector('.student_courses').innerHTML = 'MY COURSES';
  courses.forEach((course) => {
    let newDiv = document.createElement('div');
    let courseName = course.name;
    if (course.name[course.name.length - 1] === '?')
          courseName = courseName.slice(0, -1);
    newDiv.innerHTML = `${courseName}               ${course.schedule} `;
    newDiv.className = 'list-group-item active_course';
    if (del) {
      newDiv.className = 'list-group-item active_course delete';
    }
    else {
      newDiv.addEventListener('click', (e) => { showCourseStudents(e, course.name) })
    }
    if (course.name[course.name.length - 1] === '?')
          newDiv.className += ' list-group-item-secondary';
    document.querySelector('.student_courses').appendChild(newDiv);
  })
}

function displayCourseOfferings(courses, userSchedule) {
  selectedCourses = []
  if (userSchedule) {
    userSchedule.forEach(course => {
      selectedCourses.push(course.name.replace('?', ''))
      if (!courses.find(elem => elem.name === course.name)) {
        courses.push(course)
      }
    })
  }
  document.querySelector('.all_courses').innerHTML = 'AVAILABLE COURSES';
  courses.forEach((course) => {
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `${course.name}               ${course.schedule}          ${course.price}$`;
    newDiv.className = 'list-group-item active_course';
    if (userSchedule && userSchedule.find(elem => elem.name === course.name || elem.name === course.name + '?')) {
      newDiv.className = 'list-group-item active_course list-group-item-warning';
    }
    newDiv.addEventListener('click', (e) => {
      if (selectedCourses.length < 6 && !selectedCourses.find((name) => name === course.name)) {
        if (selectedCourses.length >= 4) {
          e.target.className = 'list-group-item list-group-item-primary active_course'
        }
        else {
          e.target.className = 'list-group-item list-group-item-success active_course'
        }
        selectCourse(course.name)
      }
      else if (selectedCourses.find((name) => name === course.name)) {
        e.target.className = 'list-group-item active_course'
        deselectCourse(course.name)
      }
    });
    document.querySelector('.all_courses').appendChild(newDiv);
  })
}
function displayAllCourses(courses) {
  document.querySelector('.all_courses').innerHTML = 'AVAILABLE COURSES';
  courses.forEach((course) => {
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `${course.name}               ${course.schedule}          ${course.price}$`;
    if (course.open) {
      newDiv.className = 'list-group-item veryactive_course';
    }
    else {
      newDiv.className = 'list-group-item disactive_course';
    }
    newDiv.addEventListener('click', (e) => {
      if (!selectedCourses.find((name) => name === course.name)) {
        e.target.className = 'list-group-item veryactive_course'
        selectCourse(course.name)
      }
      else if (selectedCourses.find((name) => name === course.name)) {
        e.target.className = 'list-group-item disactive_course'
        deselectCourse(course.name)
      }
    });
    document.querySelector('.all_courses').appendChild(newDiv);
  })
}

function showCourseStudents(event, course) {
  CourseEditting.getCourseStudents(course).forEach(user => {
    let userDiv = document.createElement('div');
    userDiv.innerHTML = `<div>${user.username}</div><input type="text" value="${user.marks.length > 0 ? user.marks[0] : ''}" onchange="mark = this.value"/>`
    let button = document.createElement('div');
    button.innerHTML = `EVALUATE`
    button.className = "oc_but"
    userDiv.appendChild(button)
    event.target.appendChild(userDiv)
    button.onclick = function () {
      markUser(event.target, user.username)
    };
  })
}
function markUser(target, student) {
  target.removeChild(target.childNodes[1])
  CourseEditting.markStudent(mark, student)
} 