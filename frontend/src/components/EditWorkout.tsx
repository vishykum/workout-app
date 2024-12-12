import { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Exercise, ExerciseInfo } from './types'

interface EditWorkoutProps {
    exercise: Exercise | null;
    show: boolean;
    onClose: () => void;
    onEditInfo: (info: ExerciseInfo) => void;
    onDelete: (info: ExerciseInfo) => void;
};

interface EditMoreInfoProps {
    show: boolean;
    info: ExerciseInfo | null;
    onClose: () => void;
    onSubmit: (info: ExerciseInfo) => void;
};

const EditWorkout: React.FC<EditWorkoutProps> = ({exercise, show, onClose, onEditInfo, onDelete}) => {
    
    if (exercise === null) {
        return (<div></div>);
    }
    
    const [showEditMoreInfo, setShowEditMoreInfo] = useState(false);
    const [currentInfo, setCurrentInfo] = useState<ExerciseInfo|null>(null);
    const [isEdit, setEdit] = useState(false);
    const EditMoreInfo: React.FC<EditMoreInfoProps> = ({show, info, onClose, onSubmit}) => {
        const [formData, setFormData] = useState<ExerciseInfo>({
            date: "",
            volume: 0,
            max: 0,
        });

        useEffect(() => {
            if (info) {
                setFormData({date: info.date, volume: info.volume, max: info.max});
            }
        }, [showEditMoreInfo]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;

            setFormData({ ...formData, [name]: value });
        };
    
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(formData);
            setFormData({
                date: "",
                volume: 0,
                max: 0,
            });
            onClose();
        };

        return (
            <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex={-1} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Exercise Info</h5>
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
                                Date
                            </label><br/>
                            <input
                                type={(isEdit) ? "text" : "date"}
                                id="date"
                                name="date"
                                className={(isEdit) ? "form-control" : ""}
                                value={formData.date}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {(isEdit) ? () => {} : handleChange(e);}}
                                placeholder="e.g., 22/01/2024, 01/12/2020"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">
                                Volume
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="volume"
                                name="volume"
                                value={formData.volume}
                                onChange={handleChange}
                                placeholder="e.g., 200, 300 (in lbs)"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reportedBy" className="form-label">
                                Maximum Weight
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="max"
                                name="max"
                                value={formData.max}
                                onChange={handleChange}
                                placeholder="e.g., 45, 50 (in lbs)"
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

    function handleEditClick(info: ExerciseInfo | null) {
        setShowEditMoreInfo(true);
        setCurrentInfo(info);
    }

    return (
        <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex={-1} role="dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> {exercise.name} </h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => {onClose(); setEdit(false);}}
                        ></button>
                    </div>

                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Date</th>
                                <th>Volume</th>
                                <th>Max</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exercise.more_info.map((info, index) => (
                                <tr key={index}>
                                    <td>{info.date}</td>
                                    <td>{info.volume}</td>
                                    <td>{info.max}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning ms-2"
                                            onClick={() => {handleEditClick(info); setEdit(true);}}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger ms-2"
                                            onClick={() => onDelete(info)}
                                        >
                                            &#x2716;
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        className="btn btn-sm btn-primary ms-2"
                        onClick={() => {handleEditClick(null); setEdit(false);}}
                    >
                        Add
                    </button>

                    <EditMoreInfo show={showEditMoreInfo} info={currentInfo} onClose={() => setShowEditMoreInfo(false)} onSubmit={onEditInfo}/>
                </div>
        </div>
    );
};

export default EditWorkout;