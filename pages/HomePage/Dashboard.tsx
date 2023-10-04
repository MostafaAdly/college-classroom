import React from "react";
import { fetchGraphQL } from '../../services/GraphQL.services'
import ClassroomCard from '../../components/ClassroomCard';

export default function Dashboard({ user }: { user: any }) {
    return (
        <div>
            <link href="https://assets.website-files.com/645128e3dbdad55ed2803eff/css/dashflowtemplate.webflow.bd0dc503c.css" rel="stylesheet" type="text/css" />
            {user.classes.map((classroom: any) => (
                <div key={classroom.id}>
                    <ClassroomCard id={classroom.id} name={classroom.name} image={""} />
                </div>
            ))}
        </div>
    );
};

export async function getServerSideProps(ctx: any) {
    const user = ((await fetchGraphQL(
        `
            {
                user(id: "${ctx.query.id}"){
                    id
                    username
                    credentials {
                        email
                    }
                    classes {
                        id
                        name
                    }
                }
            }
            `
    )) as any)?.data?.user;
    return {
        props: {
            user
        },
    };
}
