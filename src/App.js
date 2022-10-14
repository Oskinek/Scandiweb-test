import Routes from './routes/Routes.js'
import './App.css';
import NavBar from './components/navbar/NavBar'

function App() {
  return (
    <div>
      <div className="app">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600&display=swap');
      </style> 
      <NavBar/>
        {Routes}
      </div>
    </div>
  );
}

export default App;
