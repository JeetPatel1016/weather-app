//Get Modal
const modal = document.getElementById("modal");
//Get logo button to trigger
const button = document.getElementById("logo-btn");

button.addEventListener("click", () => {
    modal.style.display = "block";
});

modal.addEventListener("click", () => {
    modal.style.display = "none";
});
