import React from 'react';
import {Chip} from "@mui/material";



type BadgeListItem = {
    onClick: () => any,
    title: string
}

function AvatarDetailsListItem({title, onClick}: BadgeListItem) {
    return (
        <Chip label={title} onDelete={onClick} sx={{ m: 0.5 }}/>
    );
}

export default AvatarDetailsListItem;