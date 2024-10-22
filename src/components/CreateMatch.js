import { useState } from 'react';

const CreateMatch = ({ onCreateMatch }) => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [overs, setOvers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (team1 && team2 && overs > 0) {
      onCreateMatch({ team1, team2, overs: parseInt(overs, 10) });
    }
  };

  return (
    <div className="p-6 bg-gray-100 shadow-lg rounded-lg mt-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create Match</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Team 1 Name"
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Team 2 Name"
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          placeholder="Total Overs"
          value={overs}
          onChange={(e) => setOvers(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
          min="1"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Create Match
        </button>
      </form>
    </div>
  );
};

export default CreateMatch;
