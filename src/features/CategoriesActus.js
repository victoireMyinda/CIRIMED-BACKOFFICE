import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllCategoriesFormations = createAsyncThunk("categoriesFormations/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/categories-formations`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newCategorieFormation = createAsyncThunk("categoriesFormations/create",

    async (data, { rejectWithValue }) => {
        try {
            const resp = await axios.post(`${baseUrl}/categories-formations`, data);
            if (resp && resp.data) {
                toast.success('Catégorie ajoutée avec succès');
            }
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateCategorieFormation = createAsyncThunk("categoriesFormations/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/categories-formations/${data && data.id}`, data && data.form);
            toast.success('Catégorie modifiée avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deleteCategorieFormation = createAsyncThunk("categoriesFormations/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/categories-formations/${id}`);
            toast.success('Catégorie supprimée avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const categorieActusSlice = createSlice({
    name: "categoriesFormations",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL CATEGORIES
        [getAllCategoriesFormations.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllCategoriesFormations.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllCategoriesFormations.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE CATEGORIE
        [newCategorieFormation.pending]: (state, action) => {
            state.loading = true;
        },
        [newCategorieFormation.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newCategorieFormation.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE CATGORIE
        [deleteCategorieFormation.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteCategorieFormation.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val._id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteCategorieFormation.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE CATEGORIE
        [updateCategorieFormation.pending]: (state, action) => {
            state.loading = true;
        },
        [updateCategorieFormation.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val._id !== action.payload._id;
            })
            state.value.push(action.payload);
        },
        [updateCategorieFormation.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default categorieActusSlice;