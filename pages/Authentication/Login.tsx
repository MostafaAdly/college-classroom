import React from "react";
import { useRouter } from "next/navigation";
import { Alert } from "../../components/Alert";
import { alertService } from "../../services/alert.service";
import { performLogin } from "../../services/Authentication.service";
// import Head from 'next/head'

export default function Login() {
    const router = useRouter();

    const routeToRegister = () => {
        router.push("/register");
    };

    const checkCredentials = (event: any) => {
        event.preventDefault();
        const email = event.target.emailInput.value,
            password = event.target.passwordInput.value;
        console.log(email, password);
        performLogin(email, password).then((data: any) => {
            if (data.error)
                return alertService.error(data.error, {
                    autoClose: true,
                    keepAfterRouteChange: false,
                });
            else router.push("/dashboard");
        });
    };

    return (
        <>
            <div className="login-form-wrapper">
                <h1>
                    Log In
                </h1>
                <div className="form-body">
                    <form name="auth-form" onSubmit={checkCredentials}>
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
}

export async function getServerSideProps(ctx: any) {
    return {
        props: ctx.query,
    };
}
