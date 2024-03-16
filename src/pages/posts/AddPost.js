import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { newCategorie, updateCategorie } from "../../features/Categories";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { baseUrlImage } from '../../bases/basesUrl';
import { newPost } from '../../features/Posts';

const AddPost = () => {

    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [classificationId, setClassificationId] = useState('');

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.posts);


    const location = useLocation();
    const { state } = location;

    const handleImage = (e) => {
        setImage(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]))
    };

    useEffect(() => {
        if (state) {
            setImage(state && state.data && state.data.url);
            setDescription(state && state.data && state.data.description);
            setClassificationId(state && state.data && state.data.classificationId)
        }
    }, [state]);

    const addCategorie = (e) => {
        let formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append("posterId", '64a18e47c659e4216abe960b')

        dispatch(newPost(formData));
    };

    const updCategorie = (e) => {
        let formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append('idCategorie', state && state.data && state.data.id);
        formData.append("classificationId", classificationId);

        let data = {}
        data.form = formData;
        data.id = state && state.data && state.data.id;

        dispatch(updateCategorie(data));
    };

    return (
        <>
            <Navbar />
            <div className='mainApp'>
                <div className='contentMain'>
                    <div className='contentLeftBar'>
                        <Leftbar />
                    </div>
                    <div className='contentApp'>
                        <div className='col-sm-12'>
                            <div className='alert alertInputSearch' style={{ border: "1px solid #ddd", background: "#fff" }}>
                                <h4 style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    color: "#0b6cc7d0"
                                }}>
                                    <Link to="/posts"
                                        style={{
                                            fontSize: "16px", color: "#0b6cc7d0",
                                            display: "flex", alignItems: "center", gap: "5px",
                                        }}
                                    >
                                        <FaArrowLeft /> Posts
                                    </Link>
                                    <span style={{ fontSize: "15px", color: "#0b6cc7d0", }}>/</span>
                                    <span style={{ fontSize: "17px" }}>
                                        {
                                            state ? `Modification de ${state && state.data && state.data.nom}` : "Ajout"
                                        }
                                    </span>
                                </h4>
                            </div>
                        </div>

                        <div className='col-sm-12 tableCategorie'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className='col-sm-12'>
                                        <div className="form-group mb-3">
                                            <label htmlFor="exampleFormControlFile1">Choisir une photo</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="exampleFormControlFile1"
                                                onChange={handleImage}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            onChange={(e) => setDescription(e.target.value)}
                                            value={description}
                                            rows="4"></textarea>
                                    </div>

                                </div>
                                <div className={file ? "col-sm-6 imageCard" : image ? "col-sm-6 imageCard" : "col-sm-6"}>
                                    <h5>Image</h5>
                                    <div className='card mt-2' style={{ border: image ? "1px solid #ddd" : "0px solid #ddd" }}>
                                        {
                                            file ?
                                                <img src={file} alt="" className='img-thumbnail' /> :
                                                image ?
                                                    <img
                                                        src={image ? baseUrlImage + "/" + image : ""}
                                                        className='img-thumbnail'
                                                        alt="catégorie"
                                                    />
                                                    : <div
                                                        className='noneImage'
                                                    >
                                                        <FaCloudUploadAlt size={100} />
                                                        <label htmlFor='exampleFormControlFile1'>Veuillez choisir une image</label>
                                                    </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <button
                                className='btn btn-primary'
                                onClick={!state ? addCategorie : updCategorie}
                                disabled={description ? false : true}
                            >
                                {
                                    isLoading && isLoading.loading ? <Loader /> : state ? "Modifier" : "Ajouter"
                                }

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPost