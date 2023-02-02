export function isDev(){
    return process.env.NODE_ENV === 'dev'
}

export function isCI(){
    return process.env.NODE_ENV === 'ci'
}

export function isProd(){
    return process.env.NODE_ENV === 'prod'
}

export function isStaging(){
    return !isProd();
}

export function getDefaultAdminCredentials(){
    return {
        'email':process.env.DEFAULT_ADMIN_EMAIL,
        'password': process.env.DEFAULT_ADMIN_PWD
    }
}

export function getDefaultDummyCredentials(){
    return {
        'name':process.env.DEFAULT_DUMMY_NAME,
        'email':process.env.DEFAULT_DUMMY_EMAIL,
        'password': process.env.DEFAULT_DUMMY_PWD
    }
}