import {useState} from 'react'

const Signupform = ({signupFunc}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleSignup = (event) => {
        event.preventDefault()
        signupFunc({username, password, name})
        setUsername('')
        setPassword('')
        setName('')
    }

    return (
        <form onSubmit={handleSignup}>
            <div>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name"
                    value={name} 
                    onChange={({target}) => setName(target.value)} 
                    required
                />
            </div>
            <div>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username"
                    value={username} 
                    onChange={({target}) => setUsername(target.value)} 
                    required
                />
            </div>
            <div>
                <input 
                    type="password" 
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={({target}) => setPassword(target.value)} 
                    required
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default Signupform