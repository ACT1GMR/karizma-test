import React, {ReactElement, ReactNode} from 'react';
import {Container, Paper, List as MuiList, TextField, Box, CircularProgress} from "@mui/material";

type ListType<T> = {
    items: T[],
    render: (item: T) => ReactNode,
    noSearch?: boolean,
    onSearch?: (value: string) => any,
    loading?: boolean
}

function List<T>({items, render, noSearch, onSearch = e=>{}, loading}: ListType<T>) {
    return <Box display="flex" flexDirection="column" sx={{backgroundColor: '#fff', height: 'calc(100vh - 40px)', overflow: 'hidden'}}>
        {!noSearch &&
          <TextField onChange={e => onSearch(e.target.value)} sx={{m: 2}}
                     id="outlined-basic" label="Search" variant="outlined"/>}


        <MuiList sx={{height: '100%', overflowY: 'auto', textAlign: 'center'}}>
            {loading && <CircularProgress />}
            {
                items.map((item: T) => render(item))
            }
        </MuiList>
    </Box>
}

export default List;