// ^ select
var contactImage = document.querySelector("#contactImage");
var inputImage = document.querySelector("#inputImage");
var fullName = document.querySelector("#fullName");
var phoneNumber = document.querySelector("#phoneNumber");
var email = document.querySelector("#email");
var address = document.querySelector("#address");
var group = document.querySelector("#group");
var notes = document.querySelector("#notes");
var favoriteCheckbox = document.querySelector("#favoriteCheckbox");
var emergencyCheckbox = document.querySelector("#emergencyCheckbox");
var btnSaveContact = document.querySelector("#btnSaveContact");
var xBtn = document.querySelector("#xBtn");
var btnCancel = document.querySelector("#btnCancel");
var searchResults = document.querySelector("#searchResults");
var searchInput = document.querySelector("#searchInput");
var favoriteResult = document.querySelector("#favoriteResult");
var emergencyResult = document.querySelector("#emergencyResult");
var TotalContacts = document.querySelector("#TotalContacts");
var TotalContacts2 = document.querySelector("#TotalContacts2");
var totalEmergency = document.querySelector("#totalEmergency");
var totalFavorites = document.querySelector("#totalFavorites");
var addBtn = document.querySelector("#addBtn");
var regex = {
  fullName: { exp: /^\s*[a-zA-Z][a-zA-Z ]{0,48}[a-zA-Z]\s*$/, isValid: false },
  phoneNumber: {
    exp: /^(002|2|20|\+2|\+20)?01[0125][0-9]{8}$/,
    isValid: false,
  },
  email: {
    exp: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
    isValid: true,
  },
};

//* bootstrap so you can close form
const modalElement = document.getElementById("staticBackdrop");
const modal = new bootstrap.Modal(modalElement);

//* list of all contacts
var contactList = [];

//* special lists
var favoriteList = [];
var emergencyList = [];

//* index of contact to update
var updateIndex;

//* flag to indicate user clicked addbtn or edit icon
var addNewItemFlag;

//* restore contacts from localStorage
if (localStorage.getItem("contactList")) {
  contactList = JSON.parse(localStorage.getItem("contactList"));
  displayContacts(contactList);
}

function storeInLocalStorage() {
  localStorage.setItem("contactList", JSON.stringify(contactList));
}

// ^  events

// ^ addBtn event
addBtn.addEventListener("click", function () {
  addNewItemFlag = true;

  //* insert new contact so all regex flag are reset
  setIsvalidRegex(false);
});

//^ diplay the input photo in form whenever user change it
inputImage.addEventListener("change", function () {
  updateImageInForm(
    inputImage.files[0] ? `images/${inputImage.files[0]?.name}` : false
  );
});

// ^ fullName change event
fullName.addEventListener("input", function () {
  validateInputs(fullName);
});
// ^ phoneNumber change event
phoneNumber.addEventListener("input", function () {
  validateInputs(phoneNumber);
});
// ^ email change event
email.addEventListener("input", function () {
  validateInputs(email);
});

