import "../styles/LoginPage.css"

const LoginPage = () => {
  return (
    <main className="LoginPage-container">
        <header className="welcome-text">
            <h1>WELCOME BACK!</h1>
        </header>
        <section className="log-or-sign">
            <form method="get">
                <div className="email-phone">
                    <label htmlFor="email_or_phone">Email or Phone:</label>
                        <input className="custom-input" type="text" name="email_or_phone" id="email_or_phone" placeholder="Email or Phone number" pattern="^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|([0-9]{10,15})$" autoComplete="on" required autoFocus/>
                </div>
                    <div className="password">
                        <label htmlFor="password">Password:</label>
                            <input className="custom-input" type="password" name="password" id="password" minLength="8" required />
                    </div>
                <div className="forgot-pass">
                    <p>Forgot Password?</p>
                </div>
                    <div className="login-btn-container">
                        <button className="login-btn" type="submit">Log in</button>
                    </div>
                <div className="create-acc-container">
                    <button type="button" className="create-acc-btn">Create account</button>
                </div>
                <div className="divider">
                    <span>or continue with</span>
                </div>
                <div className="google-container">
                    <p>Google</p>
                </div>
            </form>
        </section>
    </main>
  )
}

export default LoginPage