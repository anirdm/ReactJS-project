import styles from './FeedItem.module.css'
import { Link } from 'react-router-dom';

const FeedItem = ({ post, _id }) => {
    return (
        <div className={styles.card}>
            <Link to={`/post/${_id}`}>
                <img src={post.imageURL} alt='bitch' />
            </Link>
        </div>     
    )  
}

export default FeedItem;