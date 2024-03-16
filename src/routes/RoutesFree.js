import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Dashboard from "../pages/dashboard/Dashboard";
import RoutesPrivate from './RoutesPrivate';
import Categorie from '../pages/categories/Categorie';
import AddCategorie from '../pages/categories/AddCategorie';
import DetailCategorie from '../pages/categories/DetailCategorie';
import SousCategories from '../pages/sousCategories/SousCategories';
import AddSousCategorie from '../pages/sousCategories/AddSousCategorie';
import DetailSousCategorie from '../pages/sousCategories/DetailSousCategorie';
import AddClassification from '../pages/Classification/AddClassification';
import Users from '../pages/users/Users';
import Classification from '../pages/Classification/Classification';
import AddUser from '../pages/users/AddUser';
import DetailUser from '../pages/users/DetailUser';
import DetailClassification from '../pages/Classification/DetailClassification';
import Documents from '../pages/documents/Documents';
import AddDocument from '../pages/documents/AddDocument';
import DetailDoc from '../pages/documents/DetailDoc';
import Config from '../pages/config/Config';
import CategorieActus from '../pages/categoriesActus/CategorieActus';
import AddCategorieActus from '../pages/categoriesActus/AddCategorieActus';
import Posts from '../pages/posts/Posts';
import AddPost from '../pages/posts/AddPost';

const RoutesFree = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route element={<RoutesPrivate />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/categories' element={<Categorie />} />
                    <Route path='/actualites' element={<Classification />} />
                    <Route path='/actualites/add' element={<AddClassification />} />
                    <Route path='/actualites/detail' element={<DetailClassification />} />
                    <Route path='/ajout-actualite' element={<AddClassification />} />
                    <Route path='/categories/add' element={<AddCategorie />} />
                    <Route path='/categories/detail' element={<DetailCategorie />} />
                    <Route path='/medias' element={<SousCategories />} />
                    <Route path='/medias/add' element={<AddSousCategorie />} />
                    <Route path='/medias/detail' element={<DetailSousCategorie />} />
                    <Route path='/users/' element={<Users />} />
                    <Route path='/users/add' element={<AddUser />} />
                    <Route path='/users/detail' element={<DetailUser />} />
                    <Route path='/documents' element={<Documents />} />
                    <Route path='/documents/add' element={<AddDocument />} />
                    <Route path='/documents/detail' element={<DetailDoc />} />
                    <Route path='/config' element={<Config />} />
                    <Route path='/categoriesActus' element={<CategorieActus />} />
                    <Route path='/categoriesActus/add' element={<AddCategorieActus />} />
                    <Route path='/posts' element={<Posts />} />
                    <Route path='/posts/add' element={<AddPost />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesFree