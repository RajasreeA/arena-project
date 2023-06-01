import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        
        start: new Date(2021, 6, 0),
        end: new Date(2021, 6, 0),
    },
    {
        title: "Vacation",
       
        start: new Date(2021, 6, 7),
        end: new Date(2021, 6, 10),
    },
    {
        title: "Conference",
       
        start: new Date(2021, 6, 20),
        end: new Date(2021, 6, 23),
    },
];

function App() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", });
    const [value, setValue] = useState({
      start: "",
      end:""
  });
  const handleChange=(start)=>{
      setValue({...value,start});

  }
    const [allEvents, setAllEvents] = useState(events);

    function handleAddEvent() {
        
        for (let i=0; i<allEvents.length; i++){

            const d1 = new Date (allEvents[i].start);
            const d2 = new Date(newEvent.start);
            const d3 = new Date(allEvents[i].end);
            const d4 = new Date(newEvent.end);

             if (
              ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                (d4 <= d3) )
              )
            {   
                alert("CLASH"); 
                break;
             }
    
        }
        
        
        setAllEvents([...allEvents, newEvent]);
    }
console.log(allEvents,"TREEEEE");

    return (
      <>
<div style={{marginLeft:"40rem"}}>
           
           <div>
            <label>Period Name</label><br/>
               <input type="text" placeholder="Enter Period Name"  value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
               <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker 
        label="start Time" 
        value={value.start}
        onChange={handleChange}
        />
        <TimePicker 
        label="End Time" 
        value={value.end}
        onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
               <DatePicker placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
               <DatePicker
                placeholderText="End Date" 
                selected={newEvent.end} 
                onChange={(end) => setNewEvent({ ...newEvent, end })} 
               
                />
             
               <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                   Add Period
               </button>
           </div>
       </div>
      
           <Calendar  localizer={localizer}  events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
      </>
        

    );
}

export default App;
