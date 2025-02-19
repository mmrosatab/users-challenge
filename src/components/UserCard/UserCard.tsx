import { Avatar, Box, Card, Flex, IconButton, Text } from '@radix-ui/themes'
import { TrashIcon } from '@radix-ui/react-icons'
import { User } from '@/services'

export function UserCard(user: User) {

    const {
        imageUrl,
        name,
        username,
        email,
        phone,
    } = user

    return (
        <Box width="600px" mb='10px'>
            <Card>
                <Flex align="center" justify="between">
                    <Avatar
                        size="4"
                        src={imageUrl}
                        radius="full"
                        fallback={name[0]}
                    />
                    <Box width="180px">
                        <Text as="div" size="2" weight="bold">
                            {name}
                        </Text>
                        <Text as="div" size="2" color="gray">
                            {username}
                        </Text>
                    </Box>

                    <Box width="220px">
                        <Text as="div" size="2" weight="bold">
                            {email}
                        </Text>
                        <Text as="div" size="2" color="gray">
                            {phone}
                        </Text>
                    </Box>
                    <Box>
                        <IconButton>
                            <TrashIcon width="18" height="18" />
                        </IconButton>
                    </Box>
                </Flex>
            </Card>
        </Box>

    )
}