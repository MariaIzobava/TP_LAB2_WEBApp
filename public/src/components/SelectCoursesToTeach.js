let professorContent = document.createElement('div');
professorContent.style.width = 'calc(100% - 498px)';

professorContent.innerHTML = `
<!--<div class="roman username dst_curs student_courses">MY COURSES</div>-->
<div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
			<div class="list-group student_courses">
			</div>
		</div>
	</div>
	<div class="all_courses"></div>
    </br>

	<div class="row">
		<div class="col-md-2">
			 
			<button type="button" class="btn btn-success add_course">
				UPDATE SCHEDULE
			</button>
		</div>
		<div class="col-md-2">
			 
			<button type="button" class="btn btn-success submit_courses">
				CONFIRM
			</button>
		</div>
		<div class="col-md-2">
			 
			<button type="button" class="btn btn-success create_schedule_btn">
				CREATE
			</button>
		</div>
		<div class="col-md-2">
			 
			<button type="button" class="btn btn-success update_schedule_btn">
				UPDATE
			</button>
		</div>
		<div class="col-md-2">
			 
			<button type="button" class="btn btn-success delete_schedule_btn">
				DELETE SCHEDULE
			</button>
		</div>
		<div class="col-md-2">
			 
			<button type="button" class="btn btn-success delete_schedule_btn_sub">
				CONFIRM DELETION
			</button>
		</div>
	
	</div>
</div>
<!--<div class="add_course"></div>-->
<!--<div class="submit_courses"></div>-->
<!--<div class="all_courses"></div>-->
<!--<div class="create_schedule_btn"></div>-->
<!--<div class="update_schedule_btn"></div>-->
<!--<div class="delete_schedule_btn"></div>-->
<!--<div class="delete_schedule_btn_sub"></div>-->
`
professorContent.querySelector('.add_course').addEventListener('click',
    updateSchedule);
professorContent.querySelector('.create_schedule_btn').addEventListener('click',
    () => {
        CourseEditting.createScheduleWithOfferings(selectedCourses, JSON.parse(localStorage.User))
        start('professor')
    })
professorContent.querySelector('.submit_courses').addEventListener('click',
    () => {
        CourseEditting.submitSchedule(JSON.parse(localStorage.User))
        start('professor')
    })

professorContent.querySelector('.delete_schedule_btn').addEventListener('click', deleteSchedule)
professorContent.querySelector('.delete_schedule_btn_sub').addEventListener('click', confirmScheduleDeletion)
professorContent.querySelector('.update_schedule_btn').addEventListener('click', updateOfferingsSelection);


function createSchedule(e) {
    displayCourseOfferings(CourseEditting.getCourseOfferings());
    document.querySelector('.create_schedule_btn').innerHTML = 'CREATE'
}
function selectCourse(course) {
    selectedCourses.push(course);
}
function deselectCourse(course) {
    selectedCourses.splice(selectedCourses.findIndex(elem => elem === course), 1);
}
function updateSchedule() {
    document.querySelector('.submit_courses').innerHTML = ''
    document.querySelector('.delete_schedule_btn').innerHTML = ''
    document.querySelector('.add_course').innerHTML = ''
    document.querySelector('.student_courses').innerHTML = ''
    document.querySelector('.update_schedule_btn').innerHTML = 'UPDATE'
    displayCourseOfferings(CourseEditting.getCourseOfferings(), CourseEditting.getCurrentSchedule(JSON.parse(localStorage.User)))
}
function deleteSchedule() {
    displayProfessorCourses(CourseEditting.getCurrentSchedule(JSON.parse(localStorage.User)), true);
    document.querySelector('.delete_schedule_btn').innerHTML = ''
    document.querySelector('.delete_schedule_btn_sub').innerHTML = 'CONFIRM DELETION'
}

function confirmScheduleDeletion() {
    document.querySelector('.delete_schedule_btn_sub').innerHTML = ''
    CourseEditting.deleteCurrentSchedule(JSON.parse(localStorage.User));
    start('professor');
}
function updateOfferingsSelection() {
    CourseEditting.updateScheduleWithNewSelections(selectedCourses, JSON.parse(localStorage.User))
    start('professor')
}