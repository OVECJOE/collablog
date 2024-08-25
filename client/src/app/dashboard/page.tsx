import { Logo } from '@/assets/images'
import { Box, Tabs } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { PostsShell } from './partials'
import axios from 'axios'
import type { User } from './types'

const useLastPath = () => {
    const splitPath = location.pathname.split('/')
    return splitPath[splitPath.length - 1]
}

export default function Page() {
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()

    const path = useLastPath()
    const [activeTab, setActiveTab] = useState(path === 'dashboard' ? 'posts' : path)

    const handleTabChange = (value: string | null) => {
        if (value === null) return
        setActiveTab(value)
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem('token')
                if (token) {
                    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/auth/current?include=is_active`, {
                        headers: { Authorization: token }
                    })
                    
                    if (data?.is_verified) {
                        setUser(data)
                        return;
                    }
                }
            } catch {
                localStorage.removeItem('token')
            }

            navigate('/auth/login', { replace: true })
        };

        getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box h="100vh" py="lg" px="md">
            <Logo size="xl" className="border-dashed border border-purple-400 mx-auto" />
            <Box my="xl" maw='700px' mx="auto">
                <Tabs color="purple" defaultChecked defaultValue={activeTab} onChange={handleTabChange}>
                    <Tabs.List>
                        <Tabs.Tab value="posts">Posts</Tabs.Tab>
                        <Tabs.Tab value="authors">Authors</Tabs.Tab>
                        <Tabs.Tab value="collaborations">Collaborations</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value={activeTab}>
                        {activeTab === 'posts' ? <PostsShell user={user || undefined} /> : <Outlet context={{ user }} />}
                    </Tabs.Panel>
                </Tabs>
            </Box>
        </Box>
    )
}