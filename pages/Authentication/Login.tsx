import React from "react";
import Image from "next/image";
import logo from './images/classroom.png'

export default function Login () {
    // const 

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
                                Login
                            </h3>
                            <form action="#" className="signup-form">
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username / Email Address"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        id="password-field"
                                        type="password"
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
                                Don't have an account? 
                                <a data-toggle="tab" href="/register"
                                    > Register</a
                                >
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
