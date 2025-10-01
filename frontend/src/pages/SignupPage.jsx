import useField from '../hooks/useField'
import useSignup from '../hooks/useSignup'
import {useState} from 'react'
import {useNavigate} from "react-router-dom"

const Signup = ({setIsAuthenticated}) => {
    const navigate = useNavigate();
    const name = useField("text")
    const username = useField("text")
    const password = useField("password")
    const [role, setRole] = useState("Seller")
    const bio = useField("text")

    const {signup, error} = useSignup("/api/users/signup");

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        await signup({
            username: username.value,
            password: password.value,
            name: name.value,
            role,
            bio: bio.value
        });

        if (!error) {
            console.log("success!");
            setIsAuthenticated(true)
            navigate("/")
        }
    };

    return (  
        <div className="create">
            <h2>Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
            <label>Name:</label>
            <input {...name} />
            <label>Username:</label>
            <input {...username} />
            <label>Password:</label>
            <input {...password} />
            <label>Role:</label>
            <select onChange = {(e) => setRole(e.target.value)}>
                <option value="Seller">Seller</option>
                <option value="Buyer">Buyer</option>
                <option value="Admin">Admin</option>
            </select>
            <label>Bio:</label>
            <textarea {...bio} />
            
            <button>Sign up</button>
            </form>
        </div>
    )
}

export default Signup