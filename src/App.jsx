import {
  Input,
  Box,
  Button,
  Text,
  Stack,
  Container,
  Heading,
  IconButton,
  Collapse,
  Fade,
} from '@chakra-ui/react'
import { IoVolumeOffOutline } from 'react-icons/io5'

import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import textToSpeech from './api'

function App() {
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])
  const [title, setTitle] = useState('')
  const [audio, setAudio] = useState()
  const [show, setShow] = useState(true)

  useEffect(() => {
    const socket = io('http://localhost:3000')
    socket.on('message', (data) => {
      setHistory((prev) =>
        processHistory([...prev, { role: 'model', parts: [{ text: data }] }])
      )
    })
  }, [])

  async function sendInput(event) {
    event.preventDefault()

    console.log(history)
    if (!message) return
    setHistory((prev) => [
      ...prev,
      { role: 'user', parts: [{ text: message }] },
    ])

    const socket = io('http://localhost:3000')
    socket.on('connect', () => socket.emit('chat', { message, history }))

    setMessage('')
  }

  function establishTitle(event) {
    event.preventDefault()
    setShow(false)
    setHistory([
      {
        role: 'user',
        parts: [
          { text: `Hello, I am interviewing for the job title of ${title}.` },
        ],
      },
      {
        role: 'model',
        parts: [{ text: 'Tell me more about yourself' }],
      },
    ])
  }

  function processHistory(history) {
    let result = []
    let buffer = []

    for (let chat of history) {
      if (chat.role === 'model') {
        buffer.push(chat.parts[0].text)
      } else {
        if (buffer.length > 0) {
          result.push({ role: 'model', parts: [{ text: buffer.join(' ') }] })
          buffer = []
        }
        result.push(chat)
      }
    }

    if (buffer.length > 0) {
      result.push({ role: 'model', parts: [{ text: buffer.join(' ') }] })
      ;(async () => {
        const { audioContent } = await textToSpeech(buffer.join(' '))
        const audioSrc = `data:audio/mp3;base64,${audioContent}`
        setAudio(audioSrc)
      })()
    }
    console.log('process', result)
    return result
  }

  function playAudio() {
    const audioPlayer = document.getElementById('audioPlayer')
    if (audioPlayer) {
      audioPlayer.play()
    }
  }

  return (
    <>
      <Container maxW='container.md'>
        <Heading>A I nterviewer </Heading>
        <Box>
          <Text>Job Title</Text>
          <Stack direction={'row'} paddingBottom={2}>
            <Input
              borderWidth='4px'
              borderRadius='lg'
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              readOnly={!show}
            />
            <Fade in={show}>
              <Button onClick={establishTitle}>submit</Button>
            </Fade>
          </Stack>
        </Box>
        <Box borderWidth='4px' borderRadius='lg' minHeight={300}>
          <Stack spacing={2} alignItems='flex-start'>
            {history.map(({ role, parts }, i) => {
              return (
                <Box
                  display='inline-block'
                  borderRadius={'sm'}
                  padding={2}
                  key={i}
                  backgroundColor={role == 'user' ? '#B2F5EA' : '#BEE3F8'}
                  alignSelf={role === 'user' ? 'flex-start' : 'flex-end'}
                  onClick={playAudio}
                >
                  {role == 'user' ? (
                    <Text>
                      {'Me'}: {parts[0].text}
                    </Text>
                  ) : (
                    <Text>{parts[0].text}</Text>
                  )}
                  {audio && i == history.length - 1 && role == 'model' && (
                    <>
                      <IconButton
                        onClick={playAudio}
                        icon={<IoVolumeOffOutline />}
                      />
                      <audio
                        controls
                        src={audio}
                        id='audioPlayer'
                        style={{ display: 'none' }}
                      />
                    </>
                  )}
                </Box>
              )
            })}
          </Stack>
        </Box>
        <Collapse in={!show}>
          <Stack direction={'row'} paddingTop={2}>
            <Input
              borderWidth='4px'
              borderRadius='lg'
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <Button onClick={sendInput}>send message</Button>
          </Stack>
        </Collapse>
      </Container>
    </>
  )
}

export default App
