import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import React from "react"

function AlertDialogExample({ isOpen, onOpen, onClose, setToDoList, showToast }) {
    const cancelRef = React.useRef()

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Bạn đồng ý xóa chứ ?
                        </AlertDialogHeader>

                        <AlertDialogBody fontWeight={500}>
                            Sau khi bấm đồng ý, tất cả những công việc chưa hoàn thành sẽ bị xóa.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => {
                                onClose()
                                setToDoList([])
                                showToast('Thành công!', 'Toàn bộ công việc chưa hoàn thành đã bị xóa', 'warning')
                            }
                            } ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default AlertDialogExample