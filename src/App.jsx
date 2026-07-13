import { useState } from "react";

// card event
const eventdeck = [
  { id: 1, 
    text: "Economy Crisis: central bank is collapsing, do we need a loan?",
    effectA: {budget: -3000, support: 10},
    effectB: {budget: 0, support: -20},
    optionA: "yes (cost $3000, support +10)",
    optionB: "no (cost $0, support -20)"
  },
  { id: 2, 
    text: "Economy Crisis: central bank is collapsing, do we need a loan?",
    effectA: {budget: -3000, support: 10},
    effectB: {budget: 0, support: -20},
    optionA: "yes (cost $3000, support +10)",
    optionB: "no (cost $0, support -20)"
  },
]

// app yes
function App() {
  const [stats, setstats] = useState({ 
    budget: 100, 
    support: 50,
    year: 1965,
    status: "playing"
  });
  const [currentevent, setcurrentevent] = useState(null);

  const drawcard = () => {
    const randomcard = eventdeck[Math.floor(Math.random() * eventdeck.length)];
    setcurrentevent(randomcard);
  };

  const handlechoice = (choice) => {
    const effect = choice === 'A' ? currentevent.effectA : currentevent.effectB;

    const newbudget = stats.budget + effect.budget;
    const newsupport = stats.support + effect.support;
    const newyear = stats.year + 1;

    let newstatus = "playing";
    if (newbudget < 0 || newsupport <= 0) newstatus = "lose";
    else if (newyear >= 1975) newstatus = "win";

    setstats({
      ...stats,
      budget: newbudget,
      support: newsupport,
      year: newyear,
      status: newstatus
    });

    setcurrentevent(null);
}

// ui
return (
    <div style={{ padding: '20px' }}>
      <h1>superpower-domination</h1>
      <div style={{ background: '#f0f0f0', padding: '10px' }}>
        <p>Budget: ${stats.budget} | Support: {stats.support}% | Year: {stats.year}</p>
        <p>Status: <strong>{stats.status.toUpperCase()}</strong></p>
      </div>

      {stats.status !== "playing" ? (
        <h2>GAME {stats.status.toUpperCase()}!</h2>
      ) : !currentevent ? (
        <button onClick={drawcard} style={{ marginTop: '20px' }}>draw deck</button>
      ) : (
        <div style={{ border: '2px solid black', padding: '20px', marginTop: '20px' }}>
          <h3>{currentevent.text}</h3>
          <button onClick={() => handlechoice('A')}>{currentevent.optionA}</button>
          <button onClick={() => handlechoice('B')}>{currentevent.optionB}</button>
        </div>
      )}
    </div>
  );
}

export default App;