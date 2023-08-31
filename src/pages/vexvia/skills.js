import React from "react";
import { useParams } from "react-router-dom";

const SkillsRankings = () => {
    const { event_id } = useParams();
    return (
        <div>
            {event_id}
        </div>
    )
}

export default SkillsRankings