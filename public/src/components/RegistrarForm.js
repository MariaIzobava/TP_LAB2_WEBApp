let registrarContent = document.createElement('div');
registrarContent.style.width = 'calc(100% - 498px)';

registrarContent.innerHTML = `
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
			 
			<button type="button" class="btn btn-success create_schedule_btn">
				UPDATE COURSES DATA
			</button>
		</div>
		
		<div class="col-md-10">
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
registrarContent.querySelector('.create_schedule_btn').addEventListener('click',
    () => {
        Manager.register(selectedCourses)
        registration()
    })

function registration() {
    selectedCourses = []
    const courses = Manager.getCourseOfferings();
    courses.forEach(course => {
        if (course.open) {
            selectedCourses.push(course.name);
        }
    })
    displayAllCourses(courses);
    document.querySelector('.create_schedule_btn').innerHTML = 'UPDATE COURSES DATA'
}

