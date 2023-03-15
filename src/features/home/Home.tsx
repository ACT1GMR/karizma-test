import * as React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectHome, fetchProductsThunk, fetchUsersThunk, removeItem, addItem, SelectedItem} from "./homeSlice";
import {useEffect, useState} from "react";
import List from "../../components/fake-list/List";
import AvatarDetailsListItem from "../../components/fake-list/AvatarDetailsListItem";
import BadgeListItem from "../../components/fake-list/BadgeListItem";
import {AddItem} from "../../app/types";
import {Box, Grid} from "@mui/material";


export default function Home() {
    const dispatch = useAppDispatch();
    const {users, usersLoading, productsLoading, selectedItems, products} = useAppSelector(selectHome);
    const [usersList, setUsersList] = useState(users);
    const [productsList, setProductsList] = useState(products);

    useEffect(() => {
        dispatch(fetchUsersThunk());
        dispatch(fetchProductsThunk());
    }, []);

    useEffect(() => {
        setUsersList(users);
        setProductsList(products);
    }, [users, products]);

    const addToItem = (item: AddItem) => dispatch(addItem(item));
    const filter = (value: string, type: 'users' | 'products') => {
        if (type === 'users') {
            setUsersList(filterList(value, users, ({
                                                       name: {
                                                           firstname,
                                                           lastname
                                                       }
                                                   }) => firstname.includes(value) || lastname.includes(value)))
        } else {
            setProductsList(filterList(value, products, ({title})=> title.includes(value)))
        }
    }


    return (
        <Box
            sx={{
                width: 1400,
                margin: '20px auto'
            }}>
            <Grid container spacing={6}>
                <Grid item xs={4}>
                    <List items={usersList}
                          onSearch={value => filter(value, "users")}
                          loading={usersLoading === 'loading'}
                          render={({id, email, name: {firstname, lastname}}) => <AvatarDetailsListItem key={id}
                                                                                                       subTitle={email}
                                                                                                       title={`${firstname} ${lastname}`}
                                                                                                       onClick={() => addToItem({
                                                                                                           id,
                                                                                                           text: firstname + lastname
                                                                                                       })}/>}/>
                </Grid>
                <Grid item xs={4}>
                    <List items={productsList}
                          onSearch={value => filter(value, "products")}
                          loading={productsLoading === 'loading'}
                          render={({id, title, description}) => <AvatarDetailsListItem key={id} title={title}
                                                                                       subTitle={description}
                                                                                       onClick={() => addToItem({
                                                                                           id,
                                                                                           text: title
                                                                                       })}/>}/>
                </Grid>
                <Grid item xs={4}>
                    <List items={selectedItems}
                          noSearch={true}
                          render={(item: SelectedItem) => <BadgeListItem key={item.id} title={item.text}
                                                                         onClick={() => dispatch(removeItem(item))}/>}/>
                </Grid>
            </Grid>

        </Box>

    );
}


function filterList<T>(value: string, list: Array<T>, filterCondition: (item: T) => boolean) {
    return value && value.trim() ? list.filter((item: T) => filterCondition(item)) : list;
}