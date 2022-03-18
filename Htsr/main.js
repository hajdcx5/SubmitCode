// camg lam cang thay lang nhang =))
const submitHistory = getSubmitHistoryFromLocalStorage();
// cu in di, ti nua co :))
for (let x of submitHistory) {
  if (x.output == null) {
    document.getElementById("body-content").innerHTML += `
    <div class="list-ex-content">
        <div class="sth-content title-ex">${x.name}</div>
        <div class="sth-content level-ex-ct" id="${x.id}">
            <lottie-player id="loading" src="https://assets10.lottiefiles.com/packages/lf20_58vkk48j.json"  background="transparent"  speed="1" loop autoplay></lottie-player>
        </div>
        <div class="sth-content sent-ex">${x.language}</div>
    </div>
    `;
  } else {
    document.getElementById("body-content").innerHTML += `
        <div class="list-ex-content">
            <div class="sth-content">${x.name}</div>
            <div class="sth-content level-ex-ct ${x.output}" >
               ${x.output}
            </div>
            <div class="sth-content">${x.language}</div>
        </div> 
        `;
  }
}

const status = getStatusFromLocalStorage()
for(let x of status) {
    getStatus(x.id,x.statusURL,x.exerciseId)
}
