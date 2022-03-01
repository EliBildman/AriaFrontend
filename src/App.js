import './app.css';
import PageSlider from './components/page-slider'
import RoutineAccordion from './components/routine-accordion';

function App() {
  return (
    <div>
      <PageSlider labels={["Routines", "Events", "Schedule", "Scripts"]}>
        <RoutineAccordion />
        <h1>two</h1>
        <h1>three</h1>
        <h1>four</h1>
      </PageSlider>
    </div>
  );
}

export default App;
