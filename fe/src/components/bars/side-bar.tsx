import {Box, Drawer} from "@mui/material";
import SignLanguageIcon from '@mui/icons-material/SignLanguage';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import {NavItemList} from "@/components/util/nav-item-list.tsx";

//Část kódu jsem převzal z oficiální dokumentace MUI: https://mui.com/material-ui/react-drawer/

interface Props {
    open: boolean;
    onClose: () => void;
}

export function SideBar(props: Props) {

    const itemsWithColor = [
        {
            color: "primary",
            list: [
                {text: "Znaky", Icon: SignLanguageIcon, href: "/"},
                {text: "Předměty", Icon: SchoolIcon, href: "/"},
                {text: "Kategorie", Icon: CategoryIcon, href: "/"},
            ]
        },

        {
            color: "primary",
            list: [
                {text: "Privátní kolekce", Icon: BookmarksIcon, href: "/bookmarks"},
            ]
        },

        {
            color: "secondary",
            list: [
                {text: "Přidat znak", Icon: SignLanguageIcon, href: "/"},
                {text: "Přidat předmět", Icon: SchoolIcon, href: "/"},
                {text: "Přidat kategorii", Icon: CategoryIcon, href: "/"},
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