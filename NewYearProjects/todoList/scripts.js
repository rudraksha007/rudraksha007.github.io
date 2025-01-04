let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [];
let isPopupOpen = false;
let isEditting = false;
let isStartup = true;

let dragging = null;
let timer = null;
let suspended = null;
load();

function hookListeners() {
  for (const task of document.querySelectorAll(".task")) {
    task.addEventListener("dragstart", (e) => {
      dragging = e.currentTarget;
      dragging.style.opacity = 0.5;
    });
    task.addEventListener("dragenter", (e) => {
      e.preventDefault();
      let place = document.createElement("li");
      if (e.currentTarget === dragging || e.currentTarget === place) {
        return;
      }
      swap(dragging, e.currentTarget, place);
    });
    task.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    task.addEventListener("dragend", (e) => {
      dragging.style.opacity = 1;
    });
  }
  const privates = document.getElementById("privates");
  if (!privates.dataset.listener) {
    privates.addEventListener("click", (e) => {
      if (e.target.closest(".category")) {
        const category = e.target.closest(".category").getAttribute("category");
        handleCategoryClick(e, category);
      }
    });
    privates.dataset.listener = true;
  }
  const addCategoryButton = document.getElementById("addCategory");
  if (!addCategoryButton.dataset.listener) {
    addCategoryButton.addEventListener("click", (e) => {
      let ele = document.createElement("input");
      ele.setAttribute("type", "text");
      ele.setAttribute("placeholder", "Enter Name");
      ele.addEventListener("focusout", (e) => {
        const name = e.target.value;
        e.target.remove();
        if (name) {
          addCategory(name);
        }
      });
      document.getElementById("privates").insertBefore(ele, e.currentTarget);
      ele.focus();
    });
    addCategoryButton.dataset.listener = true;
  }
}

function handleCategoryClick(e, category) {
  const active = document.getElementById("active");
  console.log(e.target.closest(".category"), active);
  if (e.target.closest(".category") === active) {
    return;
  }
  load(category == "all" ? null : category);
  active.removeAttribute("id");
  e.target.closest(".category").id = "active";
}

/**
 * @param {HTMLElement} ele1
 * @param {HTMLElement} ele2
 */
function swap(ele1, ele2, place) {
  if (timer) {
    clearTimeout(timer);
    ele1.style.transform = `translateY(0)`;
    suspended.style.transform = `translateY(0)`;
  }
  ele1.style.transform = `translateY(${ele2.offsetTop - ele1.offsetTop}px)`;
  ele2.style.transform = `translateY(${ele1.offsetTop - ele2.offsetTop}px)`;
  suspended = ele2;
  timer = setTimeout(() => {
    timer = null;
    suspended = null;
    ele1.style.transform = `translateY(0)`;
    ele2.style.transform = `translateY(0)`;
    document.getElementById("tasks").replaceChild(place, ele2);
    document.getElementById("tasks").replaceChild(ele2, ele1);
    document.getElementById("tasks").replaceChild(ele1, place);
    if (document.getElementById("active").getAttribute("category") === "all") {
      save();
    }
  }, 250);
}

function save() {
  let x = compile();
  localStorage.setItem("tasks", x);
  localStorage.setItem("categories", JSON.stringify(categories));
  load();
}

function compile() {
  let tasksElements = document.getElementById("tasks").children;
  let tasks = [];
  for (let i = 0; i < tasksElements.length; i++) {
    let task = {};
    task.completed = tasksElements[i].children[0].checked;
    console.log(tasksElements[i].children[0].checked);

    task.title = tasksElements[i].children[1].innerHTML;
    task.isCollab =
      tasksElements[i].getAttribute("isCollab") === "true" ? true : false;
    task.description = tasksElements[i].getAttribute("desc");
    task.category = tasksElements[i].getAttribute("category");
    task.deadline = tasksElements[i].children[3].innerHTML;
    tasks.push(task);
  }
  return JSON.stringify(tasks);
}

