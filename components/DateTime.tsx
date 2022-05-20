import {Box, Text} from "@chakra-ui/layout"
import {useState, useEffect} from "react"

function DateTime() {
    const [dateState, setDateState] = useState(new Date())

    useEffect(() => {
        setInterval(() => setDateState(new Date()))
    }, []
    )
    return(
        <Box>
            {/* <Text textAlign='center'>Remaining space</Text> */}
            <Text align='center' fontSize='40px'>
                {dateState.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })}
            </Text>
            
            <Text align='center' fontSize='40px'>
                {dateState.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                })}
            </Text>
              
        </Box>
    )
    
}

export default DateTime