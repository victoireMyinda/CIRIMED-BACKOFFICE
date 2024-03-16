import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { newCategorieFormation, updateCategorieFormation, } from '../../features/CategoriesActus';

const AddCategorieActus = () => {

    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.categoriesFormations);

    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        if (state) {
            setNom(state && state.data && state.data.nom);
            setDescription(state && state.data && state.data.description);
        }
    }, [state]);

    const addCategorie = (e) => {
        let formData = {};
        formData.nom = nom;
        formData.description = description

        dispatch(newCategorieFormation(formData));
    };

    const updCategorie = (e) => {
        let formData = {};
        formData.nom = nom;
        formData.description = description
        formData.idCategorie = state && state.data && state.data._id;

        let data = {}
        data.form = formData;
        data.id = state && state.data && state.data.id;

        dispatch(updateCategorieFormation(data));
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
                                    <Link to="/categoriesActus"
                                        style={{
                                            fontSize: "16px", color: "#0b6cc7d0",
                                            display: "flex", alignItems: "center", gap: "5px",
                                        }}
                                    >
                                        <FaArrowLeft /> Catégories Actus
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
                            <div className='col-sm-12'>
                                <div className="form-group mb-3">
                                    <label htmlFor="exampleFormControlInput1">Entrer un nom</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="Entrer un nom"
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
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
                        <button
                            className='btn btn-primary'
                            style={{
                                width: "30%",
                                marginTop: "10px"
                            }}
                            onClick={!state ? addCategorie : updCategorie}
                            disabled={nom && description ? false : true}
                        >
                            {
                                isLoading && isLoading.loading ? <Loader /> : state ? "Modifier" : "Ajouter"
                            }

                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCategorieActus