const reflectValue = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab[0].id },
      files: ["scripts/content.js"],
    });
  });
};

const reflectButton = document.getElementById("reflect_button");
reflectButton.addEventListener("click", reflectValue);

const textarea = document.querySelector("textarea");
textarea.addEventListener("input", reflectValue);

chrome.commands.onCommand.addListener((command) => {
  if (command === "reflect-value") {
    reflectValue();
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message === "value") {
    sendResponse(textarea.value);
  }
});
