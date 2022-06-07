import { Box } from "@chakra-ui/react";
import Todo3 from "./TodoSimple";

function Todo() {
  return (
    <Box
      position="absolute"
      top="200px"
      left="160px"
      bg="white"
      border="0.1rem solid black"
      width="15rem"
      //   height="10rem"
    >
      <Todo3 />
      {/* <Box borderBottom='0.1rem' borderBottomColor='black' borderBottomStyle='ridge'>
				Header				
			</Box>
			<Box border='solid 1px' margin='2' height ='50px'>
				Body
			</Box> */}
    </Box>
  );
}

export default Todo;