// ^ btnSaveContact event
btnSaveContact.addEventListener("click", function () {
  var alertflag = inputsAlert();
  if (alertflag) {
    SaveContact();
    displayContacts(contactList);
    updateInputs();
    storeInLocalStorage();
    modal.hide();
    if (addNewItemFlag) {
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Contact has been added successfully.",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Contact has been updated successfully.",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }
});
// ^ btnCancel event
btnCancel.addEventListener("click", function () {
  updateInputs();
  modal.hide();
});
// ^ xBtn event
xBtn.addEventListener("click", function () {
  updateInputs();
  modal.hide();
});
// ^ searchInput event
searchInput.addEventListener("input", function () {
  searchContact();
});

function SaveContact() {
  //^ add new item or update an existing item
  if (addNewItemFlag) {
    addNewContact();
  } else {
    updateContact();
  }
}
//^ display Contacts
//& the flag is to ensure that displaying the search results will
//& not update favoriteList and emergencyList
function displayContacts(list, searchflag) {
  cartona = "";
  if (!searchflag) {
    favoriteList = [];
    emergencyList = [];
  }
  if (list.length === 0) {
    cartona = `<div class="no-results">
                  <!-- contact icon -->
                  <div
                    class="m-auto contact-icon d-flex justify-content-center align-items-center"
                  >
                    <i class="fa-solid fa-address-book fa-2x text-gray-300"></i>
                  </div>
                  <span class="d-block mt-3 text-center text-gray-500 fw-bold"
                    >No contacts found</span
                  >
                  <span class="d-block text-center text-gray-400"
                    >Click "Add Contact" to get started</span
                  >
                </div>`;
  }
  for (var i = 0; i < list.length; i++) {
    if (!searchflag) {
      if (list[i].favoriteCheckbox) {
        favoriteList.push(list[i]);
      }
      if (list[i].emergencyCheckbox) {
        emergencyList.push(list[i]);
      }
    }

    cartona += `<div class="col-md-6">
                  <div class="shadow-sm contact-item">
                    <div class="px-3 pt-3 pb-2 bg-white">
                      <!--^ contact-item__header -->
                      <div
                        class="contact-item__header d-flex align-items-center gap-3"
                      >
                        <div
                          class="flex-shrink-0 contact-item__header-icon position-relative text-white d-flex justify-content-center align-items-center"
                        >
                        ${
                          list[i].imageSrc
                            ? `<img
                              src="${list[i].imageSrc}"
                              class="w-100 rounded-12px"
                              alt="${list[i].fullName}"
                            />`
                            : `<span class="fs-5 fw-bold">${list[i].fullName
                                .at(0)
                                ?.toUpperCase()}</span>`
                        }
                          ${
                            list[i].favoriteCheckbox
                              ? `<!--^ favorite icon shown when added to favorite -->
                          <div
                            class="icon-badge border border-2 border-white position-absolute star-position rounded-circle bg-amber-400 d-flex justify-content-center align-items-center"
                          >
                            <i class="fa-solid fa-star text-white fa-2xs"></i>
                          </div>`
                              : ""
                          }
                          ${
                            list[i].emergencyCheckbox
                              ? `<!--^ emergency icon shown when added to emergency -->
                          <div
                            class="icon-badge border border-2 border-white position-absolute heart-position rounded-circle bg-rose-500 d-flex justify-content-center align-items-center"
                          >
                            <i
                              class="fa-solid fa-heart-pulse text-white fa-2xs"
                            ></i>
                          </div>`
                              : ""
                          }
                        </div>
                        <div class="contact-item__header-info min-width-0">
                          <span class="fw-bold truncate-ch d-block">${
                            list[i].fullName
                          }</span>
                          <div
                            class="mt-1 d-flex flex-nowrap align-items-center gap-2"
                          >
                            <div
                              class="call-icon d-flex justify-content-center align-items-center"
                            >
                              <i
                                class="fa-solid fa-phone fa-2xs text-blue-600"
                              ></i>
                            </div>
                            <span class="text-gray-500 truncate-ch"
                              >${list[i].phoneNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                      <!--^ contact-item__body -->
                      <div class="contact-item__body mt-3">
                       ${
                         list[i].email
                           ? ` <!-- email -->
                        <div class="d-flex align-items-center gap-2 mb-2">
                          <div
                            class="email size d-flex justify-content-center align-items-center"
                          >
                            <i
                              class="fa-solid fa-envelope fa-xs text-violet-600"
                            ></i>
                          </div>
                          <span class="text-gray-600 truncate-ch"
                            >${list[i].email}</span
                          > </div>`
                           : ""
                       }
                        
                       ${
                         list[i].address
                           ? ` <!-- address -->
                        <div class="d-flex align-items-center gap-2">
                          <div
                            class="address size d-flex justify-content-center align-items-center"
                          >
                            <i
                              class="fa-solid fa-location-dot fa-xs text-emerald-600"
                            ></i>
                          </div>
                          <span class="text-gray-600 truncate-ch"
                            >${list[i].address}</span
                          >
                        </div>`
                           : ""
                       }
                        <div class="mt-3">

                          ${
                            list[i].group != "Select"
                              ? ` <span
                            class="me-1  d-inline-block py-1 fs-12px fw-semibold px-2 rounded-3 bg-amber-100 text-amber-700"
                          >
                            ${list[i].group}
                          </span>`
                              : ""
                          }

                          ${
                            list[i].emergencyCheckbox
                              ? `<span
                            class="d-inline-block py-1 text-rose-600 fs-12px fw-semibold px-2 rounded-3 bg-rose-50"
                          >
                            <i class="fa-solid fa-heart-pulse fa-sm"></i>
                            <span>Emergency</span>
                          </span>`
                              : ""
                          }
                        </div>
                      </div>
                    </div>
                    <!--^ contact-item__footer -->
                    <div
                      class="contact-item__footer d-flex justify-content-between"
                    >
                      <!--^ call number or send email -->
                      <div class="d-flex gap-2">
                        <!-- call number  -->

                        <a
                          href="tel:${list[i].phoneNumber}"
                          class="text-decoration-none call-number footer__icon bg-emerald-50 d-flex justify-content-center align-items-center"
                        >
                          <i class="fa-solid fa-phone text-emerald-600"></i>
                        </a>
                      ${
                        list[i].email
                          ? `
                        <!-- send email  -->
                        <a
                          href="mailto:${list[i].email}"
                          class="text-decoration-none footer__icon send-email text-violet-600 bg-violet-50 d-flex justify-content-center align-items-center"
                        >
                          <i class="fa-solid fa-envelope"></i>
                        </a>`
                          : ""
                      }
                      
                      </div>
                      <!--^ edit -->
                      <div class="edit">
                        <div class="d-flex gap-2">
                          <!-- add-to-favorite -->
                          <button
                          onclick="toggleSpecial(${true},${list[i].id})"
                            class="add-to-favorite ${
                              list[i].favoriteCheckbox
                                ? "favorite-icon-clicked"
                                : "favorite-icon-not-clicked"
                            } border-0 footer__icon d-flex justify-content-center align-items-center"
                          >
                            <i class="fa-${
                              list[i].favoriteCheckbox ? "solid" : "regular"
                            } fa-star"></i>
                          </button>
                          <!-- add-to-emergency -->
                          <button
                            onclick="toggleSpecial(${false},${list[i].id})"
                            class="add-to-emergency ${
                              list[i].emergencyCheckbox
                                ? "emergency-icon-clicked"
                                : "emergency-icon-not-clicked"
                            } border-0 footer__icon d-flex justify-content-center align-items-center"
                          >
                          ${
                            list[i].emergencyCheckbox
                              ? '<i class="fa-solid fa-heart-pulse"></i>'
                              : ' <i class="fa-regular fa-heart"></i>'
                          }
                           
                          </button>
                          <!-- edit-contact -->
                          <button
                          onclick="getelementsToEdit(${list[i].id})"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                            class="edit-contact text-gray-400 bg-gray-50 border-0 footer__icon d-flex justify-content-center align-items-center"
                          >
                            <i class="fa-solid fa-pen"></i>
                          </button>
                          <!-- delete -->
                          <button
                          onclick="deleteContact(${list[i].id})"
                            class="delete-contact text-gray-400 bg-gray-50 border-0 footer__icon d-flex justify-content-center align-items-center"
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
  }
  searchResults.innerHTML = cartona;

  //^ display favorite
  displaySpecialList(true);

  //^ display emergency
  displaySpecialList(false);

  //^ update Total Numbers
  updateTotalNumbers();
}

function getIndexFromId(id) {
  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].id === id) {
      return i;
    }
  }
  return -1;
}

//* if element in special list (favorite or emergency) it will remove
//* if element NOT in special list (favorite or emergency) it will add
function toggleSpecial(isFavorite, id) {
  var index = getIndexFromId(id);
  if (isFavorite) {
    contactList[index].favoriteCheckbox = !contactList[index].favoriteCheckbox;
  } else {
    contactList[index].emergencyCheckbox =
      !contactList[index].emergencyCheckbox;
  }
  storeInLocalStorage();
  displayContacts(contactList);
}

// ^ delete Contact
function deleteContact(id) {
  var index = getIndexFromId(id);

  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contactList[index].fullName}? This action cannot be undone.`,
    icon: "warning",
    showConfirmButton: false,
    showDenyButton: true,
    showCancelButton: true,
    denyButtonText: `Yes, delete it!`,
  }).then((result) => {
    if (result.isDenied) {
      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
        timer: 1000,
        timerProgressBar: false,
        showConfirmButton: false,
      });
      //^delete contact
      contactList.splice(index, 1);

      displayContacts(contactList);
      storeInLocalStorage();
    }
  });
}

