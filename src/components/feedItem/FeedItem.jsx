import styles from './FeedItem.module.css'

const FeedItem = ({image}) => {
    return (
        <div className={styles.card}>
            <a href="">
                <img src={image} />
            </a>
        </div>     
    )  
}

export default FeedItem;