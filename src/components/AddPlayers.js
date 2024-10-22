import { useState } from 'react';

const AddPlayers = ({ teamName, onAddPlayer, teamPlayers }) => {
  const [playerName, setPlayerName] = useState('');
  const [playerRole, setPlayerRole] = useState('Batsman');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlayer = {
      name: playerName,
      role: playerRole,
    };
    onAddPlayer(newPlayer);
    setPlayerName('');
    setPlayerRole('Batsman');
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mb-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Players for {teamName}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Player Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <select
          value={playerRole}
          onChange={(e) => setPlayerRole(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="All-rounder">All-rounder</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Player
        </button>
      </form>

      {/* Display added players */}
      <ul className="mt-4 space-y-2">
        {teamPlayers.map((player, index) => (
          <li key={index} className="p-2 border rounded">
            {player.name} - {player.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddPlayers;
