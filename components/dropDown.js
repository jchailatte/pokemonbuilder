import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@material-ui/core";
//add propTypes later

const Dropdown = (props) => {

    return (
        <FormControl
            style={{ width: '100%' }}
            variant="outlined"
        >
            <InputLabel>
                {props.label}
            </InputLabel>
            <Select
                label={props.label}
                onChange={(e) => props.onChange(e.target.value)}
                style={{
                    width: '100%'
                }}
                value={props.value}
            >
                <MenuItem
                    value={""}
                >
                    <em>None</em>
                </MenuItem>
                {props.list.map((item, i) => {
                    return (
                        <MenuItem
                            key={props.label + i}
                            value={props.concat === undefined ? item.name : item[props.concat].name}
                        >
                            {props.concat === undefined ? item.name.toUpperCase() : item[props.concat].name.toUpperCase()}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}

export default Dropdown;