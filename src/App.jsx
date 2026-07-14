import { useState } from "react";

// card event
const eventdeck = [
  { id: 1, 
    text: "Economy Crisis: central bank is collapsing, do we need a loan?",
    effectA: {budget: -3000, stability: 10},
    effectB: {budget: 0, stability: -1},
    optionA: "yes (cost $3000, stability +10)",
    optionB: "no (cost $0, stability -20)"
  },
  { id: 2, 
    text: "Economy Crisis: central bank is collapsing, do we need a loan?",
    effectA: {budget: -3000, stability: 10},
    effectB: {budget: 0, stability: -1},
    optionA: "yes (cost $3000, stability +10)",
    optionB: "no (cost $0, stability -20)"
  },
]

// figures name
const figures = [
  {id: 'fig1', name: 'John'},
  {id: 'fig2', name: 'Bob'}
];

// app yes
function App() {
  const [stats, setstats] = useState({ 
    budget: 100, 
    stability: 50,
    year: 1965,
    status: "playing"
  });
  const [currentevent, setcurrentevent] = useState(null);
  const [lastusedyear, setlastusedyear] = useState({fig1: -2, fig2: -2});

  const drawcard = () => {
    const randomcard = eventdeck[Math.floor(Math.random() * eventdeck.length)];
    setcurrentevent(randomcard);
  };

  const handlechoice = (choice) => {
    const effect = choice === 'A' ? currentevent.effectA : currentevent.effectB;
    const newbudget = stats.budget + effect.budget;
    const newstability = stats.stability + effect.stability;
    const newyear = stats.year + 1;
    let newstatus = "playing";
    if (newbudget < 0 || newstability <= 0) newstatus = "lose";
    else if (newyear >= 1975) newstatus = "win";

    setstats({ ...stats, budget: newbudget, stability: newstability, year: newyear, status: newstatus });
    setcurrentevent(null);
  };

  const handlefigure = (id) => {
    if (stats.year - lastusedyear[id] < 2) {
      alert("still cd bozo")
      return;
    }
    setstats({...stats, stability: stats.stability + 5});
    setlastusedyear(prev => ({
      ...prev,
      [id]: stats.year
    }));
  };



// ui
return (
    <div style={{ background: '#f0f0f0', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Eastern Gambit</h1>
      <div style={{ background: '#e0e0e0', padding: '10px', marginBottom: '20px' }}>
        <p>Budget: ${stats.budget} | Stability: {stats.stability}% | Year: {stats.year}</p>
        <p>Status: <strong>{stats.status.toUpperCase()}</strong></p>
      </div>

      {stats.status !== "playing" ? (
        <h2>GAME {stats.status.toUpperCase()}!</h2>
      ) : !currentevent ? (
        <button onClick={drawcard}>draw a card</button>
      ) : (
        <div style={{ border: '2px solid black', padding: '20px' }}>
          <h3>{currentevent.text}</h3>
          <button onClick={() => handlechoice('A')}>{currentevent.optionA}</button>
          <button onClick={() => handlechoice('B')} style={{marginLeft: '10px'}}>{currentevent.optionB}</button>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {figures.map((fig) => {
          const isCooldown = stats.year - lastusedyear[fig.id] < 2;
          const isDisabled = stats.status !== "playing" || isCooldown;

          return (
            <button 
              key={fig.id}
              onClick={() => handlefigure(fig.id)} 
              disabled={isDisabled}
              style={{ marginRight: '10px', padding: '10px' }}
            >
              {stats.status !== "playing" 
                ? "they are running lmao" 
                : isCooldown 
                ? `CD ${fig.name}: ${2 - (stats.year - lastusedyear[fig.id])} year` 
                : `Call ${fig.name} (+5 stability)`
              }
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;