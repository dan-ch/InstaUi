import { User } from "./UserModel";

export interface Comment{
    id: number;
    content: string;
    post_id: number | null;
    author_id: number;
    parent_comment_id: number | null;
    created_at: Date;
    updated_at: Date;
    author: User;
}