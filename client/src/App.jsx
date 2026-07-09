import React from 'react'

import {
    Button,
    Input,
    Textarea,
} from "@scan/ui";



function App() {
  return (
    <>
        <div className="space-y-6 max-w-md p-8 bg-gray-100">
            <Input
                label="Restaurant Name"
                placeholder="Enter restaurant"
                helperText="Visible to customers"
            />

            <Input
                label="Email"
                error="Email already exists"
            />

            <Textarea
                label="Description"
                rows={4}
            />

            <Button>
                Save
            </Button>
        </div>
    </>
  )
}

export default App