import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const PlayerDetails = () => {
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/players/users");
      setPlayers(response.data.users);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleClick = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/players/delete/${id.toString()}`
      );
      fetchPlayers();
      toast.success("Player deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="px-8 py-4">
      <h1 className="text-3xl">List of Players</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {players &&
          players.map((player) => {
            return (
              <div key={player._id} className="flex py-3">
                <div>
                  <img src={player.image} alt={player.name} />
                </div>

                <div className="ml-2">
                  <h3>{player.name}</h3>
                  <p>{player.age}</p>
                  <p>{player.position}</p>
                  <p>Gender: {player.gender}</p>
                  <p>{player.description}</p>
                  <button
                    onClick={() => handleClick(player._id)}
                    className="bg-red-500 text-white mt-3 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlayerDetails;
