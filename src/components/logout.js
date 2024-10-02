import { googleLogout } from '@react-oauth/google';

const clientId = "1074901770611-lgodugpovkdhl9n0dqfrtht2rgj30jgq.apps.googleusercontent.com";

function Logout() {
    const onSuccess = () => {
        console.log("Log out Successfull!");
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
