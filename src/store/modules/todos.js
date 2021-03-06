import axios from 'axios'

const state = {
    todos:[ ]
};

const getters = {
    allTodos: state => state.todos
};
const actions = {
    // eslint-disable-next-line no-unused-vars
   async fetchTodos({commit}){
       const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
       commit('setTodos',response.data)
    },
    async addTodo({commit}, userId, title ){
       const response = await axios.post(
           'https://jsonplaceholder.typicode.com/todos',
           { userId ,title , completed: false}
       );
        commit('newTodo',response.data)
    },
    async deleteTodo({commit}, id){
       await axios.delete('https://jsonplaceholder.typicode.com/todos/{id}')
        commit ('removeTodo',id)
    },
    // eslint-disable-next-line no-unused-vars
    async filterTodos({commit},e){
        const limit = parseInt(
            e.target.options[e.target.options.selectedIndex].innerText);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

        commit('setTodos',response.data);
    },
    async updateTodo({ commit },updTodo){
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,updTodo)
        commit ('updateTodo',response.data)
    },
};
const mutations = {
  setTodos: (state , data) => (state.todos = data),
  newTodo: (state,todo) => state.todos.unshift(todo),
  removeTodo: ( state , id ) =>
        (state.todos = state.todos.filter(todo => todo.id != id)),
  updateTodo: (state, updTodo) => {
      const index = state.todos.findIndex(todo => todo.id === updTodo.id);
      if(index !== -1){
      state.todos.splice(index, 1, updTodo)
      }
  }
  };


export default {
    state,
    getters,
    actions,
    mutations
}