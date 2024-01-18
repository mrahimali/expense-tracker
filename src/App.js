import './App.css';
import Tracker from './Tracker';

function App() {
  const data=[
    {
        expense:"Books",
        amount:"400"
    },
    {
        expense:'food',
        amount:'500'
    },
    {
        expense:'mobile',
        amount:'2000'
    }
]
  return (
    <div className="App">
      
      <Tracker data={data}/>
    </div>
  );
}

export default App;