function addNewContact() {
  var newcontact = {
    id: contactList.length ? contactList.at(-1).id + 1 : 0,
    imageSrc: inputImage.files[0] ? `images/${inputImage.files[0]?.name}` : 0,
    fullName: fullName.value.trim(),
    phoneNumber: phoneNumber.value,
    email: email.value.trim(),
    address: address.value.trim(),
    group: group.value,
    notes: notes.value.trim(),
    favoriteCheckbox: favoriteCheckbox.checked,
    emergencyCheckbox: emergencyCheckbox.checked,
  };
  contactList.push(newcontact);
}
function updateInputs(config) {
  //* if not set to null last inserted image will be
  //* always there and when add new contact it will be added to it
  inputImage.value = null;

  if (config) {
    updateImageInForm(config.imageSrc);
  } else {
    updateImageInForm();
  }

  fullName.value = config ? config.fullName : null;
  phoneNumber.value = config ? config.phoneNumber : null;
  email.value = config ? config.email : null;
  address.value = config ? config.address : null;
  group.value = config ? config.group : "Select";
  notes.value = config ? config.notes : null;
  favoriteCheckbox.checked = config ? config.favoriteCheckbox : false;
  emergencyCheckbox.checked = config ? config.emergencyCheckbox : false;
}

function getelementsToEdit(id) {
  //* set regex isvalid to true ,since it's edit so all inputs are initially true unless user changed in inputs
  //* as we aleady checked it in add new item
  setIsvalidRegex(true);

  addNewItemFlag = false;
  var index = getIndexFromId(id);
  updateIndex = index;
  updateInputs(contactList[index]);
}

