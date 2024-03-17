import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'

const FirstAccessModal = ({ usernameRef, setLocalUsername, isOpen, onClose, }) => {

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Vui lòng nhập tên người dùng</ModalHeader>
                    <ModalBody>
                        <Input ref={usernameRef} placeholder='Hãy nhập tên người dùng của bạn' />
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={setLocalUsername} colorScheme='blue' mr={3}>
                            Bắt đầu
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default FirstAccessModal