import React from "react";
import { Exercise } from "./types";
import "bootstrap/dist/css/bootstrap.min.css";

interface WorkoutTableProps {
    exercises: Exercise[];
    onSeeProgress: (exercise: Exercise) => void;
    onEdit: (exercise: Exercise) => void;
    onAdd: () => void;
}

const WorkoutTable: React.FC<WorkoutTableProps> = ({ exercises, onSeeProgress, onEdit, onAdd }) => {
    return (
        <div className="container mt-4">
            <table className="table table-striped table-bordered align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Exercise</th>
                        <th>Muscle Group</th>
                        <th>Volume</th>
                        <th>Max</th>
                        <th>Date</th>
                        <th>Actions
                        <button
                            className="btn btn-sm btn-primary ms-2"
                            onClick={() => onAdd()}
                        >
                             Add
                        </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise, index) => (
                        <tr key={index}>
                            <td>{exercise.name}</td>
                            <td>{exercise.muscle}</td>
                            <td>{exercise.recent_exercise.volume}</td>
                            <td>{exercise.recent_exercise.max}</td>
                            <td>{exercise.recent_exercise.date}</td>
                            <td>
                                <button
                                    className="btn btn-link btn-sm text-primary ms-2"
                                    onClick={() => onSeeProgress(exercise)}
                                >
                                    See Progress
                                </button>
                                <button
                                    className="btn btn-sm btn-warning ms-2"
                                    onClick={() => onEdit(exercise)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WorkoutTable;
