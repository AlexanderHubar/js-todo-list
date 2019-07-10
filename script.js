class TodoList {
  constructor () {
    this.data = JSON.parse(window.localStorage.getItem('todo')) || []
  }

  build () {
    this.render()
  }

  syncLocalStorage () {
    window.localStorage.setItem('todo', JSON.stringify(this.data))
  }

  render () {
    const main = document.querySelector('main')
    main.innerHTML = `
      <div class="container">
            <form id="addTodoForm">
                <div class="input-field col s12">
                  <input id="addTodo" type="text">
                  <label for="addTodo">Todo</label>
                </div>
            </form>
            <ul class="collection todos">
                 <li class="collection-item"><div>Todo is done<div class="secondary-content"><span class="new badge" data-badge-caption="">${
                    this.data.reduce((doneTodo, todo) => {
                      if (todo.isDone) {
                        return doneTodo += 1
                      } else {
                        return doneTodo
                      }
                    }, 0)
                 }</span></div></div></li>
                 ${this.data.map(el => `
                    <li class="collection-item todo">
                        <div>
                          ${el.todo}
                          <p>
                            <label>
                              <input type="checkbox" id="${el.id}" ${el.isDone && 'checked="checked'}"/>
                              <span>${el.isDone ? 'Un Dry' : 'Dry'}</span>
                            </label>
                          </p>
                        </div>  
                        <div class="secondaryContent">
                            <i id="${el.id}" class="small material-icons">delete</i>
                        </div>
                    </li>
                 `).join('')}
            </ul>
      </div>
    `
    const addTodoForm = document.querySelector('#addTodoForm')
    addTodoForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const inputData = document.getElementById('addTodo')
      this.data.push({
        id: this.data.length + 1,
        todo: inputData.value,
        isDone: false
      })
      this.syncLocalStorage()
      this.render()
    })

    const todoList = document.querySelector('.todos')
    todoList.addEventListener('click', (e) => {
      if (e.target.tagName === 'INPUT') {
        const checkedId = +e.target.getAttribute('id')
        this.data = this.data.map(todo => {
          if (todo.id === checkedId) {
            return {
              ...todo,
              isDone: !todo.isDone
            }
          } else {
            return todo
          }
        })
        this.syncLocalStorage()
        this.render(this.data)
      } else if (e.target.tagName === 'I') {
        const deletedId = +e.target.getAttribute('id')
        this.data = this.data.filter(todo => todo.id !== deletedId)
        this.syncLocalStorage()
        this.render(this.data)
      }
    })
  }
}

if (document.body) {
  const todoList = new TodoList()
  todoList.build()
}
