import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map((_, index) => ({ anecdote: index, vote: 0 })))

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * 8))
  }

  const handleVotes = (selected) => {
    setVotes((prevVotes) =>
      prevVotes.map((data) =>
        data.anecdote === selected ? { ...data, vote: data.vote + 1 } : data
      )
    );
  }

  const mostVote = votes.reduce((max, vote) =>
    vote.vote > max.vote ? vote : max,
    { anecdote: null, vote: 0 }
  );

  return (
    <div>

      <h1>
        Anecdote of the day
      </h1>

      {anecdotes[selected]}
      <br />
      has {votes.find(v => v.anecdote === selected)?.vote || 0} votes
      <br />
      <button onClick={() => handleVotes(selected)}>vote</button>
      <button onClick={() => handleNextAnecdote()}>next anecdote</button>

      <h1>
        Anecdote with most votes
      </h1>

      {mostVote.anecdote !== null && mostVote.vote > 0 && (
        <>
          <p>{anecdotes[mostVote.anecdote]}</p>
          <p>has {mostVote.vote || 0} votes </p>
        </>
      )}
    </div>
  )
}

export default App