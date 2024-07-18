import styles from './SearchBar.module.css'

const SearchBar = () => {
    return (
        <div className={styles.searchBar}>
            <input 
                type="text" 
                name="search" 
                placeholder="Search"
            />
        </div>
    )
}

export default SearchBar;