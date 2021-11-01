const cityPrompt = document.getElementById("LocationPrompt");
const form = cityPrompt.nextElementSibling;

cityPrompt.addEventListener("click", () => {
    if (form.style.height == 0 || form.style.height == "0px")
        form.style.height = "fit-content";
    else form.style.height = "0px";
});
