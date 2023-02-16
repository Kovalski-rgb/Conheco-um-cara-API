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

export function getServerPort(){
    return process.env.PORT;
}

export function getDummy1Data(){
    return {
        name: "dummy1",
        email: "dummy1@email.com",
        password: "DUmmy-01"
    }
}

export function getDummy2Data(){
    return {
        name: "dummy2",
        email: "dummy2@email.com",
        password: "DUmmy-02"
    }
}