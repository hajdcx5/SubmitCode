const Sum = (data) => {
  for (let x of data) {
  x.SumSubmited = localStorage.getItem(`${x.title}`).length-1
}}
Sum(DATA)

const render = (data) => {
  let listEx = document.querySelector('.list-ex-wrapper')
  listEx.innerHTML = "";
  for (let x of data) {
    listEx.innerHTML += `
    <a href="./solution/?id=${x.id}" class="list-ex-content">
        <div class="sth-content title-ex">${x.title}</div>
        <div class="sth-content level-ex-ct">${x.level}</div>
        <div class="sth-content Sent-ex">${x.SumSubmited}</div> 
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




