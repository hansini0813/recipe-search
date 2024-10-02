import { GoogleLogin } from '@react-oauth/google';

const clientId = "1074901770611-lgodugpovkdhl9n0dqfrtht2rgj30jgq.apps.googleusercontent.com";

function Login(){
    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }

    return(
        <div id="signInButton">
            <GoogleLogin
                clientId = {clientId}
                buttonText = "Login"
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy = {'single_host_origin'}
                isSignedIn= {true}
            />

        </div>
    )
}

export default Login