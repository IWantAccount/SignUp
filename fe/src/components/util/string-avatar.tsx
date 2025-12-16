import Avatar from '@mui/material/Avatar';

//Převzato z MUI dokumentace: https://mui.com/material-ui/react-avatar/, upraveno pomocí ChatGPT (model 5.2, od OpenAI)
function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    const first = parts[0]?.[0] ?? "?";
    const second = parts[1]?.[0] ?? "";

    return {
        sx: {
            bgcolor: stringToColor(name),
            width: 56,
            height: 56,
            fontSize: 20,
            fontWeight: 600,
        },
        children: (first + second).toUpperCase(),
    };
}
interface Props {
    name: string;
}
export function StringAvatar({name}: Props) {
    return (
        <Avatar {...stringAvatar(name)} />
    )
}