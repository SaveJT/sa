import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const mockData = [
  { identity: "1001", name: "สมชาย ใจดี", height: 170, weight: 65, bmi: 22.49 },//datatest
  { identity: "1002", name: "สมศรี สายแข็ง", height: 160, weight: 75, bmi: 29.3 },//datatest
  { identity: "1003", name: "เอกชัย พลังบวก", height: 180, weight: 80, bmi: 24.69 },//datatest
  { identity: "1004", name: "จันทร์จิรา รักสุขภาพ", height: 155, weight: 45, bmi: 18.73 }//datatest
];

function Home() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);//datatest
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/bmi")
      .then((response) => {
        setData(response.data); // ใส่ ; เพื่อแยกคำสั่ง
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching BMI data:", error));
  }, []);
  
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/bmi?identity=${search}`);
      
      if (response.data && response.data.length > 0) {
        console.log([response.data]);
        setData(response.data);// ✅ ใช้ `response.data` โดยไม่ต้องดึง `[0]`
      } else {
        alert("ไม่พบข้อมูล แนะนำให้เพิ่มข้อมูล");
        navigate("/add");
      }
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

const handleDelete = async (id) => {
  if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบ ID: ${id}`)) {
    try {
      await axios.delete(`http://localhost:8000/bmi/${id}`);
      setData(data.filter((item) => item.identity !== id)); // ลบจาก state ด้วย
      alert("ลบข้อมูลสำเร็จ!");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
};


  return (
    <div className="container">
      <h1>STUDENT SPU BMI</h1>
      <input
        type="text"
        className="searchbar"
        placeholder="Search...ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div className="buttons">
        <button className="add" onClick={() => navigate("/add")}>Add</button>
      </div>
      <table>
        <thead>
          
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>BMI</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  
  {data.map((item, index) => (
    <tr key={index}>
      <td>{item.identity}</td>
      <td>{item.name}</td>
      <td>{item.hight}</td>
      <td>{item.weight}</td>
      <td>{item.bmi}</td>
      <td>
        <button className="edit" onClick={() => handleEdit(item.identity)}>Edit</button>
        <button className="delete" onClick={() => handleDelete(item.identity)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

function Add() {
  const [identity, setIdentity] = useState(0);//datatest
  const [name, setName] = useState("");//datatest
  const [weight, setWeight] = useState(0);//datatest
  const [height, setHeight] = useState(0);//datatest
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/bmi", {
        identity,
        name,
        weight,
        hight: height, // พิมพ์ผิดจาก `height` เป็น `hight` ต้องให้ตรงกับ backend
      });
  
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  
  return (
    <div className="container">
      <h1>Add BMI Record</h1>
      <input type="text" placeholder="ID" value={identity} onChange={(e) => setIdentity(e.target.value)} />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
      <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <button className="su" onClick={handleSubmit}>Submit</button>
      <button className="cancel" onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
}

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existingData = mockData.find(item => item.identity === id) || {};
  const [name, setName] = useState(existingData.name || "");
  const [weight, setWeight] = useState(existingData.weight || "");
  const [height, setHeight] = useState(existingData.height || "");

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/bmi/${id}`, {
        name,
        weight,
        hight: height, // พิมพ์ `hight` ให้ตรงกับ backend
      });
  
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  
  return (
    <div className="container">
      <h1>Edit BMI Record</h1>
      <input type="text" placeholder="ID" value={id} disabled />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
      <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <button className="su" onClick={handleSubmit}>Save</button>
      <button className="cancel" onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
