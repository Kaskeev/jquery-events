// ! CRUD - create, read, update, delete

let imagesData = [];

let addFormBtn = $("#add-form-btn");
let addFormInp = $("#add-form-inp");
let imagesList = $("#images-list");
let editForm = $(".edit-form");
let btnCloseModal = $("#btn-close-modal");
let editFormInp = $("#edit-form-inp");
let editFormInpId = $("#edit-form-inp-id");
let editFormSaveBtn = $("#edit-form-btn");

function addNewImage() {
  if (addFormInp.val().trim() == "") {
    alert("Заполните поля!");
    return;
  }
  let newImage = {
    imageURL: addFormInp.val(),
    id: Date.now(),
  };
  imagesData.push(newImage);
  render();
  //   console.log(imagesData);
  //   console.log(newImage);
  //   console.log(Date.now());
}
addFormBtn.on("click", addNewImage);

// console.log(Date.now());
// setTimeout(() => {
//   console.log(Date.now());
// }, 1000);
function render() {
  imagesList.empty();
  imagesData.forEach((item) => {
    imagesList.append(`
        <div id=${item.id} class="image-card">
          <img width="200px" src=${item.imageURL}/>
          <button class="btn-delete">Delete</button>
          <button class="btn-edit">Edit</button>
        </div>`);
  });
}
function deleteImage(id) {
  imagesData = imagesData.filter((item) => item.id != id);
  render();
}
// "2" === 2;
$(document).on("click", ".btn-delete", function (e) {
  let id = e.target.parentNode.id;
  deleteImage(id);
});

function getEditElem(id) {
  let editElem = imagesData.find((item) => item.id == id);
  // console.log(editElem);
  editFormInp.val(editElem.imageURL);
  editFormInpId.val(editElem.id);
}
$(document).on("click", ".btn-edit", function (e) {
  let id = e.target.parentNode.id;
  getEditElem(id);
  // console.log(id);
  editForm.css("display", "flex");
});
btnCloseModal.on("click", function () {
  editForm.css("display", "none");
});

editFormSaveBtn.on("click", function () {
  let id = editFormInpId.val();
  let imageURL = editFormInp.val();
  // console.log(imageURL);
  let editedImage = {
    id,
    imageURL,
  };
  imagesData = imagesData.map((item) => {
    if (item.id == id) {
      return editedImage;
    } else {
      return item;
    }
  });
  render();
  editForm.css("display", "none");
});

// в инпуты из формочки для редактирования добавить соответствующие значения - id, imageURL
// добавить событие на кнопку из формочки для редактирования, которая будет сохранять изменения
// как эти изменения сохранить? перебрать массив, в котором хранятся все элементы с помощью метода массива и если найдем совпадение, то заменить этот объект на измененный и вызвать функцию для отображения данных
