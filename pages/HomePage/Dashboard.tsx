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
            {/* <div className="hourglassBackground">
                <div className="hourglassContainer">
                    <div className="hourglassCurves"></div>
                    <div className="hourglassCapTop"></div>
                    <div className="hourglassGlassTop"></div>
                    <div className="hourglassSand"></div>
                    <div className="hourglassSandStream"></div>
                    <div className="hourglassCapBottom"></div>
                    <div className="hourglassGlass"></div>
                </div>
            </div> */}
            <header className="header">
                <div className="leftsection">
                    <div className="menu-icon">
                        <img src="icons/hamburger-menu.svg" alt="" />
                    </div>
                    <img className="logo" src="icons/logo.png" alt="" />
                    <div className="title">
                        <button data-text="Awesome" className="button">
                            <span className="actual-text">&nbsp;Classroom&nbsp;</span>
                            <span className="hover-text" aria-hidden="true"
                            >&nbsp;Classroom&nbsp;</span
                            >
                        </button>
                        {/* <p>Classroom</p> */}
                    </div>
                </div>
                <div className="rightsection">
                    <img src="icons/unnamed.png" alt="" />
                </div>
            </header>
            <nav className="sidebar">
                <div className="link">
                    <img src="icons/home.png" alt="" />
                    <p>Home</p>
                </div>
                <div className="link">
                    <img src="icons/calender.png" alt="" />
                    <p>Calender</p>
                </div>
                <div className="link">
                    <img src="icons/settings.png" alt="" />
                    <p>Settings</p>
                </div>
                <div className="logout" onClick={performLogout}>
                    <img src="icons/logout.png" alt="" />
                    <p>Logout</p>
                </div>
            </nav>

            <main className="classes">
                <div className="card">
                    <div className="card-image">
                        <img src="img/math-class.png" alt="" />
                    </div>
                    <div className="card-title">Mathematics 5</div>
                    <div className="card-details">Dr &#183; Khaled El-Helow</div>
                    <div className="card-tooltip">
                        <div className="card-tooltip-child">
                            <div className="img">&#127891;</div>
                            <div className="label">67</div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-image">
                        <img src="img/english.jpg" alt="" />
                    </div>
                    <div className="card-title">English 102</div>
                    <div className="card-details">Dr &#183; Magda Yousef</div>
                    <div className="card-tooltip">
                        <div className="card-tooltip-child">
                            <div className="img">&#127891;</div>
                            <div className="label">132</div>
                        </div>
                    </div>
                </div>
            </main>
        </div >
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
