const Content = ({ exercises }) => {
    return (
        <div>

            {
                exercises.map((exercise) => (
                    <p>
                        {exercise.name} {exercise.number}
                    </p>
                ))
            }

        </div>
    )
}

export default Content