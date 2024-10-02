import { googleLogout } from '@react-oauth/google';
import { useUser } from '../UserContext'; // Import useUser hook


const clientId = "1074901770611-lgodugpovkdhl9n0dqfrtht2rgj30jgq.apps.googleusercontent.com";

function Logout() {

    const { setUser } = useUser(); // Get the setUser function from context

    const onSuccess = () => {
        console.log("Log out Successfull!");
        setUser(null); // Clear user data from context
    }

    return(
        <div id= "signOutButton">
            <googleLogout
                clientId = {clientId}
                buttonText = {"Logout"}
                onLogoutSuccess = {onSuccess}
            />
        </div>
    )
}

export default Logout
