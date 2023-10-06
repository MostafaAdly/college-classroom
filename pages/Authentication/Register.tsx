import React from "react";
import Image from "next/image";
import logo from './images/classroom.png'
import { Alert } from '../../components/Alert'
import { alertService } from '../../services/alert.service';
import { useRouter } from 'next/navigation'
import { checkAndCreateCredentials } from "../../services/Authentication.service"


export default function Register() {
    const router = useRouter();

    const routeToLogin = () => {
        router.push('/login')
    }

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
            alertService.error("Please provide complete valid information", { autoClose: true, keepAfterRouteChange: false })
        }
    }
    return (
        <>
            <div className="login-form-wrapper">
                <h1>
                    Register
                </h1>
                <div className="form-body">
                    <form name="auth-form" onSubmit={checkPostCredentials}>
                        <div className="fieldset">
                            <input id="username" name="usernameInput" type="text" required />
                            <label htmlFor="username">
                                Username
                            </label>
                            <div className="highlighter"></div>
                        </div>
                        <div className="fieldset">
                            <input id="email" name="emailInput" type="email" required />
                            <label htmlFor="email">
                                Email
                            </label>
                            <div className="highlighter"></div>
                        </div>
                        <div className="fieldset">
                            <input id="password" name="passwordInput" type="password" required
                            />
                            <label htmlFor="password">
                                Password
                            </label>
                            <div className="highlighter"></div>
                        </div>
                        <div className="fieldset button-set">
                            <input type="submit" value="Enter" />
                        </div>
                    </form>
                </div>
            </div>
            <Alert />
        </>
    );
};

export async function getServerSideProps(ctx: any) {
    return {
        props: ctx.query,
    };
}
