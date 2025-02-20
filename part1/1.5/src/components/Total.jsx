const Total = ({ parts }) => {

    let total = 0

    parts.parts.map((part) => (
        total += part.exercises
    ))

    return (
        <p>Number of exercises {total}</p>
    )
}

export default Total