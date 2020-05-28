<template>
    <div class="note" @click="openNote" tabindex=0 v-on:keyup.space="openNote" v-on:keyup.13.stop="openNote">
        <div class="note-title" >{{title}}</div>
        <button class="delete-note" v-on:click.stop="deleteNote" v-on:keyup.space.stop="deleteNote">
        <div class="cross"></div>
        </button>
        <ul class=todos>
            <li class="todo" v-for="todo in todos" :key="todo.id">
                <label class="check option">
                <input type="checkbox" class="check-input" v-model="todo.completed" disabled >
                <span class="check-box"></span>
                <div class="todo-text" v-bind:class="{done: todo.completed}">{{todo.title}}</div>
                </label>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    props: {
        title: String,
        id: String,
        todos: Array,
    },
data : () => {
    return {
    }
},
computed: {
    getEditRoute () {
        return "note" + this.id;
    }
},
methods: {
    openNote() {
        this.$router.push("/note/"+this.id);
    },
    deleteNote() {
        this.$emit('delete-note');
    }
}
}
</script>

<style scoped>
.note {
    position: relative;
    width: 345px;
    height: 345px;
    background: #FFE101;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.25);
    overflow: hidden;
}
.note:after {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 170px;
  pointer-events: none;
  bottom: 0;
  background: linear-gradient(10deg, #fff294 10%, transparent 30%);
}
.note:focus {
    box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.5);
}
.note-title {
    height: 48px;
    text-align: center;
    padding-top:20px;
    margin-right: auto;
    margin-left:auto;
    font-family: Handlee;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 48px;
    color: #000000;
}
.delete-note {
    background: transparent;
    position: absolute;
    padding: 0;
    right:5px;
    top: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border:none;
}
.cross {
    width: 20px;
    height: 20px;
    background: black;
    clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
}

.todo-text {
    font-family: Handlee;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
    color: #000000;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden; 
}
.todo {
    overflow: hidden;
    margin-right: 20px;
}
.done {
    text-decoration-line: line-through;
}
ul {
  list-style-type: none;
 }

.option {
    display: block;
    margin-bottom: 0.5em;
}

/* Check */

.check {
    padding-left: 1.2em;
}

.check-input {
    position: absolute;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.check-box {
    position: absolute;
    margin-top: 0.4em;
    margin-left: -1.6em;
    width: 1.2em;
    height: 1.2em;
    overflow: hidden;
    border-radius: 0.2em;
    box-sizing: border-box;
    background-color: #C4C4C4;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    box-shadow: 0 0 0 0.1em black;
}

/* Checked */

.check-input:checked + .check-box {
    background-color: black;
    background-image: url(https://cdn.glitch.com/d6162378-5823-4160-a555-3d9789bd2b92%2Fcheck.svg?1550563475518);
}
/* Disabled */

.check-input:disabled + .check-box {
    box-shadow: 0 0 0 0.1em #9B9B9B;
}

.check-input:checked:disabled + .check-box {
    background-color: #9B9B9B;
}

</style>

