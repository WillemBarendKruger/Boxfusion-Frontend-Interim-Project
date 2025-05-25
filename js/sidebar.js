const showSidebar = () => {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.display = (sidebar.style.display === "none" || sidebar.style.display === "") ? "block" : "none";
}

const hideUserList = () => {
    const userlist = document.getElementById("main-chat");
    userlist.style.display = userlist.style.display === "flex" ? "none" : "flex";
}
