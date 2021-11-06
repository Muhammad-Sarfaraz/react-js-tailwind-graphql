import { BiArchive, BiTrash } from "react-icons/bi";
import Search from "./components/Search";
//import appointmentList from "./data.json";
import AppointmentInfo from "./components/AppointmentInfo";
import AddAppointment from "./components/AddAppointment";
import { useState, useEffect, useCallback } from "react";

function App() {
  let [appointmentList, setAppointmentList] = useState([]);

  let [query, setQuery] = useState("");

  let [orderBy, setOrderBy] = useState("asc");
  let [sortBy, setSortBy] = useState("petName");

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppointmentList(data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onDeleteAppointment = (id) => {
    setAppointmentList(
      appointmentList.filter((appointment) => appointment.id !== id)
    );
  };

  const filterAppointments = appointmentList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl">
        <BiArchive className="inline-block text-red-400 align-top" />
        Your Appointments
      </h1>
      <AddAppointment />
      <Search query={query}
       onQueryChange={(myQuery) => setQuery(myQuery)}
       orderBy={orderBy}
       onOrderByChange={mySort=>setOrderBy(mySort)}
       sortBy={sortBy}
       onSortByChange={mySort=>setSortBy(mySort)}
       
       />

      <ul className="divide-y divide-gray-200">
        {filterAppointments.map((appointment, key) => {
          return (
            <AppointmentInfo
              key={key}
              appointment={appointment}
              onDeleteAppointment={onDeleteAppointment}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