function updateContact() {
  //* inputImage is input of type file and can't be set when getting values to update (we clear in updateInputs)
  //* so in updateContact you can't get the src of image from inputImage since it's cleared
  // * but luckly we have the src of the img in child of contactImage that in the form
  if (contactImage.children[0].tagName === "IMG") {
    contactList[updateIndex].imageSrc =
      contactImage.children[0].getAttribute("src");
  } else {
    contactList[updateIndex].imageSrc = 0;
  }

  //!not working if user wanna remove the pic
  // contactList[updateIndex].imageSrc = inputImage.files[0]
  //   ? `images/${inputImage.files[0]?.name}`
  //   : contactList[updateIndex].imageSrc;

  contactList[updateIndex].fullName = fullName.value.trim();
  contactList[updateIndex].phoneNumber = phoneNumber.value;
  contactList[updateIndex].email = email.value.trim();
  contactList[updateIndex].address = address.value.trim();
  contactList[updateIndex].group = group.value;
  contactList[updateIndex].notes = notes.value.trim();
  contactList[updateIndex].favoriteCheckbox = favoriteCheckbox.checked;
  contactList[updateIndex].emergencyCheckbox = emergencyCheckbox.checked;
}

function displaySpecialList(favoriteFlag) {
  var list = favoriteFlag ? favoriteList : emergencyList;
  cartona = "";
  if (list.length === 0) {
    cartona = ` <div
                      class="marked-body__content d-flex align-items-center justify-content-center"
                    >
                      <span class="fs-6 text-gray-400"
                        >No ${
                          favoriteFlag ? "favorite" : "emergency"
                        } contacts</span
                      >
                    </div>`;
  }
  for (let i = 0; i < list.length; i++) {
    cartona += ` <!--  ${favoriteFlag ? "favorite-item" : "emergency-item"}  -->
                    <div class="col-12 col-md-6 col-xl-12">
                      <a
                        href="tel:${list[i].phoneNumber}"
                        class="${
                          favoriteFlag ? "favorite-item" : "emergency-item"
                        } p-2 border rounded-12px text-decoration-none d-flex justify-content-between gap-3 align-items-center"
                      > 
                        <!-- left side  -->
                        <div class="min-width-0 d-flex align-items-center gap-1">
                          <div
                            class="flex-shrink-0 sidebar-item__info rounded-3 bg-blue-600  d-flex justify-content-center align-items-center"
                          >
                            ${
                              list[i].imageSrc
                                ? `<img
                              src="${list[i].imageSrc}"
                              class="w-100 rounded-3"
                              alt="${list[i].fullName}"
                            />`
                                : `<span class="small fw-bold text-white">${list[
                                    i
                                  ].fullName
                                    .at(0)
                                    ?.toUpperCase()}</span>`
                            }
                          </div>
                          <div class="min-width-0">
                            <span
                              class="text-gray-900 fs-12px truncate-ch d-block fw-semibold"
                              >${list[i].fullName}</span
                            >
                            <span class="fs-10px text-gray-400 d-block"
                              >${list[i].phoneNumber}</span
                            >
                          </div>
                        </div>
                         <!-- right side  -->
                        <div
                          class="flex-shrink-0 sidebar-call-icon text-emerald-600 bg-emerald-100 d-flex justify-content-center align-items-center"
                        >
                          <i class="fa-solid fa-phone fa-2xs"></i>
                        </div>
                      </a>
                    </div>`;
  }

  if (favoriteFlag) {
    favoriteResult.innerHTML = cartona;
  } else {
    emergencyResult.innerHTML = cartona;
  }
}