function renderTasks(filterCategory) {
  const taskContainer = document.getElementById("tasks");
  taskContainer.innerHTML = "";

  tasks.forEach((task) => {
    if (filterCategory && task.category !== filterCategory) return;

    const taskElement = document.createElement("li");
    taskElement.className = `task ${task.completed ? "completed" : ""}`;
    taskElement.setAttribute("draggable", "true");
    taskElement.setAttribute("isCollab", task.isCollab);
    taskElement.setAttribute("desc", task.description);
    taskElement.setAttribute("category", task.category);
    taskElement.innerHTML = `
    <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTaskCompletion(this)">
      <span>${task.title}</span>
      <span><img src="assets/${
        task.isCollab ? "collab" : "profile"
      }.svg"></span>
      <span>${task.deadline || ""}</span>
    `;

    taskContainer.appendChild(taskElement);
  });
}

function toggleTaskCompletion(e) {
  console.log(e);
  const taskElement = e.closest("li");
  e.checked? taskElement.classList.add("completed"): taskElement.classList.remove("completed");
  // taskElement.classList.toggle("completed", e.checked);
  save();
}

function renderCategories() {
  const categoryContainer = document.getElementById("privates");
  const selectElement = document.getElementById("categorySelect");

  categoryContainer.innerHTML = `
    <li id="active" class="hoverable category" category="all">
      <img src="assets/all.svg" alt="">
      <p class="flex-1">All</p>
    </li>
    <li class="hoverable category" category="scheduled">
      <img src="assets/timed.svg" alt="">
      <p class="flex-1">Scheduled</p>
    </li>
    <li class="hoverable" id="addCategory">
      <img src="assets/add.svg" alt="">
      <p class="flex-1">Add</p>
    </li>
  `;

  categories.forEach((category) => {
    const categoryElement = document.createElement("li");
    categoryElement.className = "hoverable category";
    categoryElement.setAttribute("category", category);
    categoryElement.innerHTML = `
      <img src="assets/custom.svg" alt="">
      <p class="flex-1">${category}</p>
      <img src="assets/bin.svg" alt="" class="del">
    `;
    categoryContainer.insertBefore(
      categoryElement,
      document.getElementById("addCategory")
    );
  });

  selectElement.innerHTML = categories
    .map((cat) => `<option>${cat}</option>`)
    .join("");
}

function load(filterCategory) {
  renderTasks(filterCategory);
  renderCategories();
  hookListeners();
}

function addCategory(category) {
  categories.push(category);
  save();
}

document
  .getElementById("newTaskButton")
  .addEventListener("click", (e) => handleNewTaskClick(e));
document
  .getElementById("closeIcon")
  .addEventListener("click", (e) => handleNewTaskClick(e));

// const save = import('./scripts.js')

function handleNewTaskClick(e) {
  if (isPopupOpen) {
    const form = document.getElementById("newTask");
    form.style.transform = `translate(-50%,0)`;
    const formData = new FormData(document.getElementById("newTask"));
    let task = {
      isCollab: formData.get("isCollab") === "on",
      description: formData.get("description"),
      completed: formData.get("completed") === "on",
      title: formData.get("title"),
      deadline: formData.get("deadline"),
      category: formData.get("category"),
    };
    if (task.title && task.description) {
      let newTask = document.createElement("li");
      newTask.setAttribute("draggable", "true");
      newTask.setAttribute("isCollab", task.isCollab);
      newTask.setAttribute("desc", task.description);
      newTask.setAttribute("category", task.category);
      let check = document.createElement("input");
      check.setAttribute("type", "checkbox");
      check.checked = task.completed;
      check.addEventListener("change", (e) => {
        save();
      });
      newTask.appendChild(check);
      newTask.innerHTML += `
        <span>${task.title}</span>
        <span><img src='assets/${
          task.isCollab ? "collab" : "profile"
        }.svg'></span>
        <span>${task.deadline}</span>`;

      document.getElementById("tasks").appendChild(newTask);
      save();
    }
    form.reset();
    isPopupOpen = false;
  } else {
    let dist =
      e.target.getBoundingClientRect().height +
      12 +
      document.getElementById("newTask").getBoundingClientRect().height +
      15;
    document.getElementById(
      "newTask"
    ).style.transform = `translate(-50%,-${dist}px)`;
    isPopupOpen = true;
  }
}
