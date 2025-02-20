const Result = ({ results, total, realVal, good }) => {

    return (
        <div>
            <h1>statistics</h1>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {
                    results.map((result) => (
                        <li key={result.name}>{result.name} {result.total}</li>
                    ))
                }
            </ul>
            <ul style={{ listStyle: "none", padding: 0 }}>

                <li key={'all'}>all {total}</li>
                <li key={'avg'}>average {(realVal / total)}</li>
                <li key={'positive'}>positive {(good / total) * 100} %</li>

            </ul>
        </div>
    )
}

export default Result