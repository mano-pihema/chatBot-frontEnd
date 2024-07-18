# Job Interview Bot Front-End
Front end for a interview chatbot with streamed responses.

## Features

- Practise job interview answers
- Streamed responses from gemini flash 1.5
- Most recent response can be played aloud using a volume button

## Demo

Here is a Demo of the front end in action

[screen-capture (6).webm](https://github.com/user-attachments/assets/608d445c-bd4e-4735-a4de-3a106bb015b2)


## Set up

This repo depends on the backend [repo](https://github.com/mano-pihema/chatBot-backend). clone it first. 

1. **Clone the repository**:
   ```sh
   git clone https://github.com/mano-pihema/chatBot-frontEnd.git
   ```
2. **Change dir**:
   ```sh
   cd chatBot-frontEnd
   ```

3. **Create a .env file**:
   ```env
   VITE_GOOGLE_API_KEY=YOUR GOOGLE AI STUDIO KEY
   VITE_API_URL=https://texttospeech.googleapis.com/v1beta1/text:synthesize
   ```
4. **Install dependencies**:
   ```sh
   npm install
   ```
5. **Run App**:
    ```sh
   npm run dev
   ```

## Learning Goals
My main goal for the App overall was to get streamed responses from an AI model. I was able to do this with websockets. A stretch goal of mine was to have text to speech capability. I was able to acheive this with Google Cloud's text to speech API.    

## Tech
![chakraui](https://img.shields.io/badge/chakraui-319795?style=for-the-badge&logo=chakraui&logoColor=white)
![react](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![googlegemini](https://img.shields.io/badge/googlegemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)

