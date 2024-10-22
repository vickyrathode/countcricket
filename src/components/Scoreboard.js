import { useState } from 'react';

const Scoreboard = ({ team1, team2, totalOvers, team1Players = [], team2Players = [] }) => {
  const [team1Score, setTeam1Score] = useState({ runs: 0, wickets: 0, overs: 0, balls: 0 });
  const [team2Score, setTeam2Score] = useState({ runs: 0, wickets: 0, overs: 0, balls: 0 });
  const [team1Batting, setTeam1Batting] = useState(true); // Track which team is batting
  const [matchOver, setMatchOver] = useState(false);
  const [winner, setWinner] = useState(null); // Track the match winner

  // Ensure maxWickets are calculated based on the players passed
  const maxWicketsTeam1 = team1Players.length > 0 ? team1Players.length - 1 : 0; // Team 1 can lose all players but 1
  const maxWicketsTeam2 = team2Players.length > 0 ? team2Players.length - 1 : 0; // Team 2 can lose all players but 1

  // Function to handle score updates
  const handleScoreUpdate = (team, run, ballType) => {
    if (team === 'team1' && team1Batting) {
      updateScore(setTeam1Score, team1Score, run, ballType, maxWicketsTeam1);
    } else if (team === 'team2' && !team1Batting) {
      // Prevent updating Team 2's score if they've already beaten Team 1
      if (team2Score.runs <= team1Score.runs) {
        updateScore(setTeam2Score, team2Score, run, ballType, maxWicketsTeam2);
      }
    }
  };

  const updateScore = (setScore, score, run, ballType, maxWickets) => {
    let newScore = { ...score };

    if (ballType === 'wide' || ballType === 'no ball') {
      newScore.runs += 1; // Extras don't count as a legal ball but add 1 run
    } else if (ballType === 'wicket') {
      newScore.wickets += 1;
      if (newScore.wickets >= maxWickets) {
        changeBatting();
        return; // Stop if all wickets are down
      }
    } else if (run !== null) {
      newScore.runs += run;
    }

    // Increment ball count, check for over completion
    if (ballType !== 'wide' && ballType !== 'no ball') {
      newScore.balls += 1;
      if (newScore.balls === 6) {
        newScore.overs += 1;
        newScore.balls = 0;
      }

      // Check if overs are completed
      if (newScore.overs === totalOvers) {
        changeBatting();
        return;
      }
    }

    // Check if Team 2 exceeds Team 1's score
    if (!team1Batting && newScore.runs > team1Score.runs) {
      endMatch('Team 2');
      return;
    }

    setScore(newScore);
  };

  const changeBatting = () => {
    if (team1Batting) {
      setTeam1Batting(false); // Switch to Team 2 batting
    } else {
      endMatch(); // End the match when both teams have batted
    }
  };

  const endMatch = (winningTeam = null) => {
    setMatchOver(true);
    if (winningTeam) {
      setWinner(winningTeam);
      return;
    }
    // Determine winner if no early termination
    if (team1Score.runs > team2Score.runs) {
      setWinner(team1);
    } else if (team2Score.runs > team1Score.runs) {
      setWinner(team2);
    } else {
      setWinner('Draw');
    }
  };

  // Display Score for Each Team
  const renderScore = (teamScore) => {
    return `${teamScore.runs}/${teamScore.wickets} (${teamScore.overs}.${teamScore.balls})`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-6">
      {!matchOver ? (
        <>
          {/* Teams Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-xl font-bold">{team1}</div>
            <div className="text-lg">vs</div>
            <div className="text-xl font-bold">{team2}</div>
          </div>

          {/* Score Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Team 1 Score */}
            <div className="bg-gray-100 p-4 rounded-lg shadow text-center">
              <h2 className="text-2xl font-semibold mb-2">{team1}</h2>
              <p className="text-3xl font-bold text-green-600">{renderScore(team1Score)}</p>
            </div>

            {/* Team 2 Score */}
            <div className="bg-gray-100 p-4 rounded-lg shadow text-center">
              <h2 className="text-2xl font-semibold mb-2">{team2}</h2>
              <p className="text-3xl font-bold text-red-600">{renderScore(team2Score)}</p>
            </div>
          </div>

          {/* Controls for Current Batting Team */}
          {team1Batting ? (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">{team1} Controls</h3>
              <ScoreControls team="team1" onScoreUpdate={handleScoreUpdate} />
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">{team2} Controls</h3>
              <ScoreControls team="team2" onScoreUpdate={handleScoreUpdate} />
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Match Over!</h2>
          {winner !== 'Draw' ? (
            <p className="text-xl font-semibold">{winner} Wins the Match!</p>
          ) : (
            <p className="text-xl font-semibold">It's a Draw!</p>
          )}
        </div>
      )}
    </div>
  );
};

// Score controls for runs, wickets, and extras (3x3 matrix layout)
const ScoreControls = ({ team, onScoreUpdate }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <button
        onClick={() => onScoreUpdate(team, 1, 'run')}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        1 Run
      </button>
      <button
        onClick={() => onScoreUpdate(team, 2, 'run')}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        2 Runs
      </button>
      <button
        onClick={() => onScoreUpdate(team, 3, 'run')}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        3 Runs
      </button>
      <button
        onClick={() => onScoreUpdate(team, 4, 'run')}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        4 Runs
      </button>
      <button
        onClick={() => onScoreUpdate(team, null, 'dot')}
        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
      >
        Dot Ball
      </button>
      <button
        onClick={() => onScoreUpdate(team, 6, 'run')}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        6 Runs
      </button>
      <button
        onClick={() => onScoreUpdate(team, null, 'wide')}
        className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600"
      >
        Wide Ball
      </button>
      <button
        onClick={() => onScoreUpdate(team, null, 'no ball')}
        className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
      >
        No Ball
      </button>
      <button
        onClick={() => onScoreUpdate(team, null, 'wicket')}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
      >
        Wicket
      </button>
    </div>
  );
};

export default Scoreboard;
