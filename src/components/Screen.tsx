import {Box} from "@chakra-ui/react";
import {InputTypes} from "../types/input.types";
import '../stylesheets/Screen.css';


const Screen = (props: InputTypes) => {
  return (
    <Box className={'input'}>
      {props.input}
    </Box>
  )
}

export default Screen;