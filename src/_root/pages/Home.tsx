import { useState } from "react";

const Home = () => {
  const [name, setName] = useState("");
  
  return (
    <div className="text-red">
      <div>Welcome {name}</div>
      <input type="text" onChange={(e) => setName(e.target.value)} />
    </div>
  )
}
export default Home;