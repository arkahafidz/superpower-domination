import { useState } from "react";

// card event
const eventdeck = [
  { id: 1, 
    text: "Economy Crisis: central bank is collapsing, do we need a loan?",
    optionA: "yes (cost $10000, support +10)",
    optionB: "no (cost $0, support -10)"
  },
  { id: 2, 
    text: "Economy Crisis: central bank is collapsing, do we need a loan?",
    optionA: "yes (cost $10000, support +10)",
    optionB: "no (cost $0, support -10)"
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
    if (currentevent.id === 1) {
      if (choice === 'A') setstats({ budget: stats.budget - 3000, support: stats.support + 10, year: stats.year + 1 });
      else setstats({ budget: stats.budget, support: stats.support - 20, year: stats.year + 1});
    } else if (currentevent.id === 2) {
      if (choice === 'A') setstats({ budget: stats.budget - 3000, support: stats.support + 10, year: stats.year + 1 });
      else setstats({ budget: stats.budget, support: stats.support - 20, year: stats.year + 1});
    }
  setcurrentevent(null);
};

return (
    <div style={{ padding: '20px' }}>
      <h1>Simulator Politik</h1>
      <div style={{ background: '#f0f0f0', padding: '10px' }}>
        <p>Budget: ${stats.budget} | Support: {stats.support}% | Year: {stats.year}</p>
      </div>

      {!currentevent ? (
        <button onClick={drawcard} style={{ marginTop: '20px' }}>Ambil Kartu Kejadian</button>
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