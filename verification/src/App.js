import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLogin from './component/AdminLogin';
import StudentCertificate from './component/StudentCertificate';
import LoginForm from './component/LoginForm';




function App() {
  return (
    <div className="App">



      {/* <AdminLogin /> */}
      {/* <StudentCertificate /> */}
      {/* <LoginForm /> */}

      <Routes>

        <Route path='/login' Component={LoginForm} />
        <Route path='/certificate' Component={StudentCertificate} />


      </Routes>
    </div>
  );
}

export default App;
