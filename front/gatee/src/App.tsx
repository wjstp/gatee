import React, {useState} from 'react';
import Router from "./Router";
import StartRouter from "./StartRouter";
function App() {
    const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
        <Router/>

    </div>
  );
}

export default App;
