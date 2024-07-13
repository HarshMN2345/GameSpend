import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate=useNavigate();
    const addGame = () => {
        navigate("/add-game");
    }; 
  return (
    <div>
    <nav className="navbar navbar-expand-md navbar-dark bg-body-tertiary" data-bs-theme="dark">
        <div className="container">
            <span className="navbar-brand mb-0 h1">
                GameSpend
            </span>
            <div className="col-12 col-md-8 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-danger" onClick={addGame}>
                    Add Game
                </button>
            </div>
        </div>
    </nav>
</div>

  )
}

export default Navbar