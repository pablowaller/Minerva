import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { GiftedChat, Bubble, Send, MessageImage, Avatar } from 'react-native-gifted-chat';
import { auth, db, storage } from '../constants/Database';
import { collection, addDoc, orderBy, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EmojiPicker from 'rn-emoji-keyboard';

const ImagePickerComponent = Platform.select({
  web: () => {
    const fileInputRef = useRef(null);
    
    const handlePress = () => fileInputRef.current?.click();
    
    return (
      <>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                onImageSelected(event.target.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <TouchableOpacity onPress={handlePress}>
          <Icon name="photo-camera" size={24} color="#2D93AD" />
        </TouchableOpacity>
      </>
    );
  },
  default: ({ onImageSelected }) => {
    const handlePress = async () => {
      const { launchImageLibrary } = await import('react-native-image-picker');
      launchImageLibrary(
        { mediaType: 'photo', quality: 0.7 },
        async (response) => {
          if (!response.didCancel && !response.error) {
            onImageSelected(response.assets[0].uri);
          }
        }
      );
    };
    
    return (
      <TouchableOpacity onPress={handlePress}>
        <Icon name="photo-camera" size={24} color="#2D93AD" />
      </TouchableOpacity>
    );
  }
});

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const audioRecorderRef = useRef(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const setupAudio = async () => {
        const { default: AudioRecorderPlayer } = await import('react-native-audio-recorder-player');
        audioRecorderRef.current = new AudioRecorderPlayer();
      };
      setupAudio();
    }
  }, []);

  const uploadFile = async (uri, fileType) => {
    try {
      let blob;
      
      if (Platform.OS === 'web') {
        const response = await fetch(uri);
        blob = await response.blob();
      } else {
        const response = await fetch(uri);
        blob = await response.blob();
      }

      const storageRef = ref(storage, `chats/${Date.now()}_${fileType}`);
      await uploadBytes(storageRef, blob);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handleImageSelected = async (imageUri) => {
    try {
      const imageUrl = await uploadFile(imageUri, 'image');
      const newMessage = {
        _id: Math.random().toString(),
        createdAt: new Date(),
        user: {
          _id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          avatar: auth.currentUser.photoURL,
        },
        image: imageUrl,
      };
      onSend([newMessage]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo subir la imagen');
    }
  };

  const handleAudioRecording = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Info', 'La grabación de audio no está disponible en la versión web');
      return;
    }

    if (isRecording) {
      try {
        const audioPath = await audioRecorderRef.current.stopRecorder();
        setIsRecording(false);
        
        const audioUrl = await uploadFile(audioPath, 'audio');
        const newMessage = {
          _id: Math.random().toString(),
          createdAt: new Date(),
          user: {
            _id: auth.currentUser.uid,
            name: auth.currentUser.displayName,
            avatar: auth.currentUser.photoURL,
          },
          audio: audioUrl,
        };
        onSend([newMessage]);
      } catch (error) {
        console.error("Error handling audio:", error);
      }
    } else {
      try {
        await audioRecorderRef.current.startRecorder();
        setIsRecording(true);
      } catch (error) {
        console.error("Error starting recorder:", error);
      }
    }
  };

  // Eliminar mensaje
  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(db, 'chats', messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const onSend = useCallback(async (messages = []) => {
    const newMessage = messages[0];
    
    try {
      await addDoc(collection(db, 'chats'), {
        ...newMessage,
        user: {
          _id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          avatar: auth.currentUser.photoURL,
        },
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, []);

  useLayoutEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          image: doc.data().image,
          audio: doc.data().audio,
          user: doc.data().user,
        }))
      );
    });
    
    return unsubscribe;
  }, []);

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#f0f0f0',
          marginVertical: 2,
        },
        right: {
          backgroundColor: '#2D93AD',
          marginVertical: 2,
        },
      }}
      textStyle={{
        left: { color: '#000' },
        right: { color: '#fff' },
      }}
    />
  );

  const renderMessageImage = (props) => (
    <View style={{ padding: 5 }}>
      <MessageImage
        {...props}
        imageStyle={{
          width: 200,
          height: 200,
          borderRadius: 10,
        }}
      />
      {props.currentMessage.user._id === auth.currentUser?.uid && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteMessage(props.currentMessage._id)}
        >
          <Icon name="delete" size={16} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderAudioMessage = (props) => (
    <View style={styles.audioContainer}>
      <TouchableOpacity
        style={styles.audioButton}
        onPress={() => {
          if (Platform.OS === 'web') {
            new Audio(props.currentMessage.audio).play();
          } else {
            audioRecorderRef.current.startPlayer(props.currentMessage.audio);
          }
        }}
      >
        <Icon name={isRecording ? "stop" : "play-arrow"} size={24} color="#fff" />
      </TouchableOpacity>
      {props.currentMessage.user._id === auth.currentUser?.uid && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteMessage(props.currentMessage._id)}
        >
          <Icon name="delete" size={16} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderSend = (props) => (
    <Send {...props} containerStyle={styles.sendContainer}>
      <Icon name="send" size={24} color="#2D93AD" />
    </Send>
  );

  const renderAccessory = () => (
    <View style={styles.accessoryContainer}>
      <ImagePickerComponent onImageSelected={handleImageSelected} />
      <TouchableOpacity onPress={handleAudioRecording}>
        <Icon
          name={isRecording ? "stop" : "mic"}
          size={24}
          color={isRecording ? "#ff0000" : "#2D93AD"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsEmojiPickerOpen(true)}>
        <Icon name="emoji-emotions" size={24} color="#2D93AD" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: auth.currentUser?.uid,
          name: auth.currentUser?.displayName,
          avatar: auth.currentUser?.photoURL,
        }}
        renderBubble={renderBubble}
        renderMessageImage={renderMessageImage}
        renderSend={renderSend}
        renderAccessory={renderAccessory}
        renderAvatar={(props) => (
          <Avatar
            {...props}
            imageStyle={{
              left: { width: 36, height: 36, borderRadius: 18 },
              right: { width: 36, height: 36, borderRadius: 18 },
            }}
          />
        )}
        renderCustomView={(props) => {
          if (props.currentMessage.audio) {
            return renderAudioMessage(props);
          }
          return null;
        }}
        alwaysShowSend
        scrollToBottom
        scrollToBottomComponent={() => (
          <Icon name="keyboard-arrow-down" size={24} color="#2D93AD" />
        )}
      />
      
      <EmojiPicker
        open={isEmojiPickerOpen}
        onClose={() => setIsEmojiPickerOpen(false)}
        onEmojiSelected={(emoji) => {
          const newMessage = {
            _id: Math.random().toString(),
            text: emoji.emoji,
            createdAt: new Date(),
            user: {
              _id: auth.currentUser.uid,
              name: auth.currentUser.displayName,
              avatar: auth.currentUser.photoURL,
            },
          };
          onSend([newMessage]);
          setIsEmojiPickerOpen(false);
        }}
        theme={{
          knob: '#2D93AD',
          container: '#f5f5f5',
        }}
        styles={{
          container: {
            borderRadius: 0,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accessoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fff',
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#2D93AD',
    borderRadius: 20,
    margin: 8,
    maxWidth: '70%',
  },
  audioButton: {
    padding: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ff0000',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;