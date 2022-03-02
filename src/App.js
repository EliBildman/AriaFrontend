import './app.css';
import PageSlider from './components/page-slider'
import RoutineAccordion from './components/routines/routine-accordion';
import EventAccordion from './components/events/event-accordion';
import ScheduleAccordion from './components/schedules/schedule-accordion';

function App() {
  return (
    <div>
      <PageSlider labels={["Routines", "Events", "Schedule"]}>
        <RoutineAccordion />
        <EventAccordion />
        <ScheduleAccordion />
      </PageSlider>
    </div>
  );
}

export default App;
