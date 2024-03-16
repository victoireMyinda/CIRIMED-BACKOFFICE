import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import AppContext from './context/AppContext';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import categoriesSlice from "./features/Categories"
import { getAllcategories } from './features/Categories';
import { getAllUsers } from './features/Users';
import { combineReducers } from "redux";
import userSlice from './features/Users';
import sousCategoriesSlice, { getAllSousCategories } from './features/SousCategories';
import actualitesSlice, { getAllFormations } from './features/Classifications';
import DocumentsSlice, { getAllDocuments } from './features/Documents';
import textsSlice, { getAllTexts } from './features/Text';
import categorieActusSlice, { getAllCategoriesFormations } from './features/CategoriesActus';
import postsSlice, { getAllPosts } from './features/Posts';

const store = configureStore({
  reducer: combineReducers({
    categories: categoriesSlice.reducer,
    users: userSlice.reducer,
    images: sousCategoriesSlice.reducer,
    formations: actualitesSlice.reducer,
    documentsAdmin: DocumentsSlice.reducer,
    texts: textsSlice.reducer,
    categoriesFormations: categorieActusSlice.reducer,
    posts: postsSlice.reducer,
  })
});

store.dispatch(getAllcategories());
store.dispatch(getAllUsers());
store.dispatch(getAllSousCategories());
store.dispatch(getAllFormations());
store.dispatch(getAllDocuments());
store.dispatch(getAllTexts());
store.dispatch(getAllCategoriesFormations());
store.dispatch(getAllPosts());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContext>
        <App />
      </AppContext>
    </Provider>
  </React.StrictMode>
);