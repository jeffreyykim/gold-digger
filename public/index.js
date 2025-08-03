const priceDisplay = document.getElementById("price-display");
const connectionStatus = document.getElementById("connection-status");
const investmentAmount = document.getElementById("investment-amount");
const investBtn = document.getElementById("invest-btn");
const dialog = document.querySelector("dialog");
const investmentSummary = document.getElementById("investment-summary");

let currentGoldPrice = 2045.5;

function updateGoldPrice() {
  const priceChange = (Math.random() - 0.5) * 10;
  currentGoldPrice += priceChange;

  currentGoldPrice = Math.max(1800, Math.min(2500, currentGoldPrice));

  priceDisplay.textContent = currentGoldPrice.toFixed(2);

  const isConnected = Math.random() > 0.05;
  if (isConnected) {
    connectionStatus.textContent = "Live Price 🟢";
    connectionStatus.className = "status";
  } else {
    connectionStatus.textContent = "Reconnecting... 🟡";
    connectionStatus.className = "status reconnecting";
  }
}

function handleInvestment(event) {
  event.preventDefault();

  const amount = parseFloat(investmentAmount.value);
  if (!amount || amount <= 0) {
    alert("Please enter a valid investment amount");
    return;
  }

  const ouncesOwned = (amount / currentGoldPrice).toFixed(3);

  const investmentData = {
    date: new Date().toISOString().split("T")[0],
    amountInvested: amount,
    amountPaid: amount,
    pricePerOz: currentGoldPrice,
    goldSold: parseFloat(ouncesOwned),
  };

  fetch("/api/invest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(investmentData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Investment recorded successfully:", data);

        investmentSummary.textContent = `You just bought ${ouncesOwned} ounces (ozt) for $${amount.toFixed(
          2
        )}. Transaction ID: ${
          data.transactionId
        }. You will receive documentation shortly.`;

        dialog.showModal();
        investmentAmount.value = "";
      } else {
        alert("Failed to record investment: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error recording investment:", error);
      alert("Failed to record investment. Please try again.");
    });
}

function closeDialog() {
  dialog.close();
}

investBtn.addEventListener("click", handleInvestment);
dialog.querySelector("button").addEventListener("click", closeDialog);

document.addEventListener("DOMContentLoaded", function () {
  updateGoldPrice();

  setInterval(() => {
    updateGoldPrice();
  }, Math.random() * 3000 + 2000);
});

window.updateGoldPrice = updateGoldPrice;
