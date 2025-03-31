import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',    
  user: 'root',         
  password: '0632732497',          
  database: 'mbi_data'
});

export const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const closePool = () => {
  pool.end((err) => {
    if (err) {
      console.error('Error closing pool:', err);
    } else {
      console.log('Pool closed');
    }
  });
};
