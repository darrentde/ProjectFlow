import {Box} from "@chakra-ui/react"

function Todo() {
    return(
    <Box position='fixed' top ='56' left='400' bg='white' border ='0.1rem solid black' 
		width ='15rem' height='10rem'>
			<Box borderBottom='0.1rem' borderBottomColor='black' borderBottomStyle='ridge'>
				Header				
			</Box>
			<Box border='solid 1px' margin='2' height ='50px'>
				Body
			</Box>
    </Box>
    )
}

export default Todo


