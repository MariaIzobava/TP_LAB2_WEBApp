let studentContent = document.createElement('div');
studentContent.style.width = 'calc(100% - 498px)';
studentContent.innerHTML = `
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


<!--<div class="roman username dst_curs student_courses">Мои курсы</div>-->
<!--<div class="add_course"></div>-->
<!--<div class="submit_courses"></div>-->
<!--<div class="all_courses"></div>-->
<!--<div class="create_schedule_btn"></div>-->
<!--<div class="update_schedule_btn"></div>-->
<!--<div class="delete_schedule_btn"></div>-->
<!--<div class="delete_schedule_btn_sub"></div>-->
`
studentContent.querySelector('.add_course').addEventListener('click',
    updateSchedule);
studentContent.querySelector('.create_schedule_btn').addEventListener('click',
    () => {
        Registration.createScheduleWithOfferings(selectedCourses, JSON.parse(localStorage.User))
        start('student')
    })
studentContent.querySelector('.submit_courses').addEventListener('click',
    () => {
        Registration.submitSchedule(JSON.parse(localStorage.User))
        start('student')
    })

studentContent.querySelector('.delete_schedule_btn').addEventListener('click', deleteSchedule)
studentContent.querySelector('.delete_schedule_btn_sub').addEventListener('click', confirmScheduleDeletion)
studentContent.querySelector('.update_schedule_btn').addEventListener('click', updateOfferingsSelection);


function createSchedule() {
    displayCourseOfferings(Registration.getCourseOfferings());
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
    displayCourseOfferings(Registration.getCourseOfferings(), Registration.getCurrentSchedule(JSON.parse(localStorage.User)))
}
function deleteSchedule() {
    displayStudentCourses(Registration.getCurrentSchedule(JSON.parse(localStorage.User)), true);
    document.querySelector('.delete_schedule_btn').innerHTML = ''
    document.querySelector('.delete_schedule_btn_sub').innerHTML = 'CONFIRM DELETION'
}

function confirmScheduleDeletion() {
    document.querySelector('.delete_schedule_btn_sub').innerHTML = ''
    Registration.deleteCurrentSchedule(JSON.parse(localStorage.User));
    start('student');
}
function updateOfferingsSelection() {
    Registration.updateScheduleWithNewSelections(selectedCourses, JSON.parse(localStorage.User))
    start('student')
}