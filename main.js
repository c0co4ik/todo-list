const form = document.querySelector('#addForm');
const list = document.querySelector("#items");
const filter = document.querySelector('#filter')

form.addEventListener('submit', addTask);
filter.addEventListener('keyup', searchTask);

function addTask(e){  // Функция на добовлениие задачи
  e.preventDefault();
  const newItemInput = document.querySelector("#newItemText");
  const newItemText = newItemInput.value;

  if(!newItemText) return alert('Введите задачу'); // Проверка на то что бы поле инпута не было пустым.

  const newItem = document.createElement('li');
  newItem.classList.add("list-group-item");
  newItem.innerHTML = `
                        ${newItemText}
                          <button
                            data-action="delete"
                            type="button"
                            class="btn btn-light btn-sm float-right"
                          >
                          Удалить
                          </button>`;
  list.prepend(newItem);
  newItemInput.value = '';
  init();  // Что бы все задачи которые мы добавляем, мы смогли удалять
};

function deleteTask(e){      // Функция на удаление задачи из списка
  const child = e.target;
  const parent = child.closest(".list-group-item"); // находим ближайшего родителя

  if(confirm("Удалить задачу?")){
    parent.remove();
  }
}

function init(){   // Функция, что бы нашим задачам автоматически добавлялся обработчик события на удаление
  const btnsDelete = document.querySelectorAll('[data-action="delete"]');
  btnsDelete.forEach((el) => {
    el.addEventListener("click", deleteTask);
  });
}

function searchTask(e){ // Функция для поиска задачи
  const searchedText = e.target.value.toLowerCase();
  const items = list.querySelectorAll(".list-group-item");

  items.forEach((el)=>{
    const itemText = el.firstChild.textContent.toLowerCase();
    if(itemText.indexOf(searchedText) != -1){
      el.style.display = 'block'
    }
    else{
      el.style.display = "none";
    }
  })
}

init();   // Что бы все начальные задачи мы смогли удалять