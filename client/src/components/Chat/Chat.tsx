import React from 'react'
import AllMessage from './AllMessage'
import ChatInput from './ChatInput'

const Chat = () => {
  return (
    <div className='w-full h-full flex flex-col'>
        <AllMessage />
        <ChatInput />
    </div>
  )
}

export default Chat