const Filter = ({
    setSelectCity,
    setSearch
}) => {
    return (
        <div>
            <span>
                <input onChange={({target}) => setSelectCity(target.value)} placeholder='Find Company in city...' />
            </span>
            <span>
                <input onChange={({target}) => setSearch(target.value)} placeholder='Search Company' />
            </span>
        </div>
    )
}

export default Filter