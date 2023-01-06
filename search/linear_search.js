async function linearSearch() {
  const bar = document.querySelectorAll(".bar");
  for (let i = 0; i < bar.length; i++) {
    bar[i].style.background = "green";
    if (bar[i].id == selectedBar.id) {
      break;
    }
    await waitforme(delay);
    bar[i].style.background = "black";
  }
}

const linSearch = document.querySelector(".linearSearch");
linSearch.addEventListener("click", async function () {
  disableSize();
  disableNewArray();
  await linearSearch();
  enableSize();
  enableNewArray();
});
