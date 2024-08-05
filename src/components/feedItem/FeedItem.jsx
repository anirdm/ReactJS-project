import styles from './FeedItem.module.css'
import { Link } from 'react-router-dom';

const FeedItem = ({_id, image}) => {
    return (
        <div className={styles.card}>
            <Link to={`/post/${_id}`}>
                <img src={image} />
            </Link>
        </div>     
    )  
}

export default FeedItem;