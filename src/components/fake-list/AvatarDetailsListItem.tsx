import React from 'react';
import {AddItem} from "../../app/types";
import {Avatar, CardHeader, ListItem} from "@mui/material";


type AvatarDetailsListItem = {
    onClick: () => any,
    title: string,
    subTitle: string
}

function AvatarDetailsListItem({onClick, title, subTitle}: AvatarDetailsListItem) {
    return (
        <ListItem onClick={onClick} sx={{cursor: 'pointer'}}>
            <CardHeader
                avatar={
                    <Avatar alt={title}
                            title={subTitle}
                    />
                }
                title={title}
                titleTypographyProps={{color: "#000", fontWeight: "bold"}}
                subheader={subTitle}
                subheaderTypographyProps={{color: "#999"}}
            />

        </ListItem>
    );
}

export default AvatarDetailsListItem;