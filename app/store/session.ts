export const setImage = (image: string | undefined) => {
    sessionStorage.setItem('data', JSON.stringify(image))
}

export const getImage = () => {
    return sessionStorage.getItem('data')
}