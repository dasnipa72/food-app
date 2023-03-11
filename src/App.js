import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import Routes from './Routes/routes';
import { UserProvider } from './context/context';
import { APIProvider } from './context/ApiContext';
import Navbar from './Components/CommonComponent/Navbar';
function App() {
  return (
    <div>
      <UserProvider>
        <APIProvider>
          <Navbar />
          <Routes />
        </APIProvider>
      </UserProvider>

    </div>
  );
}

export default App;
