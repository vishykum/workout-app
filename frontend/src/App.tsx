import { useEffect, useState, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import WorkoutTable from './components/WorkoutTable';
import { Exercise, ExerciseInfo } from './components/types';
import ProgressPlot from './components/ProgressPlot';
import EditWorkout from './components/EditWorkout';
import AddExercise from './components/AddExercise';
import axios from 'axios';
import "./App.css";

interface AlertProps {
  show: boolean;
  onClose: (name: string) => void;
}

function App() {

  const url = `http://${window.location.hostname}:3000/api/exercises`;

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [plotShow, setPlotShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const firstExercisesUpdate = useRef(false);
  const userLoaded = useRef(false);
  const [loginShow, setLoginShow] = useState(true);
  const [user, setUser] = useState("");

  function saveExercises(exercises: Exercise[]) {
    console.log("here");
    axios.put(url, exercises, {
      params: {
        user: user
      }
    })
    .then((response) => {
      console.log(response.data);
    }, (error) => {
      console.log(error);
    });
  }

  const exerciseInfo = {volume: 200, max: 45, date: "2024-01-22"} as ExerciseInfo;
  let map: ExerciseInfo[] = [];
  map.push(exerciseInfo);
  map.push({volume: 220, max: 50, date: "2024-01-24"} as ExerciseInfo);
  map.push({volume: 250, max: 55, date: "2024-01-25"} as ExerciseInfo);

  useEffect(() => {
    if (firstExercisesUpdate.current) {
      axios.get(url, {
        params: {
          user: user
        }
      })
      .then((response) => {
        if (response.data !== null) setExercises(response.data as Exercise[]);
        console.log("Data fetched");
      }, (error) => {
        console.log(error);
      });

      firstExercisesUpdate.current = false;
    }
  });


  useEffect(() => {
    if (userLoaded.current && exercises.length > 0) {
      // console.log("user: " + user);
      saveExercises(exercises);
    }
  }, [exercises]);



  function handleSeeProgress(exercise: Exercise) {
    setCurrentExercise({...exercise});
    setPlotShow(true);
  }

  function handleOnEdit(exercise: Exercise) {
    setCurrentExercise({...exercise});
    setEditShow(true);
  }

  function handleEditInfo(info: ExerciseInfo) {
    if (!currentExercise) return;

    let more_info_arr = currentExercise.more_info;

    more_info_arr = [...currentExercise.more_info.filter((i) => i.date !== info.date), {...info}];
    more_info_arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let current_exercise = {...currentExercise};
    current_exercise.more_info = more_info_arr;

    if (current_exercise.recent_exercise.date == 'no entry' || new Date(current_exercise.recent_exercise.date).getTime() < new Date(info.date).getTime())
      current_exercise.recent_exercise = info;

    setCurrentExercise({...(current_exercise as Exercise)});

    setExercises([...exercises.filter((i) => i.name !== current_exercise.name), {...current_exercise}]);
  }

  function handleDeleteInfo(info: ExerciseInfo) {
    if (!currentExercise) return;

    let more_info_arr = currentExercise.more_info;

    more_info_arr = [...currentExercise.more_info.filter((i) => i.date !== info.date)];

    let current_exercise = {...currentExercise};
    current_exercise.more_info = more_info_arr;

    if (new Date(current_exercise.recent_exercise.date).getTime() === new Date(info.date).getTime())
      current_exercise.recent_exercise = current_exercise.more_info[current_exercise.more_info.length - 1];

    setCurrentExercise({...(current_exercise as Exercise)});

    setExercises([...exercises.filter((i) => i.name !== current_exercise.name), {...current_exercise}]);
  }

  function handleAddExercise(exercise: Omit<Exercise, "more_info">) {
    setExercises([...exercises, {...exercise, more_info: []}]);
  }

  function handleLoginClose(name: string) {
    console.log("name: " + name);
    setUser(name);
    firstExercisesUpdate.current = true;
    userLoaded.current = true;
    setLoginShow(false);
  }

  const Alert: React.FC<AlertProps> = ({show, onClose}) => {
    const [name, setName] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      if (name === "name") {
          setName(value);
      }
  };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onClose(name);
    };


    return (
      <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex={-1} role="dialog">
      <div className="modal-dialog">
          <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title">User</h5>
              </div>
              <form onSubmit={handleSubmit} className="modal-body">
                  <div className="mb-3">
                      <label htmlFor="type" className="form-label">
                          Name:
                      </label>
                      <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                      />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                      Submit
                  </button>
              </form>
          </div>
      </div>
  </div>
    );
  };

  // function Alert() {
  //   if (user === "") {
  //     alert("loaded!");
  //   }
  // }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Workout tracker</h1>

      <Alert show={loginShow} onClose={handleLoginClose}/>

      <ProgressPlot show={plotShow} exercise={currentExercise}/>

      <WorkoutTable exercises={exercises} onSeeProgress={handleSeeProgress} onEdit={handleOnEdit} onAdd={() => {setShowAddExercise(true)}}/>

      <EditWorkout exercise={currentExercise} show={editShow} onClose={() => {setEditShow(false);}} onEditInfo={handleEditInfo} onDelete={handleDeleteInfo}/>

      <AddExercise show={showAddExercise} onClose={() => {setShowAddExercise(false)}} onSubmit={handleAddExercise} />

    </div>
  );
};
export default App
