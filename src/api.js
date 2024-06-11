import superAgent from 'superagent'

async function textToSpeech(text) {
  const payload = {
    audioConfig: {
      audioEncoding: 'MP3',
      pitch: 0,
      speakingRate: 1,
    },
    input: {
      text: text,
    },
    voice: {
      languageCode: 'en-US',
      name: 'en-US-Standard-A',
    },
  }

  try {
    const response = await superAgent
      .post('http://localhost:3000/audio')
      .send(payload)

    return response.body
  } catch (error) {
    console.error(error)
  }
}

export default textToSpeech
