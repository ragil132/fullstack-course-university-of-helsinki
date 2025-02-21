/* eslint-disable react/prop-types */
const Course = ({ course }) => {

    let total = 0

    course.parts.map((part) => (
        total += part.exercises
    ))

    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map((part) => (
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            ))}
            <p style={{ fontWeight: 'bold' }}>total of {total} exercises</p>
        </div>
    )
}

export default Course