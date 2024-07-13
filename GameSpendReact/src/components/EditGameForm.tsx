import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Define the type for the game object
interface Game {
    id: number;
    name: string;
    price: number;
    genreId: number;
    releaseDate: string;
}

const EditGameForm: React.FC = () => {
    const { id } = useParams(); // Get game id from URL params
    const history = useNavigate();

    const [game, setGame] = useState<Game>({
        id: 0,
        name: '',
        price: 0,
        genreId: 0,
        releaseDate: ''
    });

    useEffect(() => {
        fetchGame();
    }, []); // Fetch game details on component mount

    const fetchGame = async () => {
        try {
            const response = await fetch(`http://localhost:5239/games/${id}`);
            if (response.ok) {
                const data: Game = await response.json();
                setGame(data); // Update local state with fetched game
            } else {
                console.error('Failed to fetch game');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setGame({ ...game, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5239/games/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(game)
            });

            if (response.ok) {
                console.log(`Game with id ${id} updated successfully`);
                history('/'); // Redirect to home page after successful update
            } else {
                console.error('Failed to update game');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Edit Game</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={game.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genreId">Genre:</label>
                    <select
                        className="form-control"
                        id="genreId"
                        name="genreId"
                        value={game.genreId}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="1">Action</option>
                        <option value="2">Role Playing</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={game.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="releaseDate">Release Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="releaseDate"
                        name="releaseDate"
                        value={game.releaseDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Game</button>
            </form>
        </div>
    );
};

export default EditGameForm;
