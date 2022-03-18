let bodycontent = document.getElementById("body-content");
for (let x of DATA) {
    bodycontent.innerHTML += `
<a href="./solution/?id=${x.id}" class="list-ex-content">
    <div class="sth-content title-ex">${x.title}</div>
    <div class="sth-content level-ex-ct">${x.level}</div>
    <div class="sth-content Sent-ex">${x.SumSubmited}</div> 
</a>
`
}





