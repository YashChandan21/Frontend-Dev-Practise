
document.addEventListener('DOMContentLoaded', () =>{
    const navbarMenu = document.querySelector(".navbar-menu")
    const navbarToggle = document.querySelector(".navbar-toggle")

    navbarToggle.addEventListener("click", ()=>{
        navbarMenu.classList.toggle("active");
    });

    // close the menu when clicking outside
    document.addEventListener("click", (e)=>{
        const isClickInsideMenu = navbarMenu.contains(e.target);
        const isClickOnToggle = navbarToggle.contains(e.target);

        if(!isClickInsideMenu && !isClickOnToggle && navbarMenu.classList.contains("active")){
            navbarMenu.classList.remove("active");
        } 
    });

    // close the menu when window is resized to larger menu
    window.addEventListener("resize", ()=>{
        if(window.innerWidth > 768 && navbarMenu.classList.contains("active")){
            navbarMenu.classList.remove("active");
        }
    });
})