// import React, { useContext, useState } from "react";
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import {
//   Timestamp,
//   arrayUnion,
//   doc,
//   serverTimestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { v4 as uuid } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { db, storage } from "../firebase";

// const Input = () => {
//   const [text, setText] = useState("");
//   const [img, setImg] = useState(null);
//   const [sending, setSending] = useState(false);

//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);

//   const handleSend = async () => {
//     setSending(true);

//     if (img) {
//       const storageRef = ref(storage, uuid());
//       const uploadTask = uploadBytesResumable(storageRef, img);

//       uploadTask.on(
//         (error) => {
//           setSending(false);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             await updateDoc(doc(db, "chats", data.chatId), {
//               messages: arrayUnion({
//                 id: uuid(),
//                 text,
//                 senderId: currentUser.uid,
//                 date: Timestamp.now(),
//                 img: downloadURL,
//               }),
//             });
//             setText("");
//             setImg(null);
//             setSending(false);
//           });
//         }
//       );
//     } else {
//       await updateDoc(doc(db, "chats", data.chatId), {
//         messages: arrayUnion({
//           id: uuid(),
//           text,
//           senderId: currentUser.uid,
//           date: Timestamp.now(),
//         }),
//       });
//       setText("");
//       setSending(false);
//     }

//     await updateDoc(doc(db, "userChats", currentUser.uid), {
//       [data.chatId + ".lastmessage"]: {
//         text,
//       },
//       [data.chatId + ".date"]: serverTimestamp(),
//     });
//     await updateDoc(doc(db, "userChats", data.user.uid), {
//       [data.chatId + ".lastmessage"]: {
//         text,
//       },
//       [data.chatId + ".date"]: serverTimestamp(),
//     });
//   };

//   return (
//     <div className="input">
//       <input
//         type="text"
//         placeholder="Type something..."
//         onChange={(e) => setText(e.target.value)}
//         value={text}
//       />
//       <div className="send">
//         <img src={Attach} alt="" />
//         <input
//           type="file"
//           style={{ display: "none" }}
//           id="file"
//           onChange={(e) => setImg(e.target.files[0])}
//         />
//         <label htmlFor="file">
//           <img src={Img} alt="" />
//         </label>
//         <button onClick={handleSend} disabled={sending}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

import React, { useContext, useState } from 'react';
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../firebase';

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [sending, setSending] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    setSending(true);

    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setSending(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
            setText("");
            setImg(null);
            setImgUrl("");
            setSending(false);
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      setText("");
      setSending(false);
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastmessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastmessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      const imgUrl = URL.createObjectURL(file);
      setImgUrl(imgUrl);
    }
  };

  return (
    <div className='input'>
      <input type="text" placeholder='Type something...' onChange={(e) => setText(e.target.value)} value={text} />
      {imgUrl && <img src={imgUrl} alt="Selected Image" style={{ maxWidth: '100px', maxHeight: '100px' }}/>}
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{ display: "none" }} id='file' onChange={handleImgChange} />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend} disabled={sending}>Send</button>
      </div>
    </div>
  )
}

export default Input;
