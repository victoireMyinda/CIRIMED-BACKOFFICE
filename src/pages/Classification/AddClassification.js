import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { baseUrlImage } from '../../bases/basesUrl';
import { newFormation, updateFormation } from '../../features/Classifications';

const AddClassification = () => {

    const [description, setDescription] = useState('');
    const [categorieActuId, setCategorieId] = useState('');


    const [title, setTitle] = useState('');
    const [montant, setMontant] = useState('');
    const [link, setLink] = useState('');
    const [categorie, setCategorie] = useState('');

    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.formations);

    const categories = useSelector(state => state.categoriesFormations.value)

    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        const handleVideo = () => {
            let findLink = link.split("watch?v=");
            let replaceLink = findLink.join("embed/");
            setLink(replaceLink)
        }

        handleVideo();
    }, [link,])

    useEffect(() => {
        if (state) {
            setTitle(state && state.data && state.data.title);
            setDescription(state && state.data && state.data.description);
            setLink(state && state.data && state.data.link);
            setMontant(state && state.data && state.data.montant);
            setDate1(state && state.data && state.data.dateDebut);
            setDate2(state && state.data && state.data.dateFin);
            setCategorie(state && state.data && state.data.categorie && state.data.categorie.id);
        }
    }, [state]);

    const addCategorie = (e) => {
        let formData = {};
        formData.title = title;
        formData.price = montant
        formData.link = link
        formData.idCategorie = categorie
        formData.description = description
        formData.dateDebut = date1
        formData.dateFin = date2

        dispatch(newFormation(formData));
    };

    const updCategorie = (e) => {
        let formData = {};
        formData.title = title;
        formData.price = montant
        formData.link = link
        formData.idCategorie = categorie
        formData.description = description
        formData.dateDebut = date1
        formData.dateFin = date2

        let data = {}
        data.form = formData;
        data.id = state && state.data && state.data._id;

        dispatch(updateFormation(data));
    };

    console.log(date1, date2)


    return (
        <>
            <Navbar />
            <div className='mainApp'>
                <div className='contentMain'>
                    <div className='contentLeftBar'>
                        <Leftbar />
                    </div>
                    <div className='contentApp'>
                        <div className='alert alertInputSearch' style={{ border: "1px solid #ddd", background: "#fff" }}>
                            <h4 style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                color: "#0b6cc7d0",
                            }}>
                                <Link to="/actualites"
                                    style={{
                                        fontSize: "16px", color: "#0b6cc7d0",
                                        display: "flex", alignItems: "center", gap: "5px",
                                    }}
                                >
                                    <FaArrowLeft /> Formations
                                </Link>
                                <span style={{ fontSize: "16px", color: "#0b6cc7d0", }}>/</span>
                                <span style={{ fontSize: "14px" }}>
                                    {
                                        state ? `Modification de ${state && state.data && state.data.title}` : "Ajout"
                                    }
                                </span>
                            </h4>
                        </div>

                        <div className='col-sm-12 tableCategorie'>


                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="form-group mb-3">
                                        <label htmlFor="nom">Entrer un titre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nom"
                                            placeholder="Entrer un nom"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="form-group mb-3">
                                        <label htmlFor="postnom">Prix en $</label>
                                        <input
                                            type="number"
                                            placeholder='Montant'
                                            className="form-control"
                                            id="montant"
                                            value={montant}
                                            onChange={(e) => setMontant(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="form-group mb-3">
                                        <label htmlFor="pseudo">Un url</label>
                                        <input
                                            type="text"
                                            placeholder='Url'
                                            className="form-control"
                                            id="url"
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="exampleFormControlTextarea1">Choisir une catégorie</label>
                                    <select
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        onChange={(e) => setCategorie(e.target.value)}
                                    >
                                        <option value="" key="">--Choisir une catégorie--</option>
                                        {
                                            categories && categories.length > 0 ? categories.map((val, i) => {
                                                return <option value={val.id} key={i} selected={
                                                    state ? categorie === val.id ? true : false : false
                                                }>
                                                    {val.nom}
                                                </option>
                                            })
                                                : "Aucune catégorie trouvée."
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="form-group mb-3">
                                        <label htmlFor="pseudo">Choisir la date du lancement</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="date"
                                            value={date1}
                                            onChange={(e) => setDate1(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="form-group mb-3">
                                        <label htmlFor="photod">Choisir la date de fermeture</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={date2}
                                            id="date1"
                                            onChange={(e) => setDate2(e.target.value)}
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="desc">Description</label>
                                <textarea
                                    className="form-control"
                                    id="desc"
                                    placeholder='Description'
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    rows="3">
                                </textarea>
                            </div>

                        </div>

                        <div className='col-sm-12 mt-3'>
                            <button
                                className='btn btn-primary'
                                onClick={!state ? addCategorie : updCategorie}
                                disabled={title && description ? false : true}
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

export default AddClassification