/* eslint-disable react/prop-types */
const Course = ({ course }) => {

    return (
        <div>
            <h1>Web development curriculum</h1>
            {course.map((courseItem) => {
                const total = courseItem.parts.reduce((sum, part) => sum + part.exercises, 0);

                return (
                    <div key={courseItem.id}>
                        <h1>{courseItem.name}</h1>
                        {courseItem.parts.map((part) => (
                            <p key={part.id}>
                                {part.name} {part.exercises}
                            </p>
                        ))}
                        <p style={{ fontWeight: "bold" }}>total of {total} exercises</p>
                    </div>
                );
            })}
        </div>
    )
}

export default Course