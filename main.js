
const render = (data) => {
  let listEx = document.querySelector(".list-ex-wrapper");
  listEx.innerHTML = "";
  for (let x of data) {
    listEx.innerHTML += `
    <a href="./solution/?id=${x.id}" class="list-ex-content">
        <div class="sth-content title-ex">${x.title}</div>
        <div class="sth-content level-ex-ct">${x.level}</div>
        <div class="sth-content sent-ex">${x.SumSubmited}</div> 
    </a>
    `;
  }
};

render(DATA);
const searchBar = document.getElementById("search-bar");

searchBar.onkeyup = () => {
  const searchValue = searchBar.value.trim().toLowerCase(); // bo khoang trong + viet thuong
  const searchResult = DATA.filter(
    (item) => item.title.trim().toLowerCase().indexOf(searchValue) != -1
  );
  render(searchResult);
};

// const Sumtest = JSON.parse(localStorage.getItem("Sumtest"));
// for (let x of Sumtest) {
//   for (let y of DATA) {
//     if (x.id == y.id) 
//     {y.SumSubmited=x.count;
//     console.log(y.SumSubmited);
//     }
//   }
// }
