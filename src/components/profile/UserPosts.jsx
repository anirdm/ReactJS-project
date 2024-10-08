import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import FeedItem from '../../components/feedItem/FeedItem'
import useGetUserPosts from "../../hooks/useGetUserPosts"
import useGetUserLikedPosts from "../../hooks/useGetUserLikedPosts";
import { useState } from "react";
import ProfileTabs from "./ProfileTabs";

const UserPosts = () => {
    const [selectedButton, setSelectedButton] = useState('posts');
    const { isLoading: loadingUserPosts, posts: userPosts } = useGetUserPosts();
    const { isLoading: loadingLikedPosts, likedPosts } = useGetUserLikedPosts();

    const posts = selectedButton === 'posts' ? userPosts : likedPosts;
    const isLoading = selectedButton === 'posts' ? loadingUserPosts : loadingLikedPosts;
    const noPostsFound = posts.length === 0;

    return (
        <section className='posts'>
            <ProfileTabs selectedButton={selectedButton} onSelectButton={setSelectedButton}/>
            {isLoading ? null :
                noPostsFound ? (
                    <div className="flex justify-center">
                        <h2 className="mt-24 font-normal text-flagstone">Nothing to show...yet! (•ᴖ•｡)</h2>
                    </div>
                ) : (
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 5 }}
                    >
                        <Masonry style={{ gap: '15px' }}>
                            {posts.map(post => <FeedItem key={post.id} post={post} _id={post.id} />)}
                        </Masonry>
                    </ResponsiveMasonry>
                )
            }
        </section >
    )
}

export default UserPosts;
