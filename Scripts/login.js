const domLoad = () => {
    const errorText = document.getElementById("error-text");
    errorText.classList.add("hidden");
}

const login = () => {
    const errorText = document.getElementById("error-text");
    if (errorText.classList.contains("block")) {
        errorText.classList.replace("block", "hidden");
    }
    else {
        errorText.classList.add("hidden");
    }
    const username = document.getElementById("usernameInput");
    const password = document.getElementById("passwordInput");
    if (username.value === "admin" && password.value === "admin123") {
        window.location.assign("./main.html");
    }
    else {
        errorText.classList.replace("hidden", "block");
    }
}