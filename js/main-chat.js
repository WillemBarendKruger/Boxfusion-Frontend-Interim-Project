
//NOTES
// This JavaScript function, checkUserActivity() , checks the time difference between the current time and the last active time. If the time difference is greater than 30 seconds (indicating inactivity), it sets user_active to false and logs "User is inactive" to the console.

// Paddword hashing: Web Crypto API



// check user activity
function checkUserActivity() {
    let lastActiveTime = localStorage.getItem('lastActiveTime');
    if (lastActiveTime) {
        let currentTime = new Date().getTime();
        let timeDifference = currentTime - lastActiveTime;
        if (timeDifference > 30000) { // 30 seconds
            user_active = false;
            console.log("User is inactive");
        } else {
            user_active = true;
            console.log("User is active");
        }
    }
    localStorage.setItem('lastActiveTime', new Date().getTime());
}