import React from 'react'

import {
    Button,
    IconButton,
    ButtonGroup,
} from "@scan/ui";


function App() {
  return (
    <>
    
    <h1 className='text-2xl text-blue-500 font-bold'>Welcome to Scan and Dine</h1>
  <ButtonGroup>
            <Button>Save</Button>

            <Button variant="outline">
                Cancel
            </Button>

            <Button loading>
                Save
            </Button>

            <IconButton aria-label="Delete">
                X
            </IconButton>
        </ButtonGroup>
    </>
  )
}

export default App