import { useState } from 'react';
import axios from 'axios';
import './App.css';
function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', { name, email, password });
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                name,
                email,
                password
            }, {
                withCredentials: true 
            });

            console.log('Response:', response.data);

        } catch (error) {
            // Log errors if any
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <form className='container' onSubmit={handleSubmit}>
                <div className='header'>
                    <h1>Registration Form</h1>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder='Enter your name'
                        value={name} // Bind value to state
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder='Enter your email'
                        value={email} // Bind value to state
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Enter your password'
                        value={password} // Bind value to state
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default App;
