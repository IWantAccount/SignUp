import {IconButton, TextField, Toolbar, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from "react";

interface Props {
    title: string;
    onEditNavigate: () => void;
    onDelete: () => void;
    onSearch: (newValue: string) => void;
}

export function SearchableCardSectionTopBar({ title, onEditNavigate, onDelete, onSearch }: Props) {
    const [searchValue, setSearchValue] = React.useState("");

    const handleSearchClick = () => {
        onSearch(searchValue);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }
    return (
        <Toolbar sx={{display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 2, width: "100%"}}>
            <Typography variant="h6">{title}</Typography>
            {/*TODO renderovat edit a delete jen pro správné oprávnění*/}
            <IconButton onClick={onEditNavigate}>
                <EditIcon/>
            </IconButton>
            <IconButton onClick={onDelete}>
                <DeleteForeverIcon/>
            </IconButton>
            <TextField variant="outlined" label="hledat" onChange={handleInputChange} />
            <IconButton onClick={handleSearchClick}>
                <SearchIcon/>
            </IconButton>
        </Toolbar>
    )
}