const Content = ({ parts }) => {

    return (
        <div>
            {parts.map((part) => (
                <p>
                    {part.name} {part.exercises}
                </p>
            ))}
        </div>
    )
}

export default Content