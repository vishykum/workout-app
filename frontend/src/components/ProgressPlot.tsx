import React from "react";
import { Exercise } from "./types";
import "bootstrap/dist/css/bootstrap.min.css";
import {LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid} from "recharts"

interface ProgressPlotProps{
    show: boolean;
    exercise: Exercise | null;
};

const ProgressPlot: React.FC<ProgressPlotProps> = ({show, exercise}) => {

    if (exercise === null || !show) {
        return (
            <div className={`mx-auto m-24 ${show ? "d-block" : "d-none"}`} style={{ width: "60vw", height: "50vh", justifyContent: "center"}}></div>
        );
    }

    const [key, setKey] = React.useState('volume');

    return (
        <div className={`border mx-auto m-24 ${show ? "d-block" : "d-none"}`}>
        <div className="col-sm-12 text-center">
            <button id="btnSearch" className="btn btn-primary btn-md left-block" style={{margin: "10px"}} onClick={() => {setKey('volume')}}>Volume</button>
            <button id="btnClear" className="btn btn-danger btn-md right-block" style={{margin: "10px"}} onClick={() => {setKey('max')}}>Max</button>
        </div>
        <div style={{ width: "60vw", height: "50vh", justifyContent: "center"}}>
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <LineChart width={48} height={48} data={exercise.more_info}>
                    <Tooltip />
                    <CartesianGrid stroke="#ccc" />
                    <Line dataKey={key}/>
                    <XAxis dataKey='date' />
                    <YAxis type="number" domain={['dataMin', 'dataMax']}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
        </div>
    );
};

export default ProgressPlot;