import React, {useState} from 'react';

const PhotoAlbumPhoto = () => {
    const [type, setType] = useState('day');
    return (
        <div className="photoAll--container">
            PhotoAlbumPhoto

            <div className="dayMonthYear--controller">
                <div className={type === "day" ? "dayBtn activeBtn" : "dayBtn"}
                     onClick={() => setType("day")}>일
                </div>
                <div className={type === "month" ? "monthBtn activeBtn" : "monthBtn"}
                     onClick={() => setType("month")}>월
                </div>
                <div className={type === "year" ? "yearBtn activeBtn" : "yearBtn"}
                     onClick={() => setType("year")}>연
                </div>
            </div>
        </div>
    );
}

export default PhotoAlbumPhoto;