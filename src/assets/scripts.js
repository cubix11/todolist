import uuid from 'uuid/v4';
export default {
    data: () => ({
        newTodo: {
            name: '',
            due_date: ''
        },
        todos: []
    }),
    mounted() {
        document.getElementById('name').focus();
        if(localStorage.todos) {
            this.todos = JSON.parse(localStorage.todos);
        } else {
            this.todos = [];
            localStorage.todos = JSON.stringify([]);
        }
    },
    methods: {
        create() {
            const todo = {
                id: uuid(),
                name: this.newTodo.name,
                checked: false
            };
            if(this.newTodo.due_date) {
                const date = new Date(this.newTodo.due_date + ' 00:00');
                const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
                const [ year, month, day ] = this.newTodo.due_date.split('-');
                const finalDate = `${month}/${day}/${year.slice(-2)} (${weekday})`;
                todo.due_date = finalDate;
            }
            this.newTodo = {
                name: '',
                due_date: ''
            };
            document.getElementById('name').focus();
            this.save(todo);
        },
        save(todo) {
            this.todos.push(todo);
            localStorage.todos = JSON.stringify(this.todos);
        },
        remove(id) {
            const index = this.todos.findIndex(todo => todo.id === id);
            this.todos.splice(index, 1);
            localStorage.todos = JSON.stringify(this.todos);
        },
        toggleChecked(id) {
            const index = this.todos.findIndex(todo => todo.id === id);
            try {
                this.todos[index].checked = !this.todos[index].checked;
            } catch {
                '';
            }
            localStorage.todos = JSON.stringify(this.todos);

        },
        clear() {
            if(!confirm('Are you sure?')) return;
            this.todos = [];
            localStorage.todos = '[]';
        },
        clearComplete() {
            if(!confirm('Are you sure?')) return;
            const completeTodos = this.todos.filter(todo => !todo.checked);
            this.todos = completeTodos;
            localStorage.todos = JSON.stringify(completeTodos);
        }
    }
};