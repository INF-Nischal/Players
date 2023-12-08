import { useState, useEffect } from "react";
import axios from "axios";

const PlayerDetails = () => {
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/players/users");
      setPlayers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleClick = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/players/delete/${id.toString()}`
      );
      fetch();
      fetchPlayers();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3">
      {players &&
        players.map((player) => {
          return (
            <div key={player._id} className="flex p-3">
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
  );
};

export default PlayerDetails;
