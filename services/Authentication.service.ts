const checkAndCreateCredentials = async (username: string, email: string, password: string): Promise<object> => {
    return await (await fetch(`http://localhost:3000/api/v1/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            register: {
                username, email, password
            }
        })
    })).json()
}

const performLogin = async (email: string, password: string): Promise<object> => {
    return await (await fetch(`http://localhost:3000/api/v1/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            login: {
                email, password
            }
        })
    })).json()
}

export {
    checkAndCreateCredentials, performLogin
}
