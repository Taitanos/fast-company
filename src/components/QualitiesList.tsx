import React from "react";
import {QualityType} from "../api/fake.api/user.api";
import Quality from "./Quality";

type PropsType = {
    qualities: QualityType[]
}

function QualitiesList ({qualities}: PropsType) {
    return (
        <>
            {qualities.map ((qual) => (
                <Quality key={qual._id} qualName={qual.name} qualColor={qual.color}/>
            ))}
        </>
    )
}

export default QualitiesList;