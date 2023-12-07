import { useState, useEffect } from "react";
import axios from "axios";

const PlayerDetails = () => {

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:5000/players/users");
      setPlayers(response.data.users);
    }

    fetch();
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3">
      {players && players.map((player) => {
        return (
          <div key={player._id} className="flex p-3">
            <div className="">
              <img src={player.image} alt={player.name} />
            </div>

            <div className="ml-2">
              <h3>{player.name}</h3>
              <p>{player.age}</p>
              <p>{player.position}</p>
              <p>{player.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default PlayerDetails;
