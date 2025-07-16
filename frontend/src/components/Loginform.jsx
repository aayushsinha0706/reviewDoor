import {useState} from 'react'

const Loginform = ({
    loginFunc
}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        loginFunc({username, password})
        setUsername('')
        setPassword('')
    }
    return (
        <form onSubmit={handleLogin}>
            <div>
                <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    onChange={({target}) => setUsername(target.value)}
                    required 
                />
            </div>
            <div>
                <input 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={({target}) => setPassword(target.value)} 
                    required
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default Loginform