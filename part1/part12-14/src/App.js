import { useState } from 'react';

function App() {

  const [anecdotes, setAnecdotes] = useState([
    {
      text: 'If it hurts, do it more often.',
      points: 0
    },
    {
      text: ' Adding manpower to a late software project makes it later!',
      points: 0
    },
    {
      text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      points: 0
    },
    {
      text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      points: 0
    },
    {
      text: 'Premature optimization is the root of all evil.',
      points: 0
    },
    {
      text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      points: 0
    },
    {
      text: 'The only way to go fast, is to go well.',
      points: 0
    }
  ]);

  const [selected, setSelected] = useState(0)

  const handleVote = () => {
    const newAnecdotes = [...anecdotes];
    newAnecdotes[selected].points++;
    setAnecdotes(newAnecdotes);
  }

  const handleNext = () => {
    setSelected(selected => selected === anecdotes.length - 1 ? 0 : selected + 1);
  }

  return (
    <div className="App">
      <h1>Anecdote of the day</h1>
      <button onClick={handleNext}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      <p>{anecdotes[selected].text}</p>
      <p>has {anecdotes[selected].points} votes</p>
      <h1>Anecdote with most votes</h1>
      <p>{mostPopular(anecdotes).text}</p>
      <p>has {mostPopular(anecdotes).points} votes</p>
    </div>
  );
}

function mostPopular(anecdotes) {
  return anecdotes.reduce((max, anecdote) => anecdote.points > max.points ? anecdote : max, anecdotes[0]);
}

export default App;
