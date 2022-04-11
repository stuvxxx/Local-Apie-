const uList = document.getElementById("ul-list")
const input = document.getElementById("item-text")
const button = document.getElementById("button")
const title = document.getElementById("title")
const tri1 = document.getElementById("triangle1")
const tri2 = document.getElementById("triangle2")
const tri3 = document.getElementById("triangle3")
const aap = document.getElementById("check")
const squares = document.getElementById("squares")
let order = 0
let squareCount = 0
// GET LIST IN DOM //
getListInDom = () => {       
  getTodoList().then(x => x.map((list) => {
    // add stuff to dom//
 const square = document.createElement("div")
 squares.appendChild(square)
 square.id = "square" + list.description
  const listCont = document.createElement("li")
  uList.appendChild(listCont)
  const listItem = document.createElement("p")
      listItem.innerHTML = list.description;
      listItem.className = "listItem"
      listItem.id = list.description
  listCont.appendChild(listItem)
  const editDiv = document.createElement("div")
      editDiv.innerHTML = "edit"
      editDiv.className = "edit-div"
  listCont.appendChild(editDiv)
  const bakkieImg = document.createElement("img")
      bakkieImg.src = "93480.png"
      bakkieImg.className = "bakkie"
  listCont.appendChild(bakkieImg)
  const checkContainer = document.createElement("label")
      checkContainer.className = "check-container"
  listCont.appendChild(checkContainer)
  const checkBox = document.createElement("input")
      checkBox.type = "checkbox"
    checkContainer.appendChild(checkBox)
  const checkMark = document.createElement("span")
      checkMark.className = "checkmark"
      checkMark.id = "check"
    checkContainer.appendChild(checkMark)
    // read 'done' from api //
  if(list.done) {
      listItem.style.textDecoration = "line-through"; 
      checkBox.checked = true      
      square.style.background = "rgb(51, 119, 62)"
  }
    // check/uncheck-funtion and add changes to dom+api //
  bakkieImg.addEventListener("click", () => {
    bakkieImg.parentElement.remove()
    removeThing(list.description)
  })
  checkBox.addEventListener("change", () => {
    if(checkBox.checked) {
      listItem.style.textDecoration = "line-through";
      const square = document.getElementById("square" + list.description)
      square.style.background = "rgb(51, 119, 62)"
      list.done = true
      changeToTrue(list._id, list.description)
      order++
      console.log(order)
    } else {
      listItem.style.textDecoration = "none";
      const square = document.getElementById("square" + list.description)
      square.style.background = "rgb(128, 38, 38)"
      list.done = false
      changeToFalse(list._id, list.description)
      order++
      console.log(order)
    }
      // styling for triangles //
    switch (order) {
      case 1:
        tri1.style.borderTop = "20px solid rgb(128, 38, 38)"
        tri2.style.borderTop = "20px solid  #d9e6b6"
        tri3.style.borderTop = "20px solid rgb(50, 151, 89)"
        break;
        case 2:
        tri1.style.borderTop = "20px solid  #d9e6b6"
        tri2.style.borderTop = "20px solid rgb(50, 151, 89)"
        tri3.style.borderTop = "20px solid rgb(128, 38, 38)"
        break;
        case 3:
         tri1.style.borderTop = "20px solid rgb(50, 151, 89)"
         tri2.style.borderTop = "20px solid rgb(128, 38, 38)"
         tri3.style.borderTop = "20px solid  #d9e6b6"
        order = 0
        break;
    }
  })
    // task edit + add changes to api //
  editDiv.addEventListener("click", () => {
    console.log(list._id)
      listItem.contentEditable = true
      listItem.focus()
      listItem.addEventListener("focusout", () => {
        console.log(listItem.innerHTML)
        changeDescription(list._id, listItem.innerHTML)
        listItem.contentEditable = false
      })
  })
}))
}
// CHANGE DESRCIPTION // 
changeDescription = async(id, what) => {
  await changeValue(id, {description: what, done: false})
}
// CHANGE DONE-STATUS //
changeToTrue = async(id, what) => {
  await changeValue(id, {description: what, done: true})
}
changeToFalse = async(id, what) => {
  await changeValue(id, {description: what, done: false})
}
// ADD ITEMS TO LIST //
addItem = async(thingToDo) => {
  await postInfo({description: thingToDo, done: false})

} 
// REMOVE ITEMS FROM LIST //
removeThing = async (thing) => {
    await getTodoList().then(x => x.find((y) => {
    if (y.description === thing)  {
      deleteInfo(y._id)
    }
  }))
}

// LITTLE STYLING //
button.addEventListener("mouseover", () => {
    title.style.textShadow = "#FC0 1px 0 10px";
})
button.addEventListener("mouseleave", () => {
  title.style.textShadow = "none";
})
// ADD TO API //
button.addEventListener("click", () => {
  if(input.value == "") {
    alert("Empty tasks are great but useless in a todo-list!")
  } else {
   const newTask = input.value;
addItem(newTask)
  while (uList.firstChild) {
      uList.removeChild(uList.firstChild);
  }
  while (squares.firstChild) {
    squares.removeChild(squares.firstChild);
}
  getListInDom()
}})
// FINAL LOAD // 
getListInDom()



