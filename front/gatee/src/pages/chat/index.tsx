import React, { useEffect, useRef, useState } from 'react';
import BubbleChat from "@pages/chat/components/BubbleChat";
import ChatInput from "@pages/chat/components/ChatInput";
import ChatDate from "@pages/chat/components/ChatDate";
import { ChatSample } from "@constants/index";
import { ChatContent, ChatDateLine, ChatType } from "@type/index";

// import SockJS from "sockjs-client";
import firebase from "../../config";
import 'firebase/auth';
import 'firebase/database';

const ChatIndex = () => {
  const [messages, setMessages] = useState<(ChatContent | ChatDateLine)[]>([]);
  const [newMessage, setNewMessage] = useState<ChatContent | null>(null);
  const { REACT_APP_API_URL, VALID_KEY } = process.env;

  const [data, setData] = useState<any>([]);
  const familyId = "1";
  const userRef = firebase.database().ref(`chat/${familyId}`)
  const firestore = firebase.database();

  useEffect(() => {
    // userRef.push({content: "안녕"})

    firebase.auth().currentUser?.getIdToken(
      true
    ).then((idToken) => {
      console.log(idToken);
    }).catch((error) => {
      console.log(error)
    })

    // userRef.on('value', snapshot => {
    //   const users = snapshot.val();
    //   console.log(users)
    //   const usersData = [];
    //   for(let id in users) {
    //     usersData.push({ ...users[id], id });
    //   }
    //   console.log(usersData);
    //   setData(usersData);
    // })
  }, []);


  // let sock = new SockJS(`${REACT_APP_API_URL}/chat`);
  // useEffect(() => {
  //   // connect();
  //
  //   return () => {
  //     // disconnect();
  //   };
  // }, []);
  //
  // useEffect(() => {
  //   // send();
  // }, [newMessage]);

  // const connect = () => {
  //   sock.onopen = () => {
  //     console.log('WebSocket connection opened');
  //   };
  // }
  //
  // const disconnect = () => {
  //   sock.onclose = () => {
  //     console.log('WebSocket connection closed');
  //   };
  // }

  // const send = () => {
  //
  // }

  // 이전 채팅과 현재 채팅의 보낸 사람이 같은지 여부에 따라 props 설정
  const setPrevProps = (prevChat: ChatContent, currentChat: ChatContent) => {
    if (prevChat) {
      return { isPrevSender: prevChat.sender === currentChat.sender };
    }
    return { isPrevSender: false };
  };

  // 채팅 버블 렌더링
  const renderChatBubble = ChatSample.map((chat: ChatContent | ChatDateLine, index: number) => {
    const prevChat = index < ChatSample.length - 1 ? ChatSample[index + 1] : null;

    switch (chat.messageType) {
      case ChatType.DATE_LINE:
        return (
          <ChatDate
            key={index}
            chat={chat as ChatDateLine}
          />
        );
      default:
        return (
          <BubbleChat
            key={index}
            chat={chat as ChatContent}
            {...setPrevProps(prevChat as ChatContent, chat as ChatContent)}
          />
        );
    }
  });

  return (
    <div className="chat">
      <div className="chat__main">
        {renderChatBubble}
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatIndex;