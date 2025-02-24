/* eslint-disable react/prop-types */
const Notification = ({ message }) => {
    if (message.message === null) {
        return null
    }

    return (
        <>
            {message.type === 'success' ?
                <div className='success'>
                    {message.message}
                </div> :
                <div className='error'>
                    {message.message}
                </div>
            }
        </>
    )
}

export default Notification