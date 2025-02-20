const Content = ({ parts }) => {

    return (
        <div>
            {parts.parts.map((part) => (
                <p>
                    {part.name} {part.exercises}
                </p>
            ))}
        </div>
    )
}

export default Content