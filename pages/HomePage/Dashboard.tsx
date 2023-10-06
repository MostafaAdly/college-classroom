import React from "react";
import { fetchGraphQL } from '../../services/GraphQL.services'
import ClassroomCard from '../../components/ClassroomCard';
import { useRouter } from "next/navigation";

export default function Dashboard({ user }: { user: any }) {
    const router = useRouter();

    const performLogout = () => {
        router.push("/logout");
    }

    return (
        <div>
            <nav className="main-menu">
                <ul>
                    <li>
                        <a href="#">
                            <i className="fa fa-home nav-icon"></i>
                            <span className="nav-text">Home</span>
                        </a>
                    </li>

                    <li>
                        <a href="#">
                            <i className="fa fa-image nav-icon"></i>
                            <span className="nav-text">Gallery</span>
                        </a>
                    </li>

                    <li>
                        <a href="#">
                            <i className="fa fa-pen nav-icon"></i>
                            <span className="nav-text">Blog</span>
                        </a>
                    </li>

                    <li>
                        <a href="#">
                            <i className="fa fa-envelope nav-icon"></i>
                            <span className="nav-text">Messages</span>
                        </a>
                    </li>

                    <li>
                        <a href="#">
                            <i className="fa fa-bell nav-icon"></i>
                            <span className="nav-text">Notification</span>
                        </a>
                    </li>

                </ul>

                <ul className="logout">
                    <li>
                        <a href="#">
                            <i className="fa fa-cogs nav-icon"></i>
                            <span className="nav-text">Settings</span>
                        </a>
                    </li>

                    <li>
                        <a href="#">
                            <i className="fa fa-right-from-bracket nav-icon"></i>
                            <span className="nav-text" onClick={performLogout}>
                                Logout
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>


            <div className="container">
                <div className="blob-c">
                    <div className="blob"></div>
                    <div className="blob one"></div>
                    <div className="blob two"></div>
                    <div className="blob three"></div>
                    <div className="blob four"></div>
                    <div className="blob five"></div>
                    <div className="blob six"></div>
                    <div className="blob seven"></div>
                </div>

                <section>
                    {user.classes?.map((classroom: any) => (
                        <ClassroomCard key={classroom.id} id={classroom.id} name={classroom.name} description={classroom.id} image={"https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/ef19280b-4fd3-4fdd-9798-1ec22d8ab4b8"} />
                    ))}
                </section>
            </div>

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
