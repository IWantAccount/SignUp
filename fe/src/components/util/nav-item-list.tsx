import type {NavItem} from "@/utils/nav-item.tsx";
import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Fragment} from "react";


interface ListWithColor {
    color: string;
    list: NavItem[];
}

interface Props {
    listOfLists: ListWithColor[];
}

export function NavItemList({ listOfLists }: Props) {
    return (
        <>
            {listOfLists.map((section, i) => (
                <Fragment key={i}>
                    <List>
                        {section.list.map(({ text, Icon, href }) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton href={href}>
                                    <ListItemIcon>
                                        <Icon color={section.color} />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    {i < listOfLists.length - 1 && <Divider />}
                </Fragment>
            ))}
        </>
    );
}