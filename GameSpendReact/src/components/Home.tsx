import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the type for the game object
interface Game {
    id: number;
    name: string;
    price: number;
    genre: string;
    releaseDate: string;
}

const Home: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const navigate = useNavigate();

    const fetchGames = async () => {
        try {
            const response = await fetch('http://localhost:5239/games');
            if (response.ok) {
                const data: Game[] = await response.json();
                setGames(data); // Update local state with fetched games
            } else {
                console.error('Failed to fetch games');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5239/games/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Remove deleted game from local state
                setGames(games.filter(game => game.id !== id));
                console.log(`Game with id ${id} deleted successfully`);
            } else {
                console.error('Failed to delete game');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const editGame = (id: number) => {
        navigate(`/edit-game/${id}`);
    };

    return (
        <div>
            {/* <button className="btn btn-primary mb-3" onClick={addGame}>Add Game</button> */}
            <table className="table table-striped table-bordered table-hover mt-3 m-3">
                <thead className="table-dark">
                    <tr>
                        <th>Game</th>
                        <th>Price</th>
                        <th>Genre</th>
                        <th>Release Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>{game.name}</td>
                            <td>${game.price}</td>
                            <td>{game.genre}</td>
                            <td>{new Date(game.releaseDate).toLocaleDateString()}</td>
                            <td>
                                <button 
                                    type="button" 
                                    onClick={() => editGame(game.id)} 
                                    className="btn btn-success">
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button 
                                    type="button" 
                                    onClick={() => handleDelete(game.id)} 
                                    className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
