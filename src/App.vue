<template>
    <div id="app">
        <div id="header">
            <h1>Todolist</h1>
            <form @submit.prevent='create()'>
                <label for="name">Name: <input type="text" v-model="newTodo.name" id="name" required placeholder="Name"></label>
                <label for="due-date">Due date: <input type="date" id="due-date" v-model="newTodo.due_date" placeholder="Due date"></label><br>
                <button type="submit">Create Todo</button>
                <button type="button" @click="clear()">Clear All Todos</button>
                <button type="button" @click="clearComplete()">Clear Complete Todos</button>
            </form>
        </div>
        <ul id="todos">
            <li v-for="todo in todos" :class="{ todo: true, checked: todo.checked}" @click="toggleChecked(todo.id)" :key="todo.id">
                <img src="@/assets/check.jpg" :style="{ opacity: todo.checked ? 1 : 0 }" alt="Check mark">
                <span class="name">{{ todo.name }}</span>
                <div class="due-date" :style="{ display: todo.due_date ? 'inline' : 'none !important' }">Due {{ todo.due_date }}</div>
                <span class="remove" @click="remove(todo.id)">×</span>
            </li>
        </ul>
    </div>
</template>
<script src='@/assets/scripts.js'></script>
<style lang="scss" src='@/assets/styles.scss'></style>