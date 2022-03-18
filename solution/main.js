import { CodeJar } from "https://medv.io/codejar/codejar.js";

const highlight = (editor) => {
  editor.textContent = editor.textContent;
  // Do something with code and set html.
  hljs.highlightElement(editor);
};

const editor = document.querySelector(".editor");

let jar = CodeJar(editor, highlight);

const url = new URLSearchParams(location.search);
const id = url.get("id");
console.log(id);
const exercise = DATA.find((item) => item.id == id);
console.log(exercise);

document.getElementById("wrapper-2").innerHTML = `<br>
<div class="title">${exercise.title}</div>
<div class="space"></div>   
<div class="ch">Đề bài</div>
<div class="content">${exercise.content}</div>
<div class="ch">Dữ liệu vào</div>
<div class="inp">${exercise.inpview}</div>
<div class="ch">Dữ liệu ra</div>
<div class="out">${exercise.outview}</div> <br><br>
`;

// Compile
let submitCode = () => {
  let data = {
    // lang: document.querySelector("[name=language]").value,
    // source: document.querySelector("#source-code").value
    lang: "CPP",
    source: jar.toString(),
    input: exercise.inp,
  };
  console.log(data);
  if (data.source == "") {
    alert("ngu");
    return 0;
  }
  // document.querySelector("#outputview").innerText = "Compiling.....";
  fetch("https://api.hackerearth.com/v4/partner/code-evaluation/submissions/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "client-secret": "c46c668727fa9699add74779f97f239f5239ff32",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Submit Code :", data); // day la phat dau submit 
      const statusURL = data.status_update_url;
      const id = new Date().getTime().toString();
      const status = getStatusFromLocalStorage();
      status[id] = statusURL;
      status.push({
        id,
        statusURL, // neu key trung voi value thi viet nhu nay
        exerciseId : exercise.id
      })
      setStatusToLocalStorage(status);
      const submitHistory = getSubmitHistoryFromLocalStorage();
      submitHistory.push({
        id: id,
        name: exercise.title, //
        output: null,
        language: "C/C++",
      });
      setSubmitHistoryToLocalStorage(submitHistory);
      location.href = '/Htsr'
      //
    })
    .catch((error) => console.log(error));
};
document.querySelector("#submit-btn").onclick = () => {
  submitCode();
  localStorage.setItem(`${exercise.title}`,localStorage.getItem(`${exercise.title}`)+1);
};


// AC: Accepted (Kết quả đúng)

// WA: Wrong Answer (Kết quả sai)

// TLE: Time Limit Exceeded (Quá giới hạn thời gian)

// MLE: Memory Limit Exceeded (Quá giới hạn bộ nhớ)

// OLE: Output Limit Exceeded (Quá giới hạn đầu ra)

// IR: Invalid Return (Trả về không hợp lệ)

// RTE: Runtime Error (Lỗi thực thi)

// CE: Compile Error (Lỗi biên dịch)
// '0 0 0 0
// 0 1 1 0
// 1 0 0 1
// 1 1 1 1 '

