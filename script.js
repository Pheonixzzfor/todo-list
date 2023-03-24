// const $title = document.querySelector('.titleInput')
// const $description = document.querySelector('.description')
// const $addBtn = document.querySelector('.addBtn')
// const $container = document.querySelector('.toDos')

// $addBtn.addEventListener('click', () => {
//     if (isValidated($title) && isValidated($description)) {

//         $container.innerHTML = cardTemplate($title, $description) + $container.innerHTML

//         $title.value = ''
//         $description.value = ''
//     }
// })

// function cardTemplate(title, description) {
//     const isLongText = description.value > 350
//     return `
//     <div class="toDoCard">
//         <h2>${title.value}</h2>

//         <div class="content">
//             <div class="${isLongText ? 'shorten' : 'descriptionContainer'}">
//             <p>${description.value}</p>
//             </div>

//             <p>${currentDate()}</p> 
//         </div>    
//         <div class="forButtons">
//         <button class="complete">Complete</button>
//         <button class="delete">Delete</button>
//         <button class="edit">Edit</button>
//         </div>
//     </div>`
//  }

//  function isValidated(element) {
//     if (!element.value) {
//         element.classList.add('error')

//         element.focus()
//         return false
//     }
//     element.classList.remove('error')
//     return true
//  }


// function isValidated(element) {
//     if (!$title.value) {
//         $title.classList.add('error')

//         element.focus()

//         return false
//     }

//     $title.classList.remove('error')
//     if (!$description.value) {
//         $description.classList.add('error')

//         return false
//     }

//     $description.classList.remove('error')
//     return true

// }



// =================



// function currentDate() {
//     return new Date().toLocaleString()
// }

// ====================================





const $title = document.querySelector('.titleInput')
const $description = document.querySelector('.description')
const $addBtn = document.querySelector('.addBtn')
const $container = document.querySelector('.todos')
const $categorySelect = document.querySelector('.categorySelect')
const $selectForChoosing = document.querySelector('.selectForChoosing')
const $categoryFilterSelect = document.querySelector('.selectForChoosing')

// Load todos from local storage
window.addEventListener('load', () => {
  const todos = getTodos()

  todos.reverse().forEach(todo => {
    $container.insertAdjacentHTML('beforeend', cardTemplate(todo))
  })
})

// Load categories from LS
window.addEventListener('load', () => {
  const categories = getCategories()

  categories.forEach(category => {
    $categorySelect.insertAdjacentHTML('beforeend', categoryTemplate(category))
    $categoryFilterSelect.insertAdjacentHTML('beforeend', categoryTemplate(category))
  })
})

$addBtn.addEventListener('click', () => {
  if (isValidated($title) && isValidated($categorySelect) && isValidated($description)) {
    createTodo({ 
      title: $title.value, 
      description: $description.value, 
      category: $categorySelect.value 
    })
  }
})




function cardTemplate(todo) {
  const {
    title,
    description,
    id,
    completed,
    createdAt,
    editedAt,
    category,
  } = todo

  const categories = getCategories()

  const foundCategory = categories.find(ctg => ctg.id === +category)

  const isLongText = description.length > 350

  return `
    <div class="todoCard ${completed ? 'completed' : ''}">
      <h2>${title}</h2>

      ${
        foundCategory ? `<p>Категория: <strong style="text-decoration: underline; cursor: pointer" onclick ="openCategoryCRUDModal(${category})">${foundCategory.title}</strong></p>` : ''
      }

      <div class="content">
        <div class="${isLongText ? 'shorten' : 'descriptionContainer'}">
          <p>${description}</p>
        </div>

        <p class="dates">
          <span>${createdAt}</span>
          ${
            editedAt ? `<span>Edited at: ${editedAt}</span>` : ''
          }
        </p>
      </div>

      <div>
        <button class="complete" onclick="completeTodo(${id})">Complete</button>
        <button class="delete" onclick="deleteTodo(${id})">Delete</button>
        <button class="edit" onclick="editTodo(${id})">Edit</button>
      </div>
    </div>
  `
}

function categoryTemplate(category) {
  const {
    id,
    title
  } = category

  return `
    <option value="${id}">
      ${title}
    </option>
  `
}

// ============== filtres
$categoryFilterSelect.addEventListener('change', e => {
  const categoryId = e.target.value
  const todos = getTodos()
  $container.innerHTML =''

  if (!categoryId) { 
    filteredTodos.reverse().forEach(todo => {
      $container.insertAdjacentHTML('beforeend', cardTemplate(todo))
    })
  }
    const filteredTodos = todos.filter(todo => todo.category ===categoryId)

    filteredTodos.reverse().forEach(todo => {
      $container.insertAdjacentHTML('beforeend', cardTemplate(todo))
    })
}) 





// untities ========================


function isValidated(element) {
        if (!$title.value) {
            $title.classList.add('error')
    
            element.focus()
    
            return false
        }
    
        $title.classList.remove('error')
        if (!$description.value) {
            $description.classList.add('error')
    
            return false
        }
    
        $description.classList.remove('error')
        return true
    
    }

    function createTodo({ title, description, category }) {
      const currentTodos = getTodos()
    
      const todo = {
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
        createdAt: currentDate(),
        editedAt: null,
        category,
      }
    
      setTodos([...currentTodos, todo])
    
      $container.insertAdjacentHTML('afterbegin', cardTemplate(todo))
    
      resetFields()
    }

function deleteTodo(id) {
  const confirmDelete = confirm('Are you sure?')

  if (!confirmDelete) return

  const updatedTodos = getTodos().filter(todo => todo.id !== id)

  setTodos(updatedTodos)

  reloadPage()
}

function completeTodo(id) {
  const updatedTodos = getTodos().map(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed
    }

    return todo
  })

  setTodos(updatedTodos)

  reloadPage()
}

function editTodo(id) {
  const updatedTodos = getTodos().map(todo => {
    if (todo.id === id) {
      todo.title = prompt('Title', todo.title) || todo.title
      todo.description = prompt('Description', todo.description) || todo.description
      todo.editedAt = currentDate()
    }

    return todo
  })

  setTodos(updatedTodos)

  reloadPage()
}



function resetFields() {
  $title.value = ''
  $description.value = ''
  $categorySelect.value = ''
}


// Current date function

function currentDate() {
  return new Date().toLocaleString()
}


// Id Generator
function generateId() {
  const todos = getTodos()
  const maxID = todos.reduce((acc, todo) => todo.id > acc ? todo.id : acc, 0)

  return maxID + 1
}

// Get todos function

function getTodos() {
  return JSON.parse(localStorage.getItem('todos')) || []
}

// Set todo function

function setTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// Reload page function

function reloadPage() {
  window.location.reload()
}

// $selectForChoosing = category

// console.dir($categorySelect);
