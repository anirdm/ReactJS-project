import styles from './FeedItem.module.css'

const FeedItem = ({_id, image}) => {
    return (
        <div className={styles.card}>
            <a href={`/post/${_id}`}>
                <img src={image} />
            </a>
        </div>     
    )  
}

export default FeedItem;