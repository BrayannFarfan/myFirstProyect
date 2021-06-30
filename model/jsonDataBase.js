const fs = require('fs');
const path = require('path');



const model = function (name){
    return {
        tablePath: path.resolve(__dirname, '../data/', `${name}.json`),
        readFile: function(){
            let tableContents = fs.readFileSync(this.tablePath, 'utf-8');
            return JSON.parse(tableContents) || [];
        },
        writeFile : function(contents) {
            let tableContents = JSON.stringify(contents, null, ' ');
            fs.writeFileSync(this.tablePath, tableContents);
        },
        nextId:function() {
            let rows = this.readFile();
            let lastRow = rows.pop();

            return lastRow.id ? ++lastRow.id : 1;
        },
        all: function() {
            console.log('Estoy buscando los productos ahora')
            return this.readFile();
        },
        find:function(id) {
            let rows = this.readFile();
            return rows.find(product => product.id == id);
        },
        create:function(row) {
            console.log(row)
            let rows = this.readFile();
            row.id = this.nextId();
            row.status = 'live';
            rows.push(row);
            this.writeFile(rows);
            return row.id;
        },
        update:function(row) {
            let rows = this.readFile();

            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == row.id) {
                    return row;
                }

                return oneRow;
            });
            this.writeFile(updatedRows);
            return row.id;
        },
        delete: function(id) {

            console.log('Elimino:' + id)
            let rows = this.readFile();

            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == id) {
                    oneRow.status = 'deleted'
                    return oneRow;
                }

                return oneRow;
            });
            this.writeFile(updatedRows);
            return id;
        },
        filter: function(filtro){
            console.log("entrando al filter");
            let rows = this.readFile();
            let updatedRows = rows.filter(row => {
                return row.status == filtro;
            })
            console.log(updatedRows)
            return updatedRows;
        },
        recover: function(id){
            console.log('Recupero:' + id)
            let rows = this.readFile();

            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == id) {
                    oneRow.status = 'live'
                    return oneRow;
                }

                return oneRow;
            });
            this.writeFile(updatedRows);
            return id;
        }
    }
}


module.exports = model;