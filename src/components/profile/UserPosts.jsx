import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import FeedItem from '../../components/feedItem/FeedItem'

const UserPosts = () => {
    return (
        <section className='posts'>
            <div className="flex justify-center  ">
                <h2 className="mt-24 font-normal text-flagstone">Nothing to show...yet! (•ᴖ•｡)</h2> 

            </div>
            {/*<ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 5 }}
            >
                <Masonry style={{ gap: '15px' }}>
                    <FeedItem _id='1' image='/post1.jfif' />
                    <FeedItem _id='3' image='/post3.jfif' />
                    <FeedItem _id='7' image='/post7.jfif' />
                </Masonry>
            </ResponsiveMasonry>*/}
        </section>
    )
}

export default UserPosts;
