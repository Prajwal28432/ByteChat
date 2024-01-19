import logo from './logo.svg';
import './App.css';
import { Button } from '@chakra-ui/react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { Home } from './pages/Home';
import Chatspage from './pages/Chatspage';
function App() {
  return (
    <div className="App"  >
         {/* <Button colorScheme='blue'>Button</Button> */}
         <Router>
          <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/chats' element={<Chatspage/>}></Route>
          </Routes>
         </Router>
    </div>
  );
}

export default App;
