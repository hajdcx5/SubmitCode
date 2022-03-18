//thư mục này là nx cái gi dùng nh thì vứt zo :v

const getStatusFromLocalStorage = () => {
  const status = localStorage.getItem("status");
  if (status) return JSON.parse(status);
  return [];
};

const setStatusToLocalStorage = (data) => {
  localStorage.setItem("status", JSON.stringify(data));
  console.log("setStatusToLocalStorage");
};

const getSubmitHistoryFromLocalStorage = () => {
  const submitHistory = localStorage.getItem("submitHistory");
  if (submitHistory) return JSON.parse(submitHistory);
  return [];
};

const setSubmitHistoryToLocalStorage = (data) => {
  localStorage.setItem("submitHistory", JSON.stringify(data));
  console.log("setSubmitHistoryToLocalStorage");
};

let getStatus = (id, status_update_url, exerciseId) => {
  fetch(status_update_url, {
    headers: {
      "content-type": "application/json",
      "client-secret": "c46c668727fa9699add74779f97f239f5239ff32",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // Code Compile Successful => Get Output
      if (data.request_status.code === "REQUEST_COMPLETED") {
        getOutput(data.result.run_status.output, id, exerciseId);
      } else if (
        // Code Compile Successful => Get Error
        data.request_status.code === "CODE_COMPILED" && // 2 là nó bị lỗi
        data.result.compile_status != "OK"
      ) {
        // console.log(data.result.compile_status);
        updateStatus(id, "CE");
      } else {
        // Code Compiling
        console.log("Call Status :", data);
        getStatus(id, status_update_url, exerciseId);
      }
    })
    .catch((error) => console.log(error));
};

let getOutput = (outputUrl, id, exerciseId) => {
  fetch(outputUrl) // call xong r no tra minh 1 cai link ket qua , minh lay result tu link ket qua
    .then((res) => res.text())
    .then((data) => {
      const exercise = DATA.find((item) => item.id == exerciseId); //tim dc bai do trong mảng data để compare kết quả
      const output = data.split("\n").join("");
      const ACouput = exercise.out.replace(/\n/gm, "\r\n");
      console.log(output);
      console.log(ACouput);
      if (output == ACouput) updateStatus(id, "AC");
      else updateStatus(id, "WA");
    });
};

const updateStatus = (id, result) => {
  let submitHistory = getSubmitHistoryFromLocalStorage();
  for (let x of submitHistory) {
    if (x.id == id) {
      x.output = result;
      break;
    }
  }
  let status = getStatusFromLocalStorage();
  for (let i = 0; i < status.length; ++i) {
    if (status[i].id == id) {
      status.splice(i, 1);
      break;
    }
  }
  setStatusToLocalStorage(status);
  setSubmitHistoryToLocalStorage(submitHistory); 
  document.querySelector(`[id='${id}']`).innerHTML = result; 
};

