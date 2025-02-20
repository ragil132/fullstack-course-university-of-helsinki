const Total = ({ exercises }) => {

    let total = 0

    exercises.map((part) => (
        total += part.number
    ))

    return (
        <p>Number of exercises {total}</p>
    )
}

export default Total