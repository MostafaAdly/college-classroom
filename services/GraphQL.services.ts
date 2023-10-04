
const fetchGraphQL = async (query: any): Promise<object> => {
    return (await (await fetch('http://localhost:3000/api/v1/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    })).json())
}

export {
    fetchGraphQL
}