import {Link} from 'react-router-dom'

const Navbar = ({isAuthenticated, setIsAuthenticated}) => {

  const handleLogout = (e) => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  }

  return (
    <nav className="navbar">
      <Link to="/">
      <h1>Product Search</h1>
      </Link>
      <div className="links">
        {isAuthenticated && (
          <div>
            <Link to="/add-product">Add Product</Link>
            <span>{JSON.parse(localStorage.getItem("user")).username}</span>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
 
export default Navbar;