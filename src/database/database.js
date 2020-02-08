const util = require( 'util' );
const mysql = require('mysql');

const openConnection = async () => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });
    
    await connection.connect((err) => {
        if (err) throw err;
    });

    return connection;
}
const closeConnection = async (connection) => {
    await util.promisify(connection.end).call(connection);
}

module.exports = {
    async query(sql, data = []) {
        const connection = await openConnection();
        const result = await util.promisify(connection.query).call(connection, sql, data);  
        await closeConnection(connection);    
        return result;  
    },
    async fetch(columns, table, query) {
        const connection = await openConnection();
        
        let sql = 'SELECT ';

        columns.forEach((column) => {sql += column + ','});

        sql = sql.slice(0, -1) + ' FROM ' + table + ' WHERE'; 

        Object.keys(query).forEach((key)=>{
            sql += ' ' + key + ' = \"' + query[key] + '\" AND';
        })

        sql = sql.slice(0, -3) + ';';

        const result = await util.promisify(connection.query).call(connection, sql);  
        await closeConnection(connection);
        return result;  
    },
    async insert(table, data) {
        const connection = await openConnection();
        
        const sql = 'INSERT INTO ' + table + ' SET ?';

        const result = await util.promisify(connection.query).call(connection, sql, data); 

        await closeConnection(connection);

        return result;
    },
    async update(table, id, data) {
        const connection = await openConnection();

        let sql = 'UPDATE ' + table + ' SET';
        let values = [];

        Object.keys(data).forEach((key)=>{
            sql += ' ' + key + ' = ?,';
            values.push(data[key]);
        })

        sql = sql.slice(0, -1);

        sql += ' WHERE id = ' + id + ';';

        const result = await util.promisify(connection.query).call(connection, sql, values);  
        await closeConnection(connection);
        return result; 
    }
}