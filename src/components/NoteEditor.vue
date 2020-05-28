<template>
  <div class="editor">
      <header>
        <nav>
            <button class="back-btn" @click="goHome">
                Back to board
            </button>
            <button class="nav-history-btn">
                Undo
            </button>
            <button class="nav-history-btn">
                Redo
            </button>
        </nav>
        <h1 class="note-editor-title">
            {{title}}
        </h1>
        </header>
        <div class="add-new-task">
                <input 
                type="text"
                autofocus
                autocomplete="off"
                placeholder="What needs to be done?"
                @keyup.enter="addTodo" 
                v-model="newTodo">
                <button @click="addTodo">Add</button>
        </div>
        <ul class="todo-list">
          <li v-for="todo in todos"
            class="todo"
            :key="todo.id"
            :class="{ completed: todo.completed, editing: todo == editedTodo }">
            <div class="view">
              <input v-on:keyup.alt="editTodo(todo)" class="toggle" type="checkbox" v-model="todo.completed">
              <label  @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input class="edit" type="text"
              v-model="todo.title"
              v-todo-focus="todo == editedTodo"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)">
          </li>
        </ul>
        <div class="buttons">
            <button @click="saveChanges">Save<br>changes</button>
            <button @click="discardChanges">Discard changes</button>
            <button @click="deleteNote">Delete this note</button>
        </div>
  </div>
</template>

<script>

export default {
data: () => {
    return {
        id: "",
        title: "",
        todos: [],
        newTodo: "",
        editedTodo: null,
    }
},
methods: {
    goHome: function() {
        this.$router.push("/")
    },
    addTodo: function() {
        let value = this.newTodo && this.newTodo.trim();
        if (!value) {
            return;
        }
        let newId = '_' + Math.random().toString(36).substr(2, 9);
        this.todos.unshift({
            id: newId,
            title: value,
            completed: false
        });
        this.newTodo = "";
    },
    removeTodo: function(todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
    },
    editTodo: function(todo) {
        this.beforeEditCache = todo.title;
        this.editedTodo = todo;
    },
    doneEdit: function(todo) {
        if (!this.editedTodo) {
            return;
        }
        this.editedTodo = null;
        todo.title = todo.title.trim();
        if (!todo.title) {
            this.removeTodo(todo);
        }
    },
    cancelEdit: function(todo) {
        this.editedTodo = null;
        todo.title = this.beforeEditCache;
    },
    saveChanges() {
        let notes = JSON.parse(localStorage.getItem('notes'));
        for (let i in notes) {
            if (notes[i].id == this.id) {
                notes[i].todos = this.todos;
                notes[i].title = this.title;
                break;
            }
        }
        localStorage.setItem('notes', JSON.stringify(notes));
    },
    discardChanges() {
        if (localStorage.getItem('notes')) {
            let notes = JSON.parse(localStorage.getItem('notes'));
            let currentNote = notes.find(note => note.id==this.$route.params.id)
            if (typeof currentNote === "undefined") {
                this.$router.push("/404");
            } else {
                this.title = currentNote.title;
                this.id = currentNote.id;
                this.todos = currentNote.todos;
            }
        }
    },
    deleteNote () {
        let notes = JSON.parse(localStorage.getItem('notes'));
        for (let i in notes) {
            if (notes[i].id == this.id) {
                notes.splice(i,1);
                break;
            }
        }
        localStorage.setItem('notes', JSON.stringify(notes));
        this.$router.push("/")
    }
},
directives: {
    "todo-focus": function(el, binding) {
        if (binding.value) {
            el.focus();
    }
}
},
mounted () {
        if (localStorage.getItem('notes')) {
            let notes = JSON.parse(localStorage.getItem('notes'));
            let currentNote = notes.find(note => note.id==this.$route.params.id)
            if (typeof currentNote === "undefined") {
                this.$router.push("/404");
            } else {
                this.title = currentNote.title;
                this.id = currentNote.id;
                this.todos = currentNote.todos;
            }
        }
    },
}
</script>

<style scoped>
.editor {
    display: block;
    position: relative;
    width: 960px;
    height: 930px;
    background-color: #FFE101;
}
header {
    margin: 40px 80px 0 80px;
    display: flex;
    justify-content: space-between;
}
nav {
    display: grid;
    columns: 1fr 1fr;
    gap: 10px 10px;
}
.back-btn {
    grid-column-start: 1;
    grid-column-end: 3;
    width: 330px;
    height: 65px;
    background-color: #6F4876;
    border-radius: 5px;
    border:none;
    font-family: Handlee;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 48px;
    text-align: center;

    color: #FFFFFF;
}

.nav-history-btn {
    width: 160px;
    height: 65px;
    background-color: #6F4876;
    border-radius: 5px;
    border:none;
    font-family: Handlee;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 48px;
    text-align: center;
    color: #FFFFFF;
}
.note-editor-title {
    margin: 0 auto;
    width: 440px;
    height: 140px;
    font-family: Handlee;
    font-style: normal;
    font-weight: normal;
    font-size: 96px;
    line-height: 128px;
    text-align: center;
    color: #000000;
}
.add-new-task {
    text-align: bottom;
    margin-top: 20px;
    display:flex;
    justify-content: center;
}
.add-new-task input {
    padding-left:15px;
    width: 659px;
    height: 75px;
    border: 1px solid #6F4876;
    box-sizing: border-box;
    border-radius: 10px 0px 0px 10px;
    font-family: Handlee;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 48px;
}


