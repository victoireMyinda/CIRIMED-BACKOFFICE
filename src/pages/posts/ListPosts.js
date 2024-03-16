import React from 'react'
import { baseUrlImage } from '../../bases/basesUrl'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { deletePost } from '../../features/Posts';

const ListPosts = ({ data }) => {

    let dispatch = useDispatch();

    function deletePostHandle(id) {
        swal({
            text: "Etes-vous sûr de vouloir supprimer ce poste ?",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deletePost(id));
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <h5 className='alert alert-success p-4'>Posts {data && data.length}</h5>
            <div className='grillePosts mt-4'>
                {
                    data && data.length > 0 ?
                        data.map(val => {
                            return <div className='card'>
                                <img src={val && baseUrlImage + "/" + val.picture} alt="" />

                                <div className='desc'>{val && val.description
                                    && val.description.length > 100 ? val && val.description &&
                                val.description.substring(0, 100) + "..."
                                    : val.description
                                }</div>

                                <div className='links'>
                                    <FiTrash2 size={20} onClick={() => deletePostHandle(val && val._id)} />
                                    <FiEdit2 size={20} />
                                </div>
                            </div>
                        })
                        : "Chargement"
                }
            </div>
        </div>
    )
}

export default ListPosts