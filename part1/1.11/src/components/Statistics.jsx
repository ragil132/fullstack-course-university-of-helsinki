import StatisticLine from "./StatisticLine"

// eslint-disable-next-line react/prop-types
const Statistics = ({ total, realVal, good, bad, neutral }) => {

    return (
        <div>
            <h1>statistics</h1>

            <table>
                <tbody>
                    <StatisticLine text={'good'} value={good} />
                    <StatisticLine text={'neutral'} value={neutral} />
                    <StatisticLine text={'bad'} value={bad} />


                    <StatisticLine text={'all'} value={total} />
                    <StatisticLine text={'average'} value={(realVal / total)} />
                    <StatisticLine text={'positive'} value={((good / total) * 100) + '%'} />
                </tbody>
            </table>
        </div>
    )
}

export default Statistics