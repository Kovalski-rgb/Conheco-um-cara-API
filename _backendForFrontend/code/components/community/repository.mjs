import { json } from 'express';
import { badRequest, notFound, ServerError, unauthorized } from '../../lib/errors.mjs';

const COMMUNITY_FIELDS = {
    id: true,
    name: true,
    users : true,
    moderators: true,
    posts: false,
    messages: false,
    createdAt: false,
    deletedAt: false,
    moderatorsId: false
}