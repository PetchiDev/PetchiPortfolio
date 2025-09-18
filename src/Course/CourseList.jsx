
import Course from "../Course/Course.jsx";
function CourseList(){
    const Courses=[{
        id:1,
        courseTitle:"React",
        coursePrice:999,
        rating:4.5
    },
    {
        id:2,
        courseTitle:"JavaScript",
        coursePrice:799,
        rating:4.0
    },
    {
        id:3,
        courseTitle:"HTML",
        coursePrice:499,
        rating:4.8
    },
    {
        id:4,
        courseTitle:"CSS",
        coursePrice:599,
        rating:4.2
    }

]
const filteredCourses = Courses.filter(course => course.rating >= 4.2);

const CourseList = filteredCourses.map((course) =>(
    <Course
    key={course.id}
    imageSrc={course.imageSrc}
    courseTitle={course.courseTitle}
    coursePrice={course.coursePrice}
    rating={course.rating}
    />
)

)

    return(
        <div>
            {CourseList}
        </div>
    );
}

export default CourseList;