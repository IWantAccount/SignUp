import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import SignLanguageIcon from '@mui/icons-material/SignLanguage';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

//Část kódu jsem převzal z oficiální dokumentace MUI: https://mui.com/material-ui/react-drawer/

interface Props {
    open: boolean;
    onClose: () => void;
}

interface NavItem {
    text: string;
    Icon: React.ElementType;
    href: string;
}

export function SideBar(props: Props) {

    const items: NavItem[] = [
        {text: "Znaky", Icon: SignLanguageIcon, href: "/"},
        {text: "Předměty", Icon: SchoolIcon, href: "/"},
        {text: "Kategorie", Icon: CategoryIcon, href: "/"},

    ]

    const itemsUnderline: NavItem[] = [
        {text: "Privátní kolekce", Icon: BookmarksIcon, href: "/bookmarks"},
    ]



    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                {items.map(({text, Icon, href}, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton href={href}>
                            <ListItemIcon>
                                <Icon color="primary"></Icon>
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {itemsUnderline.map(({text, Icon, href}, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton href={href}>
                        <ListItemIcon>
                            <Icon color="secondary"></Icon>
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer open={props.open} onClose={props.onClose}>
                {DrawerList}
            </Drawer>
        </div>
    );
}