import React from 'react';
import { Link } from 'react-router-dom';
import defaultpfp from '../images/defaultpfp.png';
import { useState, useEffect } from 'react';
import likeicon from '../images/likeicon.png';
import likedicon from '../images/likedicon.png';
import reposticon from '../images/reposticon.png';
import repostedicon from '../images/repostedicon.png';
import BACKEND_URL from '../backendURL';
import axios from 'axios';


const BuzzCard = ({buzzId, author, content, timestamp, liked, rebuzzed, numLikes, numRebuzzes, rebuzzedBy}) => {

    const [isLiked, setLiked] = useState(liked);
    const [isRebuzzed, setRebuzzed] = useState(rebuzzed);

    const [likes, setLikes] = useState(numLikes);
    const [rebuzzes, setRebuzzes] = useState(numRebuzzes);

    const [firstRenderIsLiked, setFirstRenderIsLiked] = useState(true);
    const [firstRenderIsRebuzzed, setFirstRenderIsRebuzzed] = useState(true);

    useEffect(() => {
        if (firstRenderIsLiked) {
            setFirstRenderIsLiked(false);
            return;
        }
        if (!isLiked) {
            // unliking buzz 
            setLikes((prevLikes) => {
                return prevLikes-1;
            });
            axios.post(BACKEND_URL+'/api/unlikeBuzz', {token: window.token, buzz_id: buzzId})
                .then(res => {
                    if (res.data.status_code != 0) {
                        // failed to unlike, so add our like back
                        setFirstRenderIsLiked(true); // prevent effect from running due to following setLike state change (prevent infinite recursion)
                        setLiked(!isLiked); 
                        setLikes((prevLikes) => {
                            return prevLikes+1;
                        });
                    } // else do nothing, success
                })
                .catch(err => {
                    // failed to unlike, so add our like back
                    setFirstRenderIsLiked(true); // prevent effect from running due to following setLike state change (prevent infinite recursion)
                    setLiked(!isLiked);
                    setLikes((prevLikes) => {
                        return prevLikes+1;
                    });
                })
        } else {
            setLikes(likes+1);
            axios.post(BACKEND_URL+'/api/likeBuzz', {token: window.token, buzz_id: buzzId})
                .then(res => {
                    if (res.data.status_code != 0) {
                        // failed to like, so remove our like
                        setFirstRenderIsLiked(true); // prevent effect from running due to following setLike state change (prevent infinite recursion)
                        setLiked(!isLiked);
                        setLikes((prevLikes) => {
                            return prevLikes-1;
                        });
                    } // else do nothing, success
                })
                .catch(err => {
                    // failed to like, so remove our like
                    setFirstRenderIsLiked(true); // prevent effect from running due to following setLike state change (prevent infinite recursion)
                    setLiked(!isLiked);
                    setLikes((prevLikes) => {
                        return prevLikes-1;
                    });
                })
        }
    }, [isLiked]);

    useEffect(() => {
        if (firstRenderIsRebuzzed) {
            setFirstRenderIsRebuzzed(false);
            return;
        } 
        if (!isRebuzzed) {
            // un rebuzzing buzz
            setRebuzzes((prevRebuzzes) => {
                return prevRebuzzes-1;
            });
            axios.post(BACKEND_URL+'/api/unrebuzzBuzz', {token: window.token, buzz_id: buzzId})
                .then(res => {
                    if (res.data.status_code != 0) {
                        // problem unrebuzzing, so add our rebuzz back
                        setFirstRenderIsRebuzzed(true); // prevent effect from infinite recursion due to following setRebuzzed state change 
                        setRebuzzed(!isRebuzzed);
                        setRebuzzes((prevRebuzzes) => {
                            return prevRebuzzes+1;
                        });
                    }
                })
                .catch(err => {
                    // failed to unrebuzz, so add our rebuzz back
                    setFirstRenderIsRebuzzed(true); // prevent effect from infinite recursion due to following setRebuzzed state change
                    setRebuzzed(!isRebuzzed);
                    setRebuzzes((prevRebuzzes) => {
                        return prevRebuzzes+1;
                    });
                })
        } else {
            // rebuzzing buzz
            setRebuzzes(rebuzzes+1);
            axios.post(BACKEND_URL+'/api/rebuzzBuzz', {token: window.token, buzz_id: buzzId})
                .then(res => {
                    if (res.data.status_code != 0) {
                        // problem rebuzzing, so remove our rebuzz
                        setFirstRenderIsRebuzzed(true); // prevent effect from infinite recursion due to following setRebuzzed state change
                        setRebuzzed(!isRebuzzed);
                        setRebuzzes((prevRebuzzes) => {
                            return prevRebuzzes-1;
                        });
                    }
                })
                .catch(err => {
                    // failed to rebuzz, so remove our rebuzz
                    setFirstRenderIsRebuzzed(true); // prevent effect from infinite recursion due to following setRebuzzed state change
                    setRebuzzed(!isRebuzzed);
                    setRebuzzes((prevRebuzzes) => {
                        return prevRebuzzes-1;
                    });
                })
        }
    }, [isRebuzzed]);

    // also must make api request, not only front end updates
    const likeClicked = () => {
        setLiked(!isLiked);
    };

    // also must make api request, not only front end updates
    const rebuzzClicked = () => {
        setRebuzzed(!isRebuzzed);
    };

    return (
        <div className='buzz-card'>
            <div className='buzz-card-pfp'>
                <img src={defaultpfp}></img>
            </div>
            <div className='buzz-card-author'>
                <Link to={'/user/'+author}>{'@' + author}</Link>
                <p>{rebuzzedBy ? 'ReBuzzed by: ' : ''}<Link to={'/user/'+rebuzzedBy}>{rebuzzedBy ? '@' + rebuzzedBy : ''}</Link></p>
            </div>
            <div className='buzz-card-content'>
                {content}
            </div>
            <div className='buzz-card-reactions'>
                <div className='buzz-card-reactions-middle'>
                    <img onClick={likeClicked} className='reaction-icon' src={isLiked ? likedicon : likeicon}></img>
                    <p className='buzz-card-likes-rebuzzes'>{likes} likes</p>
                    <img onClick={rebuzzClicked} className='repost-icon' src={isRebuzzed ? repostedicon : reposticon}></img>
                    <p className='buzz-card-likes-rebuzzes'>{rebuzzes} rebuzzes</p>
                </div>
            </div>
        </div>
    )
}

export default BuzzCard
