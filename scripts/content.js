(async () => {
  const res = await chrome.runtime.sendMessage("value");

  const article = document.querySelector("article");
  if (article) {
    article.innerText = res;
  }
})();
