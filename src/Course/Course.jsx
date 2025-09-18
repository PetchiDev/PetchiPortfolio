
// import navStyles from './Course.module.css';
// function Course(props) {

//     if(props.show == true){
//   return (
//     <div className={navStyles.card}>
//       <nav>
//         <h1>{props.title}</h1>
//         <button type="button">{props.buttonText}</button>
//       </nav>

//       <img src={props.imageSrc}/>
//       <h2>{props.courseTitle}</h2>
//       <p>{props.courseDescription}</p>
//     </div>
//   );
// }
// else{
//     return(
//         <div className={navStyles.card}>
//             <h2>No course Available</h2>
//         </div>
//     );
// }
// }

// export default Course;
import PropTypes from 'prop-types';

function Course(props) {
  return(
    <>
    <img src={props.imageSrc}/>
    <h2> {props.courseTitle}</h2>
    <p>{props.coursePrice} </p>
    <p>{props.rating}</p>
    </>
  );



}
  Course.defaultProps = {
    imageSrc: "https://via.placeholder.com/150",
    courseTitle: "Default Course Title",
    coursePrice: "$0.00",
    rating: "No rating available"
  };
  Course.propTypes = {
    imageSrc: PropTypes.string,
    courseTitle: PropTypes.string,
    coursePrice: PropTypes.number,
    rating: PropTypes.number
  };
export default Course;