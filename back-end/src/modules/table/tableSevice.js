import { query } from '../../db.js';

// 📌 ดึงข้อมูล BMI ทั้งหมด หรือเฉพาะ identity ที่กำหนด
export const getData = async (identity) => {
  try {
    let sql = 'SELECT * FROM bmirecords';
    let params = [];

    if (identity) {
      sql += ' WHERE identity = ?';
      params.push(identity);
    }

    return await query(sql, params);
  } catch (err) {
    console.error("Database Query Error:", err.message);
    return null;
  }
};

// 📌 เพิ่มข้อมูล BMI ลงในฐานข้อมูล
export const insertData = async (identity, name, weight, hight, bmi) => {
  try {
    const sql = `
      INSERT INTO bmirecords (identity, name, weight, hight, bmi) 
      VALUES (?, ?, ?, ?, ?)
    `;
    await query(sql, [identity, name, weight, hight, bmi]);
    return { success: true, message: "เพิ่มข้อมูลสำเร็จ" };
  } catch (err) {
    console.error("Insert Error:", err.message);
    return { success: false, error: err.message };
  }
};

// 📌 อัปเดตข้อมูล BMI ตาม identity
export const updateData = async (identity, name, weight, hight, bmi, ) => {
  try {
    const sql = `
      UPDATE bmirecords 
      SET name = ?, weight = ?, hight = ?, bmi = ?
      WHERE identity = ?
    `;
    const result = await query(sql, [name, weight, hight, bmi, identity]);

    if (result.affectedRows === 0) {
      return { success: false, message: "ไม่พบข้อมูลที่ต้องการอัปเดต" };
    }
    return { success: true, message: "อัปเดตข้อมูลสำเร็จ" };
  } catch (err) {
    console.error("Update Error:", err.message);
    return { success: false, error: err.message };
  }
};

// 📌 ลบข้อมูล BMI ตาม identity
export const deleteData = async (identity) => {
  try {
    const sql = 'DELETE FROM bmirecords WHERE identity = ?';
    const result = await query(sql, [identity]);

    if (result.affectedRows === 0) {
      return { success: false, message: "ไม่พบข้อมูลที่ต้องการลบ" };
    }
    return { success: true, message: "ลบข้อมูลสำเร็จ" };
  } catch (err) {
    console.error("Delete Error:", err.message);
    return { success: false, error: err.message };
  }
};