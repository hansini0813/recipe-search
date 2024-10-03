import { GoogleLogin } from '@react-oauth/google';
import { useUser } from '../UserContext'; // Import useUser hook

const clientId = "1074901770611-lgodugpovkdhl9n0dqfrtht2rgj30jgq.apps.googleusercontent.com";

function Login(){
    const { setUser } = useUser(); // Get the setUser function from context

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