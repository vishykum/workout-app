import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Exercise, ExerciseInfo } from './types'

interface AddExerciseProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (exercise: Omit<Exercise, "more_info">) => void;
};

const AddExercise: React.FC<AddExerciseProps> = ({show, onClose, onSubmit}) => {
    const [formData, setFormData] = useState<Omit<Exercise, "more_info">>({
        name: "",
        muscle: "",
        recent_exercise: {volume: 0, max: 0, date: "no entry"} as ExerciseInfo,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: "",
            muscle: "",
            recent_exercise: {volume: 0, max: 0, date: "no entry"} as ExerciseInfo,
        });
        onClose();
    };

    return (
        <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex={-1} role="dialog">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add New Exercise</h5>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        id="descriptionClose"
                        onClick={onClose}
                    ></button>
                </div>
                <form onSubmit={handleSubmit} className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">
                            Exercise Name
                        </label><br/>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., Bicep Curl, Bench Press"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">
                            Muscle Group
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="muscle"
                            name="muscle"
                            value={formData.muscle}
                            onChange={handleChange}
                            placeholder="e.g., Bicep, Pecs, Upper Back"
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

export default AddExercise;