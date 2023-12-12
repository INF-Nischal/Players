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
      <h1 className="text-3xl mb-3">List of Players</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {players &&
          players.map((player) => {
            return (
              <div key={player._id} className="bg-gray-200 p-5 h-[300px]">
                <div className="flex">
                  <div className="h-full w-[30%] border-2 border-sky-500">
                    <img
                      src={player.image.url}
                      alt={player.name}
                      className="h-full w-full object-cover border-2"
                    />
                  </div>

                  <div className="ml-2 w-[76%]">
                    <span className="flex">
                      Name:<p className="ml-3">{player.name}</p>
                    </span>
                    <span className="flex">
                      Age: <p className="ml-3">{player.age}</p>{" "}
                    </span>
                    <span className="flex">
                      Position: <p className="ml-3">{player.position}</p>{" "}
                    </span>
                    <span className="flex">
                      Gender: <p className="ml-3">{player.gender}</p>{" "}
                    </span>
                    <span className="h-[100px] flex flex-col">
                      <span className="flex-shrink-0">Description:</span>
                      <p className="flex-shrink overflow-ellipsis overflow-hidden text-justify">
                        {player.description}
                      </p>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleClick(player._id)}
                  className="bg-red-500 text-white mt-5 px-4 py-2 rounded-lg mx-auto block"
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlayerDetails;
