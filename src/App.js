import logo from './logo.svg';
import './App.css';
import RankingBoard from './components/RankingBoard';

function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <RankingBoard />
    </div>
  );
}

export default App;
