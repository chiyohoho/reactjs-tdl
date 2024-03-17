import { Box, useDisclosure } from "@chakra-ui/react";
import HeaderComponent from "./Components/Header/HeaderComponent";
import MainComponent from "./Components/Main/MainComponent";
import { useEffect, useRef, useState } from "react";
import FirstAccessModal from "./Components/Modal/FirstAccessModal";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const usernameRef = useRef(null)

  const [username, setUsername] = useState(JSON.parse(localStorage.getItem('USERNAME')) || '')

  useEffect(() => {
    if (!localStorage.getItem('USERNAME')) {
      onOpen();
    }
  }, []);

  const setLocalUsername = () => {
    const valueInput = usernameRef.current.value
    localStorage.setItem('USERNAME', JSON.stringify(valueInput))
    setUsername(valueInput)
    onClose()
  }



  return (
    <Box height={'100vh'} backgroundImage={'https://feastables.com/cdn/shop/files/PaperTextureBg.jpg'}>
      <HeaderComponent username={username} />
      <MainComponent />
      <FirstAccessModal setLocalUsername={setLocalUsername} usernameRef={usernameRef} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Box>
  );
}

export default App;
