import styles from './FeedItem.module.css'
import { Link, useNavigate } from 'react-router-dom';
import PostCard from '../postCard/PostCard';

const FeedItem = ({ post, _id }) => {
    return (
        <div className={styles.card}>
            <Link to={`/post/${_id}`} className={styles.card}>
                <img src={post.imageURL} alt="" />         
            </Link>

            {/*<Link to={`/post/${_id}`} className={styles.card}>
                {/*<PostCard post={post} _id={_id} hidden/>
            </Link>*/}
        </div>
    )
}

export default FeedItem;