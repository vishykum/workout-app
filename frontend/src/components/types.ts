export interface ExerciseInfo{
    volume: number; //in lbs
    max: number; //in lbs
    date: string; //Date of exercise
};

export interface Exercise {
    name: string; //Eg: Bicep curl, Deadlift, Bench Press
    muscle: string; //Eg: Bicep, Upper Back, Pecs
    recent_exercise: ExerciseInfo
    more_info: ExerciseInfo[];
};