import React, { useState, useEffect } from "react";
import { fetchGraphQL } from '../../services/GraphQL.services'
    
export default function Dashboard({ user }: {user: any}) {
    const [data, setData] = useState({})

    useEffect(() =>  {
        fetchGraphQL(
            `
            {
                user(id: "${user.id}"){
                    username
                    classes {
                        id
                        name
                    }
                }
            }
            `
        ).then((data) => {
            setData(data);
        })
    }, [])

    return (
        <div>
            Hello, This is the Dashboard
            { JSON.stringify(data) }
        </div>
    );
};

export async function getServerSideProps(ctx: any) {
    return {
        props: {
            user: ctx.query
        },
    };
}
