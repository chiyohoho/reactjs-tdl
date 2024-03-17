import { Box, Center, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ClockComponents from '../SubComponents/ClockComponent'

const HeaderComponent = ({ username }) => {

    useEffect(() => {

    }, [])

    return (
        <Flex bg={'#72e2ff'} py={2} px={20} borderBottom={'5px solid black'} justifyContent={'space-between'} alignItems={'center'}>
            <Flex alignItems={'center'}>
                <Image display={'inline-block'} w={'50px'} src='https://cdn-icons-png.flaticon.com/512/3208/3208723.png' alt='todolist' />
                <Image display={'inline-block'} ml={'-30px'} w={'200px'} src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b1d65880-a81c-48ac-9175-e1d35c7acae4/da1qxus-1d45b73f-94ab-42d0-805b-1dda8553dc5d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IxZDY1ODgwLWE4MWMtNDhhYy05MTc1LWUxZDM1YzdhY2FlNFwvZGExcXh1cy0xZDQ1YjczZi05NGFiLTQyZDAtODA1Yi0xZGRhODU1M2RjNWQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.f9vEUKHhD7q9ejqCsazTUh-CC30Xd6rkzMNw7dXZTjE' alt='todolist' />
            </Flex>
            <Box opacity={username ? 1 : 0} fontSize={30} fontWeight={600}>
                <Text>Hello! {username}</Text>
            </Box>
            <ClockComponents />
        </Flex>
    )
}

export default HeaderComponent