.add-new-task button {
    width: 144px;
    border-radius: 0px 10px 10px 0px;
    border: none;
    font-family: Handlee;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 48px;
    text-align: center;
    background: #6F4876;
    color: #FFFFFF;

}
/*-------------------------------------------------------*/

button {
	margin: 0;
	padding: 0;
	border: 0;
	background: none;
	font-size: 100%;
	vertical-align: baseline;
	font-family: inherit;
	font-weight: inherit;
	color: inherit;
	-webkit-appearance: none;
	appearance: none;
}

.hidden {
	display: none;
}



.new-todo,
.edit {
	position: relative;
	margin: 0;
	width: 100%;
	font-size: 24px;
	font-family: inherit;
	font-weight: inherit;
	line-height: 1.4em;
	border: 0;
	color: inherit;
	padding: 6px;
	border: 1px solid #999;
	box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.new-todo {
	padding: 16px 16px 16px 60px;
	border: none;
	background: rgba(0, 0, 0, 0.003);
	box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}


.todo-list {
	margin-left: 80px;
    margin-right: 80px;
	padding: 0;
	list-style: none;
    height: 425px;
    overflow-y: scroll;
}

.todo-list li {
	position: relative;
	font-size: 24px;
}

.todo-list li:last-child {
	border-bottom: none;
}

.todo-list li.editing {
	border-bottom: none;
	padding: 0;
}

.todo-list li.editing .edit {
	display: block;
	width: calc(100% - 43px);
	padding: 12px 16px;
	margin: 0 0 0 43px;
}

.todo-list li.editing .view {
	display: none;
}

.todo-list li .toggle {
	text-align: center;
	width: 50px;
	/* auto, since non-WebKit browsers doesn't support input styling */
	height: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
	border: none; /* Mobile Safari */
	-webkit-appearance: none;
	appearance: none;
}


.todo-list li .toggle {
	opacity: 0;
}

.todo-list li .toggle + label {
	/*
		Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
	background-image: url("data:image/svg+xml,%3Csvg width='50' height='50' xmlns='http://www.w3.org/2000/svg'%3E%3C!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ --%3E%3Cg%3E%3Ctitle%3Ebackground%3C/title%3E%3Crect fill='transparent' id='canvas_background' height='52' width='52' y='-1' x='-1'/%3E%3Cg display='none' overflow='visible' y='0' x='0' height='100%25' width='100%25' id='canvasGrid'%3E%3Crect fill='url(%23gridpattern)' stroke-width='0' y='0' x='0' height='100%25' width='100%25'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Ctitle%3ELayer 1%3C/title%3E%3Crect rx='10' id='svg_1' height='50' width='50' y='0' x='0' stroke-width='1.5' stroke='%23000' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: center left;
}



.todo-list li .toggle:checked + label {
	background-image: url("data:image/svg+xml,%3Csvg width='50' height='50' xmlns='http://www.w3.org/2000/svg'%3E%3C!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ --%3E%3Cg%3E%3Ctitle%3Ebackground%3C/title%3E%3Crect fill='transparent' id='canvas_background' height='52' width='52' y='-1' x='-1'/%3E%3Cg display='none' overflow='visible' y='0' x='0' height='100%25' width='100%25' id='canvasGrid'%3E%3Crect fill='url(%23gridpattern)' stroke-width='0' y='0' x='0' height='100%25' width='100%25'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Ctitle%3ELayer 1%3C/title%3E%3Crect rx='10' id='svg_1' height='50' width='50' y='0' x='0' stroke-width='1.5' stroke='%23000' fill='%23fff'/%3E%3Cline stroke-linecap='null' stroke-linejoin='null' id='svg_2' y2='40.711369' x2='21.170312' y1='27.468126' x1='8.73788' fill-opacity='null' stroke-opacity='null' stroke-width='1.5' stroke='%23000' fill='none'/%3E%3Cline stroke-linecap='null' stroke-linejoin='null' id='svg_3' y2='15.318713' x2='44.237624' y1='40.724118' x1='20.183571' fill-opacity='null' stroke-opacity='null' stroke-width='1.5' stroke='%23000' fill='none'/%3E%3C/g%3E%3C/svg%3E");
}

.todo-list li .toggle:focus + label {
    color: #6F4876;
}

.todo-list li label {
    font-family: Handlee;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 48px;
	word-break: break-all;
	padding: 15px 15px 15px 60px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
}

.todo-list li.completed label {
	text-decoration: line-through;
}

.todo-list li .destroy {
	position: absolute;
	top: 0;
	right: 10px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: rgb(150,150,150);
	margin-bottom: 11px;
	transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
	color: rgb(0,0,0);
}

.todo-list li .destroy:after {
	content: '×';
}

.todo-list li:hover .destroy {
	display: block;
}

.todo-list li .edit {
	display: none;
}

.todo-list li.editing:last-child {
	margin-bottom: -1px;
}



.clear-completed,
html .clear-completed:active {
	float: right;
	position: relative;
	line-height: 20px;
	text-decoration: none;
	cursor: pointer;
}

.clear-completed:hover {
	text-decoration: underline;
}
.buttons {
    display: flex;
    justify-content: space-between;
    padding: 0 80px 0 80px;
    position:absolute;
    width: 800px;
    bottom: 45px;
}
.buttons button {
    width: 200px;
    height: 110px;
    background: #6F4876;
    border-radius: 5px;
    border:none;
    font-family: Handlee;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 48px;
    text-align: center;
    color: #FFFFFF;
}
button:focus {
    border: black solid 2px;
}

</style>