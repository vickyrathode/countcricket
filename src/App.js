import { useState } from 'react';
import CreateMatch from './components/CreateMatch';
import AddPlayers from './components/AddPlayers';
import Scoreboard from './components/Scoreboard';

function App() {
  const [matchData, setMatchData] = useState(null);
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [matchStarted, setMatchStarted] = useState(false);

  const handleCreateMatch = (data) => {
    setMatchData(data);
  };

  const handleAddPlayerToTeam1 = (player) => {
    setTeam1Players([...team1Players, player]);
  };

  const handleAddPlayerToTeam2 = (player) => {
    setTeam2Players([...team2Players, player]);
  };

  const startMatch = () => {
    if (team1Players.length > 0 && team2Players.length > 0) {
      setMatchStarted(true);
    } else {
      alert('Please add players to both teams before starting the match.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!matchData && <CreateMatch onCreateMatch={handleCreateMatch} />}

      {matchData && !matchStarted && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Match Created: {matchData.team1} vs {matchData.team2}
          </h2>
          
          {/* Add Players for Team 1 */}
          <AddPlayers
            teamName={matchData.team1}
            onAddPlayer={handleAddPlayerToTeam1}
            teamPlayers={team1Players}
          />

          {/* Add Players for Team 2 */}
          <AddPlayers
            teamName={matchData.team2}
            onAddPlayer={handleAddPlayerToTeam2}
            teamPlayers={team2Players}
          />

          {/* Start Match Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={startMatch}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg"
            >
              Start Match
            </button>
          </div>
        </div>
      )}

      {matchStarted && (
        <Scoreboard
          team1={matchData.team1}
          team2={matchData.team2}
          totalOvers={matchData.overs}
          team1Players={team1Players}
          team2Players={team2Players}
        />
      )}
    </div>
  );
}

export default App;