function updateTotalNumbers() {
  totalEmergency.innerText = emergencyList.length;
  totalFavorites.innerText = favoriteList.length;
  TotalContacts.innerText = contactList.length;
  TotalContacts2.innerText = contactList.length;
}

function updateImageInForm(source) {
  if (source) {
    contactImage.innerHTML = `<img
                              src="${source}"
                              class="w-100"
                              alt="contact image"
                            />`;
  } else {
    contactImage.innerHTML = ` <i class="fa-solid fa-user fa-2xl"></i>`;
  }
}

function searchContact() {
  text = searchInput.value.toLowerCase();
  var resultList = [];
  for (let i = 0; i < contactList.length; i++) {
    var contact = contactList[i];
    if (
      contact.fullName.toLowerCase().includes(text) ||
      contact.phoneNumber.includes(text) ||
      contact.email.toLowerCase().includes(text)
    ) {
      resultList.push(contact);
    }
  }
  displayContacts(resultList, true);
}

function validateInputs(element) {
  if (element.value == "") {
    //* email is also valid if empty since it's not required
    regex[element.id].isValid = element.id === "email";

    element.classList.remove("border-color-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else if (regex[element.id].exp.test(element.value)) {
    regex[element.id].isValid = true;
    element.classList.remove("border-color-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    regex[element.id].isValid = false;
    element.classList.add("border-color-invalid");
    element.nextElementSibling.classList.remove("d-none");
  }
}

function inputsAlert() {
  var Duplicate = isDuplicateNumber();
  var isAlert = false;
  var alertTitle = "";
  var alertText = "";

  if (fullName.value == "") {
    isAlert = true;
    alertTitle = "Missing Name";
    alertText = "Please enter a name for the contact!";
  } else if (!regex.fullName.isValid) {
    isAlert = true;
    alertTitle = "Invalid Name";
    alertText = "Name should contain only letters and spaces (2-50 characters)";
  } else if (phoneNumber.value == "") {
    isAlert = true;
    alertTitle = "Missing Phone";
    alertText = "Please enter a phone number!";
  } else if (!regex.phoneNumber.isValid) {
    isAlert = true;
    alertTitle = "Invalid Phone";
    alertText =
      "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)";
  } else if (Duplicate) {
    isAlert = true;
    alertTitle = "Duplicate Phone Number";
    alertText = `A contact with this phone number already exists: ${Duplicate}`;
  } else if (!regex.email.isValid) {
    isAlert = true;
    alertTitle = "Invalid Email";
    alertText = "Please enter a valid email address";
  }
  if (isAlert) {
    Swal.fire({
      title: alertTitle,
      text: alertText,
      icon: "error",
      target: modalElement,
    });
    return false;
  } else {
    return true;
  }
}
function isDuplicateNumber() {
  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].phoneNumber === phoneNumber.value) {
      //* incase of add new contact if duplication was found it will return true
      //* incase of edit ,current contact shoulded be considered as duplication and look for other duplicate
      if (!(!addNewItemFlag && i === updateIndex)) {
        return contactList[i].fullName;
      }
    }
  }
  return false;
}
function setIsvalidRegex(flag) {
  regex.fullName.isValid = flag;
  regex.phoneNumber.isValid = flag;
  regex.email.isValid = true;
}
