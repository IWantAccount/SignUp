import {Box, Drawer} from "@mui/material";
import SignLanguageIcon from '@mui/icons-material/SignLanguage';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExtensionIcon from '@mui/icons-material/Extension';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {NavItemList} from "@/components/util/nav-item-list.tsx";
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

//Část kódu jsem převzal z oficiální dokumentace MUI: https://mui.com/material-ui/react-drawer/

interface Props {
    open: boolean;
    onClose: () => void;
}

export function SideBar(props: Props) {

    const itemsWithColor = [
        {

            //TODO správný routing, ne debug
            color: "primary",
            list: [
                {text: "Znaky", Icon: SignLanguageIcon, href: "/app/debug/signs"},
                {text: "Předměty", Icon: SchoolIcon, href: "/app/subjects"},
                {text: "Kategorie", Icon: CategoryIcon, href: "/app/categories"},
                {text: "Třídy", Icon: GroupIcon, href: "/app/classrooms"}
            ]
        },

        {
            color: "primary",
            list: [
                {text: "Soukormé kolekce znaků", Icon: BookmarksIcon, href: "/app/private-collections"},
                {text: "Přidat soukromou kolekci", Icon: BookmarkAddIcon, href: "/app/private-collections/create"},
            ]
        },

        {
            //TODO podmíněně jen pro učitele a adminy
            color: "secondary",
            list: [
                {text: "Přidat znak", Icon: SignLanguageIcon, href: "/app/signs/create"},
                {text: "Přidat předmět", Icon: SchoolIcon, href: "/app/subjects/create"},
                {text: "Přidat kategorii", Icon: CategoryIcon, href: "/app/categories/create"},
                {text: "Uživatelé", Icon: AccountCircleIcon, href: "/app/users"},
                {text: "Komponenty znaku", Icon: ExtensionIcon, href: "/app/sign-components"},
                {text: "Přidat komponentu znaku", Icon: AddBoxIcon, href: "/app/sign-components/create"},
                {text: "Přidat třídu", Icon: GroupAddIcon, href: "/app/classrooms/create"},

                //TODO pro adminy ještě správa uživatelů
            ]
        }
    ]



    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <NavItemList listOfLists={itemsWithColor}></NavItemList>
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