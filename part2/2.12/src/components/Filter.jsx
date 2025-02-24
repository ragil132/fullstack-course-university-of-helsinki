/* eslint-disable react/prop-types */
const Filter = ({ searchQuery, handleSearchQuery }) => {
    return (
        <div>
            Filter shown with <input value={searchQuery} onChange={handleSearchQuery} />
        </div>
    )
}

export default Filter