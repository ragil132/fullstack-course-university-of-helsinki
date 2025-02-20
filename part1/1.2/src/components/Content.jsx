import Part from "./Part"

const Content = ({ exercises }) => {
    return (
        <div>
            <Part name={exercises[0].name} number={exercises[0].number} />
            <Part name={exercises[1].name} number={exercises[1].number} />
            <Part name={exercises[2].name} number={exercises[2].number} />
        </div>
    )
}

export default Content