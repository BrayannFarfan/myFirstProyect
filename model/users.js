
const fs = require('fs');

const user = {
   fileName: ( './data/users.json'),
   getData: function(){
       return  JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
   },
   fineAll: function(){
       return this.getData();
   },
   nextId: function(){
    let todosUsers = this.fineAll();
    let ultimoId = todosUsers.pop();
    if(ultimoId){
        return ultimoId.id + 1 ;
    }
    return 1;
},
   fineById: function(id){
    let todosUsers = this.fineAll();
    let userEncontrados = todosUsers.find(user => user.id === id);
    return userEncontrados;
},
    fineByField: function(field, text){
        let todosUsers = this.fineAll();
        let userEncontrados = todosUsers.find(user => user[field] === text);
        return userEncontrados;
    },
    create: function(userData){
        let todosUsers = this.fineAll();
        let nuevoUsuario = {
            id: this.nextId(),
            ...userData
        }
        todosUsers.push(nuevoUsuario);
        fs.writeFileSync(this.fileName, JSON.stringify(todosUsers, null, ' ' ))
        return nuevoUsuario;
    },
    delete: function(id) {
        let todosUsers = this.fineAll();
        let usuarioFinal = todosUsers.filter(user => user.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(usuarioFinal, null, ' ' ))
        return true;
    }
   
   }

module.exports = user;