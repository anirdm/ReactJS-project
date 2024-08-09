import useGetPostOwner from "../../../hooks/useGetPostOwner";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
    const ownerId = comment.createdBy;
    const { loading, owner } = useGetPostOwner(ownerId);

    if (loading) {
        return;
    }

    return (
        <div className="flex my-5 mr-2.5 gap-3 space-between">
            <img className='w-10 h-10 rounded-full object-cover' src={owner.profilePicURL} alt="user-pic" />

            <div>
                <Link
                    to={`/${owner.username}`}
                    className="cursor-pointer"
                >
                    <p className="font-medium ">{owner.name}</p>
                </Link>
                <p>{comment.comment}</p>
                <span className="text-sm text-flagstone">17/10/2010</span>
            </div>
        </div>




    )
}

export default Comment;
