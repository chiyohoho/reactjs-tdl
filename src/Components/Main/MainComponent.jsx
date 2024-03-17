import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Center, Flex, Grid, Input, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { MdAutorenew } from "react-icons/md";
import { Tooltip } from '@chakra-ui/react'
import AlertDialogExample from '../Modal/AlertModal';

const formatNumber = (number) => {
    return number < 10 ? '0' + number : number;
};

const MainComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [toDoList, setToDoList] = useState(JSON.parse(localStorage.getItem('TODOLIST')) || []);
    const [completedList, setCompletedList] = useState(JSON.parse(localStorage.getItem('COMPLETEDLIST')) || []);
    const [actionLog, setActionLog] = useState(JSON.parse(localStorage.getItem('ACTIONLOG')) || [])

    const [task, setTask] = useState('')

    const toast = useToast();

    useEffect(() => {
        localStorage.setItem('TODOLIST', JSON.stringify(toDoList))
        localStorage.setItem('COMPLETEDLIST', JSON.stringify(completedList))
        localStorage.setItem('ACTIONLOG', JSON.stringify(actionLog))
    }, [toDoList, completedList, actionLog])



    const showToast = (title, description, status) => {
        toast({
            title: title,
            description: description,
            status: status,
            duration: 3000,
            isClosable: true,
            position: 'top'
        });
    }

    const handleAddTask = () => {
        const checkDuplicatedToDoList = toDoList.some(item => task === item.nameTask)
        const checkDuplicatedCompletedList = completedList.some(item => task === item.nameTask)

        if (checkDuplicatedToDoList || checkDuplicatedCompletedList) {
            showToast('Cảnh báo!', `${task} đã tồn tại trong danh sách`, 'error')
        } else {
            if (task) {
                showToast('Thêm công việc thành công!', `${task} vào danh sách việc cần làm`, 'success')
                setTask('')
                const newTask = {
                    id: Math.floor(Math.random() * 1000) + 1,
                    nameTask: task,
                    isCompleted: false,
                    date: {
                        day: formatNumber(new Date().getDate()),
                        month: formatNumber(new Date().getMonth() + 1),
                        year: new Date().getFullYear(),
                        hour: formatNumber(new Date().getHours()),
                        minute: formatNumber(new Date().getMinutes()),
                        second: formatNumber(new Date().getSeconds())
                    },
                    action: 'Thêm công việc'
                }
                setToDoList(prevState => [...prevState, newTask]);
                setActionLog(prevState => [...prevState, newTask])
            } else {
                showToast('Thêm công việc thất bại!', `hãy nhập 1 công việc và thử lại`, 'error')
            }
        }


    }

    const handleDeleteTask = (objectTask) => {
        const newToDoList = toDoList.filter(item => item.id !== objectTask.id);
        const taskDelete = { ...objectTask, action: 'Xóa bỏ công việc' }

        showToast('Đã xóa thành công', `${objectTask.nameTask} đã bị xóa khỏi danh sách`, 'warning');
        setToDoList(newToDoList);
        setActionLog(prevState => [...prevState, taskDelete]);
    }

    const handleAddToCompletedList = (objectTask) => {
        const newToDoList = toDoList.filter(item => item.id !== objectTask.id)
        const taskRemoved = {
            ...objectTask,
            date: {
                day: formatNumber(new Date().getDate()),
                month: formatNumber(new Date().getMonth() + 1),
                year: new Date().getFullYear(),
                hour: formatNumber(new Date().getHours()),
                minute: formatNumber(new Date().getMinutes()),
                second: formatNumber(new Date().getSeconds())
            },
            action: 'Hoàn thành công việc'
        }


        showToast('Hoàn thành công việc', `${objectTask.nameTask} đã được hoàn thành`, 'success')
        setCompletedList(prevState => [...prevState, taskRemoved])
        setActionLog(prevState => [...prevState, taskRemoved])
        setToDoList(newToDoList)
    }

    const checkBeforeDelete = () => {
        if (toDoList.length > 0) {
            onOpen()
        } else {
            showToast('Lưu ý!', 'Danh sách việc cần làm hiện đang trống', 'warning')
        }
    }

    const returnTask = (objectTask) => {
        const newCompletedList = completedList.filter(item => item.id !== objectTask.id)
        const returnTask = {
            ...objectTask,
            date: {
                day: formatNumber(new Date().getDate()),
                month: formatNumber(new Date().getMonth() + 1),
                year: new Date().getFullYear(),
                hour: formatNumber(new Date().getHours()),
                minute: formatNumber(new Date().getMinutes()),
                second: formatNumber(new Date().getSeconds())
            },
            action: 'Hoàn tác công việc'
        }
        setCompletedList(newCompletedList)
        setToDoList(prevState => [...prevState, returnTask])
        setActionLog(prevState => [...prevState, returnTask])

    }

    return (
        <Center>
            <Flex gap={30} mt={10}>
                <Box bg={'#58dcff'} px={3} py={5} rounded={10} width={'40vw'} border={'5px solid black'} height={'fit-content'}>
                    <Flex gap={2} alignItems={'center'}>
                        <Input value={task} onChange={(e) => setTask(e.target.value)} _placeholder={{ color: 'black', fontWeight: '500' }}
                            _focus={{ border: '3px solid black' }} outline={'none'} _active={{ border: '3px solid black' }} _hover={{ border: '3px solid black' }} border={'3px solid black'} width={'100%'} placeholder='Thêm công việc cần làm...' />
                        <Button onClick={handleAddTask} bg={'transparent'} border={'3px solid black'}>Thêm</Button>
                    </Flex>

                    <Box backgroundImage={'https://feastables.com/cdn/shop/files/PaperTextureBg.jpg?v=1706141021&width=500'} mt={5} minH={'25vh'} border={'3px solid black'} rounded={5}>
                        <Box pos={'relative'}>
                            <Text w={'100%'} bg={'#fc3596'} color={'white'} fontSize={24} fontWeight={500} borderBottom={'3px solid black'} textAlign={'center'}>Danh sách những việc cần làm</Text>
                            <Tooltip placement='auto-start' hasArrow label="Delete All Task" aria-label='A tooltip'>
                                <Box onClick={checkBeforeDelete} cursor={'pointer'} className='hover-icon-rotate' pos={'absolute'} top={'5%'} right={'2%'} rounded={5} px={2} py={1} display={'inline-block'} border={'3px solid black'} fontSize={18}><MdAutorenew className='icon-rotate' /></Box>
                            </Tooltip>
                        </Box>

                        {toDoList.length < 1 ?
                            <Box textAlign={'center'} border={'3px solid black'} m={2} px={5} bg={'#cefc17'} rounded={5}>
                                <Text fontSize={20} fontWeight={'semibold'}>Không có task nào cần thực hiện</Text>
                            </Box>
                            :
                            toDoList.map(item => {
                                return (
                                    <Flex justifyContent={'space-between'} alignItems={'center'} border={'3px solid black'} m={2} px={5} bg={'#cefc17'} rounded={5}>
                                        <Flex gap={10} alignItems={'center'}>
                                            <Text minW={'150px'} fontSize={20} fontWeight={'semibold'}>{item.nameTask}</Text>
                                            <Text color={'gray'} fontWeight={500} fontSize={17} fontStyle={'italic'}>
                                                {`Added at ${item.date.hour}h:${item.date.minute}m - ngày ${item.date.day} tháng ${item.date.month} năm ${item.date.year} `}
                                            </Text>
                                        </Flex>

                                        <Flex alignItems={'center'} gap={3} fontSize={20}>

                                            <Tooltip placement='auto-start' hasArrow label="Delete this Task" aria-label='A tooltip'>
                                                <Box onClick={() => handleDeleteTask(item)} cursor={'pointer'} _hover={{ color: 'red' }}>
                                                    <FaRegTrashAlt />
                                                </Box>
                                            </Tooltip>


                                            <Tooltip placement='right' hasArrow label="Complete this Task" aria-label='A tooltip'>
                                                <Box onClick={() => handleAddToCompletedList(item)} cursor={'pointer'} _hover={{ color: '#01a101' }} >
                                                    <FaCheck />
                                                </Box>
                                            </Tooltip>

                                        </Flex>
                                    </Flex>
                                )
                            })}
                    </Box>

                    <Box backgroundImage={'https://feastables.com/cdn/shop/files/PaperTextureBg.jpg?v=1706141021&width=500'} mt={5} minH={'25vh'} border={'3px solid black'} rounded={5}>
                        <Text bg={'#fc3596'} color={'white'} fontSize={24} fontWeight={500} borderBottom={'3px solid black'} textAlign={'center'}>Danh sách những việc đã hoàn thành</Text>

                        {completedList.length < 1 ?
                            <Box textAlign={'center'} border={'3px solid black'} m={2} px={5} bg={'#cefc17'} rounded={5}>
                                <Text fontSize={20} fontWeight={'semibold'}>Bạn chưa hoàn thành công việc nào</Text>
                            </Box>
                            :
                            completedList.map(item => {
                                return (
                                    <Flex justifyContent={'space-between'} alignItems={'center'} border={'3px solid black'} m={2} px={5} bg={'#cefc17'} rounded={5}>
                                        <Flex gap={10} alignItems={'center'}>
                                            <Text minW={'150px'} fontSize={20} fontWeight={'semibold'}>{item.nameTask}</Text>
                                            <Text color={'gray'} fontWeight={500} fontSize={17} fontStyle={'italic'}>
                                                {`Completed at ${item.date.hour}h:${item.date.minute}m - ngày ${item.date.day} tháng ${item.date.month} năm ${item.date.year} `}
                                            </Text>
                                        </Flex>

                                        <Tooltip placement='auto-start' hasArrow label="Return this Task" aria-label='A tooltip'>
                                            <Box onClick={() => returnTask(item)} cursor={'pointer'} _hover={{ color: 'red' }}>
                                                <GiReturnArrow />
                                            </Box>
                                        </Tooltip>
                                    </Flex>
                                )
                            })}
                    </Box>
                </Box>

                <Box pos={'relative'} background={'linear-gradient(180deg, #ff490f 4.17%, #fb3068 61.98%, #fd37a2 100%)'}
                    _before={{
                        pos: 'absolute', content: '""', top: '0', left: '0', right: '0', bottom: '0', width: '100%', height: '100%',
                        backgroundImage: 'https://feastables.com/cdn/shop/files/dot-pattern-white_2.svg', zIndex: '-1'
                    }} minHeight={'10vh'} zIndex={0} rounded={10} width={'40vw'} border={'5px solid black'} height={'fit-content'}>

                    <Box pos={'absolute'} top={0} py={2} w={'100%'} borderBottom={'5px solid black'}>
                        <Text color={'black'} fontSize={24} fontWeight={800} textAlign={'center'}>Lịch sử hoạt động</Text>
                    </Box>

                    <Box mt={'6.5%'} overflowY={'scroll'} maxHeight={'60.7vh'} css={{
                        /* width */
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        /* Track */
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                        },
                        /* Handle */
                        '&::-webkit-scrollbar-thumb': {
                            background: 'white',
                            borderRadius: '5px',
                        },
                        /* Handle on hover */
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#white',
                        },
                    }}>
                        {actionLog.length < 1 ?
                            <Box textAlign={'center'} border={'3px solid black'} m={2} px={5} bg={'#cefc17'} rounded={5}>
                                <Text fontSize={20} fontWeight={'semibold'}>Không có hoạt động nào gần đây</Text>
                            </Box>
                            :
                            actionLog.slice().reverse().map(item => {
                                return (
                                    <Flex gap={6} alignItems={'center'} textAlign={'center'} border={'3px solid black'} m={2} px={5} bg={'#cefc17'} rounded={5}>
                                        <Text w='50%' fontSize={20} fontWeight={'semibold'}>{item.nameTask}</Text>
                                        <Text w='100%' color={'gray'} fontWeight={500} fontSize={17} fontStyle={'italic'}>{item.action}</Text>
                                        <Text py={1} lineHeight={'100%'} w='100%' fontWeight={500}>{`${item.date.hour} giờ ${item.date.minute} phút ${item.date.second} giây`} <br /> {`Ngày ${item.date.day} tháng ${item.date.month} năm ${item.date.year}`}</Text>
                                    </Flex>
                                )
                            })
                        }
                    </Box>
                </Box>
            </Flex>

            <AlertDialogExample showToast={showToast} setToDoList={setToDoList} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </Center>
    )
}

export default MainComponent