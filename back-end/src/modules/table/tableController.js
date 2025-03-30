import { Router } from 'express';
import { getData,insertData,updateData,deleteData} from './tableSevice.js';


export const router = Router();

router.get('/', (req, res) => {
  res.send('Server is running...');
});

// 📌 ดึงข้อมูล BMI ทั้งหมด หรือเฉพาะ identity
router.get('/bmi', async (req, res) => {
  try {
    const identity = req.query.identity || null;
    const data = await getData(identity);

    if (!data || data.length === 0) {
      return res.status(500).json({ error: "ไม่สามารถดึงข้อมูลได้" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 เพิ่มข้อมูล BMI
router.post('/bmi', async (req, res) => {
  try {
    const { identity, name, weight, hight } = req.body;
    
    if (!identity || !name || !weight || !hight) {
      return res.status(400).json({ error: "กรุณาป้อน identity, name, weight, และ hight" });
    }

    const heightInMeters = hight / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let category = '';
    if (bmi < 18.5) category = 'น้ำหนักต่ำกว่ามาตรฐาน';
    else if (bmi < 24.9) category = 'น้ำหนักปกติ';
    else if (bmi < 29.9) category = 'น้ำหนักเกิน';
    else category = 'โรคอ้วน';

    // ✅ บันทึกข้อมูลลงฐานข้อมูล
    await insertData(identity, name, weight, hight, bmi);

    res.json({
      message: "เพิ่มข้อมูล BMI สำเร็จ",
      bmi: bmi.toFixed(2),
      category
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 อัปเดตข้อมูล BMI ตาม identity
router.put('/bmi/:identity', async (req, res) => {
  try {
    const identity = req.params.identity;
    const { name, weight, hight } = req.body;

    if (!name || !weight || !hight) {
      return res.status(400).json({ error: "กรุณาป้อน name, weight, และ height" });
    }

    const heightInMeters = hight / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let category = '';
    if (bmi < 18.5) category = 'น้ำหนักต่ำกว่ามาตรฐาน';
    else if (bmi < 24.9) category = 'น้ำหนักปกติ';
    else if (bmi < 29.9) category = 'น้ำหนักเกิน';
    else category = 'อ้วนมาก (เสี่ยงโรค)';

    const result = await updateData(identity, name, weight, hight, bmi.toFixed(2), category);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 ลบข้อมูล BMI ตาม identity
router.delete('/bmi/:identity', async (req, res) => {
  try {
    const identity = req.params.identity;
    const result = await deleteData(identity);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});