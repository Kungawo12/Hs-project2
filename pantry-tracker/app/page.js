"use client"

import {Box,Stack,Typography,Button, Modal,TextField} from '@mui/material'
import { firestore } from '../firebase.js'
import { collection, doc ,getDoc,query,setDoc,deleteDoc, getDocs} from 'firebase/firestore'
import { useEffect, useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  display :'flex',
  flexDirection: 'column',
  p: 4,
  gap: 3
};


export default function Home() {
  const [pantry, setPantry] = useState([])

  const [open,setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [itemName, setItemName] = useState('')

  const updatePantry = async () => {
    const snapshot = query(collection(firestore,'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push({'name': doc.id,...doc.data()})
    })
    console.log(pantryList)
    setPantry(pantryList)
  }

  useEffect(() => {
    updatePantry();
  }, [])

  // Add item function
  const addItem = async (item) => {
    const docRef = doc(collection(firestore,'pantry'),item)
    // check if the item already exists
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      await setDoc(docRef,{count: count + 1})
    }
    else{
    await setDoc(docRef, {count:1})
    }
    await updatePantry()
  }

  // delete item function
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore,'pantry'),item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      if (count === 1) {
        await deleteDoc(docRef)
      }
      else{
        await setDoc(docRef,{count: count - 1})
      }
    }
    await updatePantry()
  }
  return(
    <Box 
    width="100vw" 
    height='100vh'
    display={'flex'}
    justifyContent={'center'}
    flexDirection={'column'}
    alignItems={'center'}
    gap={2}
    >
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography 
          id="modal-modal-title" 
          variant="h6" 
          component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField 
            id="outlined-basic" 
            label="Item" 
            variant="outlined" 
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}

            />
            <Button 
            variant='outlined'
            onClick={() =>{
              addItem(itemName)
              setItemName('')
              handleClose()
            }}
            >
              Add</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
    <Button variant='contained'
    onClick={handleOpen}
    >Add</Button>
      <Box border={'1px solid #333'}>
        <Box width='800px' 
        height='100px' 
        bgcolor={'#ADD8E6'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        >
        <Typography
        variant={'h2'}
        color={'#333'}
        textAlign={'center'}
        >
          Pantry Tracker
        </Typography>
        
        </Box>
      <Stack width="800px" 
      height='300px' 
      spacing={2} 
      overflow={'auto'}
      >
      {pantry.map(({name,count}) => (
          <Box 
          key = {name}
          width="100%"
          minHeight="150px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="#f0f0f0"
          paddingX={5}
          >
            <Typography
            variant={"h3"}
            color={'#333'}
            textAlign={'center'}
            
            >
              {
                // Capitalize the first letter of the item
                name.charAt(0).toUpperCase() + name.slice(1)
              }
            </Typography>
            <Typography
            variant={"h3"} color={'#333'} textAlign={'center'}>
              quantity: {count}
            </Typography>
            <Button variant='contained' onClick={() => removeItem(name)}>
              Remove
              </Button>
            </Box>
        ))}
      </Stack>
      </Box>
    </Box>
  ) 
}