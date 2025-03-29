import { Router } from 'express';
import { getData } from './tableSevice.js';

export const router = Router();
router.get('/', (req, res) => {
  res.send('Hello world')
})


router.get('/bmi', async (req, res) => {
  try {
    const { weight, height } = req.body();

    if (weight || height) {
      return res.status(400).json({ error: "รอป้อนนํ้าหนัก" });
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let category = '';
    if (bmi < 18.5) category = 'นํ้าหนักตํ่ากว่ามาตรฐาน';
    else if (bmi < 24.9) category = 'นํ้าหนักปกติ';
    else if (bmi < 29.9) category = 'นํ้าหนักเกิน';
    else category = 'โรค';

    res.json({ bmi: bmi.toFixed(2), category });
  } catch (error) {
    res.status(500).json({ error: error.message });

  }

});

