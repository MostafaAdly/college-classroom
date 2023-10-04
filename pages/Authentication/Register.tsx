import React from "react";
import Image from "next/image";
import logo from './images/classroom.png'
import {Alert} from '../../components/Alert'
import { alertService } from '../../services/alert.service';
import { useRouter } from 'next/navigation'
import {checkAndCreateCredentials} from "../../services/Authentication.service"


export default function Register() {
    const router = useRouter();

    const checkPostCredentials = (event: any) => {
        event.preventDefault();
        const username = event.target.usernameInput.value, password = event.target.passwordInput.value, email = event.target.emailInput.value;
        if (username != "" && password != "" && email != "") {
             checkAndCreateCredentials(username, email, password).then((data: any) => {
                if (data.error)
                    alertService.error(data.error, { autoClose: true, keepAfterRouteChange: false })
                else {
                    router.push('/dashboard')
                }
            })
        } else {
            alertService.error("Please provide complete valid information", {autoClose: true, keepAfterRouteChange: false})
        }
    }

    return (

        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h1 className="heading-section"
                            // style="font-weight: 700"
                        >
                            Classroom
                        </h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-5">
                        <div className="login-wrap">
                            <div
                                className="img"
                            >
                                <Image className="img justify-content-center" src={logo} alt="Classroom"/>
                            </div>
                            <h3
                                className="text-center mb-4"
                                // style="font-weight: 500"
                            >
                                Register
                            </h3>
                            <Alert />
                            <form action="#" className="signup-form" onSubmit={checkPostCredentials}>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        name="usernameInput"
                                        className="form-control"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="email"
                                        name="emailInput"
                                        className="form-control"
                                        placeholder="Email Address"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="password"
                                        id="password-field"
                                        name="passwordInput"
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                    <span
                                        // toggle="#password-field"
                                        className="fa fa-fw fa-eye field-icon toggle-password"
                                    ></span>
                                </div>
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        className="form-control btn btn-primary submit px-3"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </form>
                            <p>
                                Already got an account? 
                                <a data-toggle="tab" href="/login"
                                    > Login</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export async function getServerSideProps(ctx: any) {
    return {
        props: ctx.query,
    };
}
