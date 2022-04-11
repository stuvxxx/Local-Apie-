const url = "http://localhost:3000/";
const urlDel = "http://localhost:3000/";
const headerPara = {headers: {
    "content-type":"application/json"
}}


//FETCH INFO//
async function fetchInfo() {
  const res = await fetch(url, headerPara);
  return res
  }  
async function getTodoList() {
  const response = await fetchInfo()
  const data = await response.json();
  return data
} 
//POST INFO//
async function postInfo(data) {
   await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type":"application/json"
  }},
  );
}
//DELETE INFO//
async function deleteInfo(id) {
  squares.removeChild(squares.lastChild);
    await fetch(urlDel + id, {
     method: "DELETE",
     headers: {
       "content-type":"application/json"
   }},
   );
 }
 //PUT INFO//
async function changeValue(id, data) {
  await fetch(url + id, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "content-type":"application/json"
    }
  })
}

