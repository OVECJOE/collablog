export type User = {
    id: string
    username: string
    email: string
    role: string
    photo?: string
    bio?: string
    is_verified: boolean
    join_date: string
}

export type Post = {
    id: string
    title: string
    content: string
    _html: string
    is_published: boolean
    creator: Pick<User, 'username'>
    created_at: string
    updated_at: string
}