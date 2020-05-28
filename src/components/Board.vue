<template>
  <div class="board">
        <note
        v-for="(note, index) in notes"
        :key="note.id"
        :id="note.id"
        :title="note.title"
        :todos="note.todos"
        v-on:delete-note="deleteNote(index)"
        >
        </note>
        <button class="new-note" v-on:click="addNewNote">
            <div class="plus-square">
                <div class="plus"></div>
            </div>
        </button>
  </div>
</template>

<script>
import Note from './Note.vue'

export default {
  name: 'Board',
  
  data: () => {
    return {
        notes : [],
        }
        
    },
    components: {
        Note
    },
    mounted () {
        if (localStorage.getItem('notes')) {
            this.notes = JSON.parse(localStorage.getItem('notes'));
            console.log(this.notes);
        }
    },
    watch: {
    notes(newNotes) {
      localStorage.notes = JSON.stringify(newNotes);
    }
    },
    methods: {
        addNewNote () {
            let newId = '_' + Math.random().toString(36).substr(2, 9);
            this.notes.push({
                title: "New Note",
                id: newId,
                todos: [
                    {
                        id: "4",
                        title: "nothing",
                        completed: true
                    },
                    {
                        id: "5",
                        title: "nothing",
                        completed: true
                    },
                    {
                        id: "6",
                        title: "nothing",
                        completed: true
                    },
                    {
                        id: "7",
                        title: "nothing",
                        completed: false
                    },

                ]
            })
        },
        deleteNote (index) {
            this.notes.splice(index,1);
        }
    }
}
</script>

<style scoped>
.board {
    padding-top: 75px;
    display: grid;
    grid-template-columns: repeat(4, 345px);
    gap: 75px;
    row-gap: 75px;
    height: 100%;
    
}
.new-note {
    display: grid;
    width:345px;
    height: 345px;
    background: transparent;
    border: 10px dashed #78D9FF;
    box-sizing: border-box;
    padding: 0;
}
.plus-square {
    display: grid;
    justify-self: center;
    align-self: center;
    width: 200px;
    height: 200px;
    background: #78D9FF;
}
.plus {
    justify-self: center;
    align-self: center;
    background: #6F4876;
    height: 100px;
    position: relative;
    width: 20px;
}
.plus:after {
    background: #6F4876;
    content: "";
    height: 20px;
    left: -40px;
    position: absolute;
    top: 40px;
    width: 100px;
}
</style>
